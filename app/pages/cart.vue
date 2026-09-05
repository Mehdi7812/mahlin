<script setup lang="ts">
import { useCustomizerStore } from '~/stores/customizer'
import { faPrice, faNumber, faDate } from '~/utils/format.ts'
import { nationalCodeSchema } from '~/utils/validation'
import { toast } from 'vue-sonner';

useSeoMeta({ title: 'سبد خرید | سوشیا' })

// const { t } = useI18n()
const t = (value: string) => value
const customizer = useCustomizerStore()
const router = useRouter()
const route = useRoute()

/* =========================================================================
   Core cart state
   ========================================================================= */
const loading = ref(true)
const initializing = ref(true)
const emptyCart = ref(true)
const btnLoadingShop = ref(false) // qty +/- loading
const submitting = ref(false)

const invoice = ref<any>({})
const invoiceDetails = ref<any[]>([])
const hasShippable = ref(false)

function getCart(getAuto = false) {
  const payload: any = {}
  if (route.query.invoice_id) payload.invoice_id = route.query.invoice_id

  useGarnetApiFetch('invoices/show', payload)
    .then((response: any) => {
      if (response.code === 2005) {
        emptyCart.value = true
        invoice.value = {}
        invoiceDetails.value = []
        customizer.cartCount = 0
      } else {
        invoice.value = response.Invoice
        invoiceDetails.value = response.Invoice.invoice_details
        customizer.cartCount = invoiceDetails.value.length
        emptyCart.value = false

        if (invoice.value.discount_code) coupon.value = invoice.value.discount_code

        hasShippable.value = invoiceDetails.value.some((o: any) => o.products?.type_code === 1)
        if (hasShippable.value) {
          getUserAddress()
          getDeliveryTimes()
        }

        if (getAuto) getAutomaticPromotions(invoice.value.id)
        getPaymentProcedure()
      }
      loading.value = false
      initializing.value = false
    })
    .catch(() => {
      loading.value = false
      initializing.value = false
      emptyCart.value = true
    })
}

watch(
  () => customizer.auth,
  (loggedIn) => {
    initializing.value = false // ← auth مشخص شد
    if (loggedIn) {
      loading.value = true
      getCart(true)
      getDeliveryProcedure()
    } else {
      loading.value = false
      emptyCart.value = true
    }
  },
  { immediate: true },
)

/* =========================================================================
   Derived totals
   ========================================================================= */
const itemCount = computed(() =>
  invoiceDetails.value.reduce((s, l) => s + Number(l.amount || 0), 0),
)

const invoiceSubtotal = computed(() => {
  if (invoice.value.impure_price != null) return Number(invoice.value.impure_price) || 0
  return invoiceDetails.value.reduce(
    (sum, item) => sum + (Number(item.unit_price) || 0) * (Number(item.amount) || 0),
    0,
  )
})

const invoiceDiscount = computed(() => Number(invoice.value.discount_price) || 0)
const invoiceTax = computed(() => Number(invoice.value.tax_price) || 0)

const shippingCost = computed(() => {
  if (!hasShippable.value || !selectedTimeSlot.value) return 0
  const isFree =
    parseInt(invoice.value.total_price || 0) >=
    parseInt(selectedTimeSlot.value.free_price || 999999999)
  return isFree ? 0 : Number(selectedTimeSlot.value.send_price || 0)
})

const orderTotal = computed(() => {
  const total = Number(invoice.value.total_price) || 0
  if (step.value === 'cart') return total
  return total + shippingCost.value
})

const freeShippingThreshold = computed(() => Number(selectedTimeSlot.value?.free_price) || 0)
const remainingForFreeShipping = computed(() => {
  if (!freeShippingThreshold.value) return 0
  return Math.max(0, freeShippingThreshold.value - Number(invoice.value.total_price || 0))
})
const freeShippingProgress = computed(() => {
  if (!freeShippingThreshold.value) return 0
  return Math.min(100, (Number(invoice.value.total_price || 0) / freeShippingThreshold.value) * 100)
})

/* =========================================================================
   Quantity + remove
   ========================================================================= */
function decreaseAmount(item: any) {
  if (item.amount <= 1) return
  btnLoadingShop.value = true
  item.amount--
  updateAmount(item)
}
function increaseAmount(item: any) {
  if (item.amount !== item.products.maximum_sale_quantity) {
    btnLoadingShop.value = true
    item.amount++
    updateAmount(item)
  }
}
function updateAmount(item: any) {
  useGarnetApiFetch('invoices/update', {
    detail_id: item.id,
    invoice_id: item.invoice_id,
    product_id: item.product_id,
    amount: item.amount,
  })
    .then((response: any) => {
      btnLoadingShop.value = false
      if (response.code === 2005 || response.code === 2006) {
        toast.error(t(response.error))
        getCart(false)
      } else {
        invoice.value = response.Invoice
        invoiceDetails.value = response.Invoice.invoice_details
        emptyCart.value = false
        coupon.value = ''
        couponSuccess.value = false
      }
    })
    .catch((error: any) => {
      btnLoadingShop.value = false
      toast.error(t(error))
    })
}
function removeLine(item: any) {
  btnLoadingShop.value = true
  useGarnetApiFetch('invoices/detailDelete', {
    detail_id: item.id,
    invoice_id: item.invoice_id,
  })
    .then((response: any) => {
      btnLoadingShop.value = false
      if (response.code === 2005) {
        emptyCart.value = true
        invoice.value = {}
        invoiceDetails.value = []
        customizer.cartCount = 0
      } else {
        invoice.value = response.Invoice
        invoiceDetails.value = response.Invoice.invoice_details
        customizer.cartCount = invoiceDetails.value.length
        emptyCart.value = false
      }
      coupon.value = ''
      couponSuccess.value = false
    })
    .catch((error: any) => {
      btnLoadingShop.value = false
      toast.error(t(error))
    })
}
function clearCart() {
  ;[...invoiceDetails.value].forEach((item) => removeLine(item))
}

function getAddons(item: any) {
  if (!item.addons_data) return []
  try {
    const parsed = typeof item.addons_data === 'string' ? JSON.parse(item.addons_data) : item.addons_data
    return parsed?.addons || []
  } catch {
    return []
  }
}

/* =========================================================================
   Coupon
   ========================================================================= */
const coupon = ref('')
const couponError = ref<string | null>(null)
const couponLoading = ref(false)
const couponSuccess = ref(false)

function applyCoupon() {
  if (!coupon.value.trim()) return
  couponLoading.value = true
  couponError.value = null
  useGarnetApiFetch('promotions/checkCode', {
    code: coupon.value.trim(),
    invoice_id: invoice.value.id,
  })
    .then((response: any) => {
      couponLoading.value = false
      if (response.success) {
        couponSuccess.value = true
        toast.success('کد تخفیف اعمال شد')
      } else {
        couponError.value = response.msg
        toast.error(t(response.msg))
      }
      getCart(false)
    })
    .catch((error: any) => {
      couponLoading.value = false
      couponError.value = 'خطا در اعمال کد تخفیف'
      toast.error(t(error))
    })
}
function removeCoupon() {
  coupon.value = ''
  couponError.value = null
  couponSuccess.value = false
  useGarnetApiFetch('promotions/checkCode', { code: '', invoice_id: invoice.value.id }).then(() =>
    getCart(false),
  )
}

const discountCodeChoice = ref(false)
const discountCodeList = ref<any[]>([])
function applyDiscount(code: string) {
  discountCodeChoice.value = false
  coupon.value = code
  applyCoupon()
}
function getAutomaticPromotions(invoiceId: number) {
  useGarnetApiFetch('promotions/checkAutomaticByInvoice', { invoice_id: invoiceId }).then(
    (response: any) => {
      if (response.code === 2000 && response.promotion?.length > 0) {
        discountCodeChoice.value = true
        discountCodeList.value = response.promotion
      }
    },
  )
}

/* =========================================================================
   Steps  (وضعیت استپ از روی query URL خونده و نوشته می‌شه)
   ========================================================================= */
type StepId = 'cart' | 'info' | 'payment'
const STEPS: { id: StepId; label: string }[] = [
  { id: 'cart', label: 'سبد خرید' },
  { id: 'info', label: 'اطلاعات ارسال' },
  { id: 'payment', label: 'پرداخت' },
]

const STEP_ICONS: Record<StepId, string> = {
  cart: 'tabler:shopping-cart',
  info: 'tabler:map-pin',
  payment: 'tabler:credit-card',
}

const STEP_QUERY_KEY = 'step'

const step = ref<StepId>('cart')
const completed = reactive<Record<StepId, boolean>>({ cart: false, info: false, payment: false })
const currentStepIndex = computed(() => STEPS.findIndex((s) => s.id === step.value))

// آیا کاربر اجازه‌ی رفتن به این استپ رو داره؟
// (بر اساس تکمیل شدن استپ‌های *قبلی*، نه خود استپ مقصد)
function canAccessStep(id: StepId): boolean {
  if (id === 'cart') return true
  if (id === 'info') return completed.cart
  if (id === 'payment') return completed.info
  return false
}
function isStepBehindCurrent(index: number) {
  return index < currentStepIndex.value
}

// یک history entry جدید ثبت می‌کنه (برای فعال شدن دکمه Back مرورگر)
function pushStep(id: StepId) {
  if (route.query[STEP_QUERY_KEY] === id) {
    step.value = id
    return
  }
  router.push({ query: { ...route.query, [STEP_QUERY_KEY]: id } })
}

// بدون ثبت history entry جدید (برای اصلاح/مقداردهی اولیه)
function replaceStep(id: StepId) {
  router.replace({ query: { ...route.query, [STEP_QUERY_KEY]: id } })
}

function goToStep(id: StepId) {
  if (id === step.value) return
  if (!canAccessStep(id)) return
  pushStep(id)
}

function goToInfo() {
  if (emptyCart.value) return
  completed.cart = true
  pushStep('info')
}

const infoError = ref<string | null>(null)
function goToPayment() {
  infoError.value = null
  if (hasShippable.value && !selectedAddress.value) {
    infoError.value = 'لطفا آدرس را انتخاب نمایید'
    return
  }
  if (hasShippable.value && !selectedShippingMethod.value) {
    infoError.value = 'لطفا نحوه ارسال را انتخاب نمایید'
    return
  }
  const hasAvailableTimeSlot = deliveryDays.value.some((day: any) =>
    day.times?.some((slot: any) => !slot.isDisabled),
  )
  if (hasShippable.value && hasAvailableTimeSlot && !selectedTimeSlot.value) {
    infoError.value = 'لطفا زمان ارسال را انتخاب نمایید'
    return
  }
  completed.info = true
  pushStep('payment')
}

function backToCart() {
  pushStep('cart')
}
function backToInfo() {
  pushStep('info')
}

// همیشه step رو از روی query می‌خونیم؛ این تنها منبع حقیقت (source of truth) هست
watch(
  () => route.query[STEP_QUERY_KEY],
  (val) => {
    const id = (Array.isArray(val) ? val[0] : val) as StepId | undefined

    if (!id || !STEPS.some((s) => s.id === id)) {
      step.value = 'cart'
      return
    }

    if (canAccessStep(id)) {
      step.value = id
      // وقتی به یک استپ برمی‌گردیم، استپ‌های بعد از اون رو "تکمیل‌نشده" در نظر بگیریم
      const idx = STEPS.findIndex((s) => s.id === id)
      STEPS.forEach((s, i) => {
        if (i > idx) completed[s.id] = false
      })
    } else {
      replaceStep('cart')
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (!route.query[STEP_QUERY_KEY]) {
    replaceStep('cart')
  }
})

/* =========================================================================
   Address
   ========================================================================= */
const addresses = ref<any[]>([])
const selectedAddressId = ref<number | string | null>(null)
const isEditing = ref(false)

const addressModalOpen = ref(false)
const addressStep = ref<0 | 1 | 2>(0)

function openAddressModal(stepIdx: 0 | 1 | 2 = 0) {
  addressModalOpen.value = true
  addressStep.value = stepIdx
}
function closeAddressModal() {
  addressModalOpen.value = false
  addressStep.value = 0
  isEditing.value = false
  geoLatLng.value = null
}

function getUserAddress() {
  useGarnetApiFetch('users/userAddress')
    .then((response: any) => {
      addresses.value = response.UserAddress || []
      if (!addresses.value.length) {
        openNewAddressForm()
        openAddressModal(1)
      } else {
        const def = addresses.value.find((a: any) => a.is_default === 1)
        selectedAddressId.value = (def ?? addresses.value[0]).id
      }
    })
    .catch((error: any) => toast.error(t(error)))
}

const selectedAddress = computed(
  () => addresses.value.find((a: any) => a.id === selectedAddressId.value) ?? null,
)

const locationGroups = ref<{ title: string; cities: { id: number; title: string }[] }[]>([])
function getAddressLocations() {
  useGarnetApiFetch('address/indexWithKind', { kind: 2 })
    .then((response: any) => {
      locationGroups.value = (response.Address || []).map((o: any) => ({
        title: o.title,
        cities: (o.address_children || []).map((c: any) => ({ id: c.id, title: c.title })),
      }))
    })
    .catch((error: any) => toast.error(t(error)))
}

const selectedProvinceTitle = ref('')
const citiesForSelectedProvince = computed(
  () => locationGroups.value.find((g) => g.title === selectedProvinceTitle.value)?.cities ?? [],
)
watch(selectedProvinceTitle, () => {
  newAddress.address_id = ''
})

const newAddress = reactive({
  id: null as number | null,
  title: '',
  address_id: '' as number | string,
  postal_code: '',
  street: '',
  plaque: '',
  unit: '',
  notes: '',
  receiver_is_different: false,
  receiver_full_name: '',
  receiver_mobile: '',
  is_default: 1,
})
const addressErrors = reactive<Record<string, string>>({})
const geoLatLng = ref<[number, number] | null>(null)
const savingAddress = ref(false)

const hasValidMapLatLng = computed(
  () => Array.isArray(geoLatLng.value) && geoLatLng.value.length === 2 && geoLatLng.value.every((n) => Number.isFinite(n)),
)

function openNewAddressForm() {
  isEditing.value = false
  selectedProvinceTitle.value = ''
  geoLatLng.value = null
  Object.assign(newAddress, {
    id: null,
    title: '',
    address_id: '',
    postal_code: '',
    street: '',
    plaque: '',
    unit: '',
    notes: '',
    receiver_is_different: false,
    receiver_full_name: customizer.userInfo?.full_name ?? '',
    receiver_mobile: customizer.userInfo?.mobile ? '0' + customizer.userInfo.mobile : '',
    is_default: 1,
  })
  if (!locationGroups.value.length) getAddressLocations()
}

function openEditAddressForm(addr: any) {
  isEditing.value = true
  Object.assign(newAddress, {
    id: addr.id,
    title: addr.title,
    address_id: addr.address_id,
    postal_code: addr.postal_code,
    street: addr.description,
    plaque: addr.plaque || '',
    unit: addr.unit || '',
    notes: '',
    receiver_is_different: !!addr.receiver_is_different,
    receiver_full_name: addr.receiver_full_name,
    receiver_mobile: addr.receiver_mobile,
    is_default: addr.is_default,
  })
  geoLatLng.value = [Number(addr.lat) || 0, Number(addr.lon) || 0]
  if (!locationGroups.value.length) getAddressLocations()
  openAddressModal(1)
}

function startAddNewAddress() {
  openNewAddressForm()
  openAddressModal(1)
}

function validateAddressForm() {
  Object.keys(addressErrors).forEach((k) => delete addressErrors[k])
  if (!newAddress.title.trim()) addressErrors.title = 'عنوان آدرس را وارد کنید (مثلاً خانه)'
  if (!newAddress.address_id) addressErrors.address_id = 'شهر را انتخاب کنید'
  if (!newAddress.street.trim()) addressErrors.street = 'آدرس کامل را وارد کنید'
  const pc = newAddress.postal_code.replace(/\D/g, '')
  if (!pc) addressErrors.postal_code = 'کد پستی را وارد کنید'
  else if (pc.length !== 10) addressErrors.postal_code = 'کد پستی باید ۱۰ رقم باشد'
  if (!newAddress.plaque.trim()) addressErrors.plaque = 'پلاک را وارد کنید'
  return Object.keys(addressErrors).length === 0
}

async function saveAddress() {
  if (!validateAddressForm()) return
  savingAddress.value = true

  let fullAddress = newAddress.street
  if (newAddress.plaque) fullAddress += `، پلاک: ${newAddress.plaque}`
  if (newAddress.unit) fullAddress += `، واحد: ${newAddress.unit}`

  const payload: any = {
    title: newAddress.title,
    kind: 1,
    address_id: newAddress.address_id,
    postal_code: newAddress.postal_code,
    description: fullAddress,
    lat: (geoLatLng.value?.[0] ?? 0).toString().substring(0, 10),
    lon: (geoLatLng.value?.[1] ?? 0).toString().substring(0, 10),
    receiver_is_different: newAddress.receiver_is_different,
    is_default: newAddress.is_default,
    receiver_full_name: newAddress.receiver_full_name,
    receiver_mobile: newAddress.receiver_mobile,
  }
  if (isEditing.value) payload.id = newAddress.id

  try {
    const response: any = await useGarnetApiFetch('users/saveUserAddress', payload)
    if (response?.UserAddress) addresses.value = response.UserAddress
    const saved = isEditing.value
      ? addresses.value.find((a: any) => a.id === newAddress.id)
      : addresses.value[0]
    if (saved) selectedAddressId.value = saved.id
    closeAddressModal()
    toast.success(isEditing.value ? 'آدرس ویرایش شد' : 'آدرس ذخیره شد')
  } catch (error: any) {
    toast.error(t(error))
  } finally {
    savingAddress.value = false
  }
}

const dialogDelete = ref(false)
const addressIdToDelete = ref<number | null>(null)
function openDeleteDialog(id: number) {
  addressIdToDelete.value = id
  dialogDelete.value = true
}
function closeDeleteDialog() {
  dialogDelete.value = false
  addressIdToDelete.value = null
}
const isDeleting = ref(false)
async function deleteAddress() {
  if (!addressIdToDelete.value) return
  isDeleting.value = true
  try {
    const response: any = await useGarnetApiFetch('users/deleteUserAddress', {
      address_id: addressIdToDelete.value,
    })
    if (response?.UserAddress) addresses.value = response.UserAddress
    if (!addresses.value.find((a: any) => a.id === selectedAddressId.value)) {
      selectedAddressId.value = addresses.value[0]?.id ?? null
    }
    toast.success('آدرس حذف شد')
    closeDeleteDialog()
  } catch (error: any) {
    toast.error(t(error))
  } finally {
    isDeleting.value = false
  }
}

/* =========================================================================
   Shipping method + delivery times
   ========================================================================= */
const deliveryMethods = ref<any[]>([])
const selectedShippingMethod = ref<any>(null)
function getDeliveryProcedure() {
  useGarnetApiFetch('options/indexDeliveryProcedure').then((response: any) => {
    deliveryMethods.value = response.DeliveryProcedure || []
  })
}
function chooseShippingMethod(method: any) {
  selectedShippingMethod.value = method
}

const deliveryDays = ref<any[]>([])
const selectedDay = ref<any>(null)
const selectedTimeSlot = ref<any>(null)

function getDeliveryTimes() {
  useGarnetApiFetch('options/indexDeliveryTimes', { language_id: 1, currency_id: 1 })
    .then((response: any) => {
      deliveryDays.value = response.FinalDates || []
      deliveryDays.value.forEach((day: any) => {
        day.times = day.times || []
        const isDayClosed = day.isClosed === true || String(day.isClosed) === '1'
        day.times.forEach((slot: any) => {
          slot.isDisabled =
            String(slot.status) === '0' ||
            isDayClosed ||
            (slot.min_price && Number(invoice.value.total_price) < Number(slot.min_price))
        })
      })
      selectedDay.value =
        deliveryDays.value.find((day: any) => day.times.some((slot: any) => !slot.isDisabled)) ||
        deliveryDays.value[0] ||
        null
    })
    .catch((error: any) => toast.error(t(error)))
}

function slotPriceLabel(slot: any) {
  const total = parseInt(invoice.value.total_price) || 0
  if (slot.min_price && total < parseInt(slot.min_price)) {
    return `کمتر از حداقل سفارش (${faPrice(parseInt(slot.min_price))})`
  }
  if (slot.free_price && total >= parseInt(slot.free_price)) return 'رایگان'
  if (slot.send_price) return faPrice(Number(slot.send_price))
  return 'طبق تعرفه'
}

watch(selectedDay, (day) => {
  if (day?.times?.length) {
    if (!day.times.some((s: any) => s.id === selectedTimeSlot.value?.id && !s.isDisabled)) {
      selectedTimeSlot.value = day.times.find((s: any) => !s.isDisabled) || null
    }
  } else {
    selectedTimeSlot.value = null
  }
}, { immediate: true })

/* =========================================================================
   Payment
   ========================================================================= */
const paymentProcedures = ref<any[]>([])
const paymentMethod = ref<any>(null)
const walletInfo = ref<any>({})

function getPaymentProcedure() {
  useGarnetApiFetch('options/indexPaymentProcedure', { language_id: 1, currency_id: 1 })
    .then((response: any) => {
      const list: any[] = []
      let walletItem: any = null
      ;(response.PaymentProcedure || []).forEach((value: any) => {
        if (value.dynamic_column_01 === 'onlinePayment' && value.gateways?.length) {
          value.gateways.forEach((gateway: any) => {
            list.push({
              pp_id: value.id,
              pp_title: value.title,
              pp_d1: value.dynamic_column_01,
              gateway_id: gateway.id,
              gateway_title: gateway.title,
            })
          })
        }
        if (value.dynamic_column_01 === 'offlinePayment') {
          list.push({ pp_id: value.id, pp_title: value.title, pp_d1: value.dynamic_column_01 })
        }
        if (value.dynamic_column_01 === 'walletPayment') {
          walletItem = { pp_id: value.id, pp_title: value.title, pp_d1: value.dynamic_column_01 }
          list.push(walletItem)
        }
      })
      paymentProcedures.value = list
      if (walletItem) getWalletBalance()
      if (list.length && !paymentMethod.value) paymentMethod.value = list[0]
    })
    .catch((error: any) => toast.error(t(error)))
}
function getWalletBalance() {
  useGarnetApiFetch('wallets/getBalance').then((response: any) => {
    walletInfo.value =
      (response.Wallets || []).find((w: any) => w.currency_id === invoice.value.currency_id) || {}
  })
}

function calculateCashAmount(items: any[]) {
  return items.reduce((sum, item) => sum + (Number(item.cash_amount) || 0), 0)
}

const walletDecrease = computed(() => {
  if (paymentMethod.value?.pp_d1 !== 'walletPayment') return 0
  const payable = calculateCashAmount(invoiceDetails.value) || Number(orderTotal.value) - Number(invoice.value.other_price || 0)
  const balance = Number(walletInfo.value.balance) || 0
  return balance <= payable ? balance : payable
})

const walletShortfall = computed(() => {
  if (paymentMethod.value?.pp_d1 !== 'walletPayment') return 0
  const payable = calculateCashAmount(invoiceDetails.value) || Number(orderTotal.value) - Number(invoice.value.other_price || 0)
  return payable - walletDecrease.value
})

const increaseBalanceDialog = ref(false)
const paymentOption2 = ref<any>(null)
const increasingBalance = ref(false)

function openIncreaseBalanceDialog() {
  paymentOption2.value = paymentProcedures.value.find((p) => p.pp_d1 === 'onlinePayment') || null
  increaseBalanceDialog.value = true
}

function increaseBalance() {
  if (!paymentOption2.value) {
    toast.error('نحوه پرداخت را انتخاب نمایید')
    return
  }
  increasingBalance.value = true
  useGarnetApiFetch('wallets/increaseBalance', {
    currency_id: invoice.value.currency_id,
    selectedPaymentProcedure: paymentOption2.value.pp_id,
    selectedGateway: paymentOption2.value.gateway_id,
    amount: walletShortfall.value,
  })
    .then((response: any) => {
      increasingBalance.value = false
      if (response.code !== 2000) {
        toast.error(t(response.error || response.msg || 'خطا'))
        return
      }
      const paymentUrl =
        response.GatewayResult?.payment_url ||
        response.GatewayResult?.data?.payment_url ||
        response.GatewayResult?.url
      if (paymentUrl) {
        window.location.href = paymentUrl
      } else {
        toast.error('آدرس درگاه پرداخت یافت نشد')
      }
    })
    .catch((error: any) => {
      increasingBalance.value = false
      toast.error(t(error))
    })
}

function beforeWalletAlertEnter(element: Element) {
  const alert = element as HTMLElement
  alert.style.height = '0'
}
function enterWalletAlert(element: Element, done: () => void) {
  const alert = element as HTMLElement
  requestAnimationFrame(() => {
    alert.style.height = `${alert.scrollHeight}px`
    alert.addEventListener('transitionend', done, { once: true })
  })
}
function afterWalletAlertEnter(element: Element) {
  ;(element as HTMLElement).style.height = 'auto'
}
function beforeWalletAlertLeave(element: Element) {
  const alert = element as HTMLElement
  alert.style.height = `${alert.scrollHeight}px`
}
function leaveWalletAlert(element: Element, done: () => void) {
  const alert = element as HTMLElement
  requestAnimationFrame(() => {
    alert.style.height = '0'
    alert.addEventListener('transitionend', done, { once: true })
  })
}

/* -------------------------------------------------------------------------
   تکمیل اطلاعات هویتی کاربر
   ------------------------------------------------------------------------- */
const userInfoDialog = ref(false)
const savingUserInfo = ref(false)
const userInfoForm = reactive({
  first_name: '',
  last_name: '',
  national_code: '',
  gender: 1 as 0 | 1,
  birth_date: '',
})
const userInfoErrors = reactive<Record<string, string>>({})

function openUserInfoDialog() {
  Object.assign(userInfoForm, {
    first_name: customizer.userInfo?.first_name ?? '',
    last_name: customizer.userInfo?.last_name ?? '',
    national_code: customizer.userInfo?.national_code ?? '',
    gender: customizer.userInfo?.gender ?? 1,
    birth_date: customizer.userInfo?.birth_date ?? '',
  })
  userInfoDialog.value = true
}

function validateUserInfoForm() {
  Object.keys(userInfoErrors).forEach((k) => delete userInfoErrors[k])
  if (!userInfoForm.first_name.trim()) userInfoErrors.first_name = 'نام را وارد کنید'
  if (!userInfoForm.last_name.trim()) userInfoErrors.last_name = 'نام خانوادگی را وارد کنید'
  const nc = nationalCodeSchema.safeParse(userInfoForm.national_code)
  if (!nc.success) userInfoErrors.national_code = nc.error.issues[0]?.message || 'کد ملی معتبر نیست'
  if (!userInfoForm.birth_date.trim()) userInfoErrors.birth_date = 'تاریخ تولد را وارد کنید'
  return Object.keys(userInfoErrors).length === 0
}

function updateUserInfo() {
  if (!validateUserInfoForm()) return
  savingUserInfo.value = true
  useGarnetApiFetch('users/updateImportant', {
    national_code: userInfoForm.national_code,
    first_name: userInfoForm.first_name,
    last_name: userInfoForm.last_name,
    gender: userInfoForm.gender,
    birth_date: userInfoForm.birth_date,
    status: 1,
  })
    .then((response: any) => {
      savingUserInfo.value = false
      if (response.code === 2000) {
        toast.success('اطلاعات ثبت شد. می‌توانید خرید خود را ادامه دهید')
        userInfoDialog.value = false
        customizer.userInfo = response.User
      } else {
        toast.error(t(response.error))
      }
    })
    .catch((error: any) => {
      savingUserInfo.value = false
      toast.error(t(error))
    })
}

const orderDescription = ref('')
const paymentError = ref<string | null>(null)

function submitOrder() {
  paymentError.value = null
  if (!paymentMethod.value) {
    paymentError.value = 'روش پرداخت را انتخاب کنید'
    return
  }

  submitting.value = true
  useGarnetApiFetch('invoices/updateToNextStatus', {
    platform: 'Web',
    browser: '',
    invoiceId: invoice.value.id,
    selectedPaymentProcedure: paymentMethod.value.pp_id,
    selectedGateway: paymentMethod.value.gateway_id,
    selectedAddress: selectedAddress.value?.id,
    send_type: selectedShippingMethod.value?.title || 261,
    send_type_past: selectedShippingMethod.value?.dynamic_column_02 || null,
    selectedTime: selectedTimeSlot.value?.id || null,
    selectedDate: selectedDay.value?.date || null,
    description: orderDescription.value,
  })
    .then((response: any) => {
      if (response.code !== 2000) {
        submitting.value = false
        if (response.error === 'user_not_active') {
          openUserInfoDialog()
          return
        }
        paymentError.value = t(response.error || response.msg || 'ثبت سفارش با خطا مواجه شد')
        return
      }
      const gatewayTitle = response.GatewayTitle
      const paymentUrl =
        response.GatewayResult?.payment_url ||
        response.GatewayResult?.data?.payment_url ||
        response.GatewayResult?.url

      if (
        ['jibit', 'zibal', 'zarinpal', 'saman', 'free', 'wallet'].includes(gatewayTitle) &&
        paymentUrl
      ) {
        window.location.replace(paymentUrl)
      } else {
        submitting.value = false
        paymentError.value = 'درگاه پرداخت پشتیبانی نمی‌شود'
      }
    })
    .catch((error: any) => {
      submitting.value = false
      paymentError.value = t(error) || 'ثبت سفارش با خطا مواجه شد'
    })
}

/* =========================================================================
   Mobile sticky bar
   ========================================================================= */
function primaryAction() {
  if (step.value === 'cart') goToInfo()
  else if (step.value === 'info') goToPayment()
  else submitOrder()
}
const primaryLabel = computed(() => {
  if (step.value === 'cart') return 'تایید و تکمیل سفارش'
  if (step.value === 'info') return 'ذخیره و ادامه'
  return paymentMethod.value?.pp_d1 === 'offlinePayment' ? 'ثبت سفارش' : 'پرداخت و ثبت سفارش'
})
const primaryDisabled = computed(() => {
  if (step.value === 'cart') return emptyCart.value
  if (step.value === 'payment') return walletShortfall.value !== 0
  return false
})
</script>

<template>
  <div class="relative min-h-[70vh] overflow-x-hidden bg-[#FBF8F3] pb-28 lg:pb-14">
    <div class="max-w-[1280px] mx-auto px-4 md:px-6">

      <!-- دکوراسیون پس‌زمینه -->
      <div class="pointer-events-none absolute inset-x-0 top-0 -z-0 h-64 overflow-hidden">
        <div class="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl"></div>
        <div class="absolute -top-10 left-1/4 h-52 w-52 rounded-full bg-brand/5 blur-3xl"></div>
      </div>

      <!-- ================= Header ================= -->
      <div class="relative border-b border-line backdrop-blur-sm">
        <div class="container-content py-6 lg:py-8">
          <nav class="animate-fade-in-up flex items-center gap-1.5 text-micro text-ink-faint">
            <NuxtLink to="/" class="flex items-center gap-1 transition hover:text-brand">
              <Icon name="tabler:home" class="text-[13px]" /> خانه
            </NuxtLink>
            <Icon name="tabler:chevron-left" class="text-meta" />
            <span class="font-medium text-ink-muted">سبد خرید</span>
          </nav>

          <div class="animate-fade-in-up animation-delay-100 mt-4 flex flex-wrap items-end justify-between gap-4">
            <h1 class="flex items-center gap-3 text-[26px] font-black text-brand lg:text-[32px]">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand/80 text-gold shadow-lg shadow-brand/20 lg:h-12 lg:w-12">
                <Icon name="tabler:shopping-cart" class="text-[20px]" />
              </span>
              سبد خرید
              <span
                v-if="itemCount"
                class="rounded-full bg-cream px-3 py-1 text-meta font-bold text-ink-muted tabular-fa"
              >
                {{ faNumber(itemCount) }} کالا
              </span>
            </h1>
          </div>

          <!-- Step tabs -->
          <div class="animate-fade-in-up animation-delay-200 mt-7 lg:mt-8">
            <!-- Desktop / tablet stepper -->
            <div class="hidden items-center sm:flex">
              <template v-for="(s, i) in STEPS" :key="s.id">
                <button
                  type="button"
                  class="group flex items-center gap-3 rounded-2xl py-2 pl-1 pr-2 transition disabled:cursor-not-allowed"
                  :disabled="!canAccessStep(s.id)"
                  @click="goToStep(s.id)"
                >
                  <span
                    class="relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-[15px] font-bold ring-2 transition-all duration-300"
                    :class="[
                      step === s.id
                        ? 'scale-110 bg-brand text-ink-faint ring-white/70 shadow-[0_6px_18px_rgba(0,0,0,0.25)]'
                        : isStepBehindCurrent(i)
                          ? 'bg-emerald-500 text-white ring-white/70 shadow-[0_6px_18px_rgba(0,0,0,0.22)]'
                          : 'bg-white text-ink-faint ring-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] group-hover:ring-gold/60',
                    ]"
                  >
                    <span
                      v-if="step === s.id"
                      class="absolute -inset-1.5 animate-pulse rounded-full ring-2 ring-white/50"
                    />
                    <Icon v-if="step === s.id" :name="STEP_ICONS[s.id]" class="text-[17px]" />
                    <Icon v-else-if="isStepBehindCurrent(i)" name="tabler:check" class="animate-check-pop text-[18px]" />
                    <Icon v-else :name="STEP_ICONS[s.id]" class="text-[17px]" />
                  </span>

                  <span class="hidden flex-col items-start text-right md:flex">
                    <span
                      class="text-[11px] font-medium tabular-fa"
                      :class="step === s.id ? 'text-gold-deep' : 'text-brand/50'"
                    >
                      مرحله {{ faNumber(i + 1) }}
                    </span>
                    <span
                      class="text-[13.5px] font-bold transition-colors"
                      :class="step === s.id ? 'text-brand' : isStepBehindCurrent(i) ? 'text-brand/70' : 'text-brand/40'"
                    >
                      {{ s.label }}
                    </span>
                  </span>
                </button>

                <!-- خط اتصال بین مراحل -->
                <div
                  v-if="i < STEPS.length - 1"
                  class="mx-1.5 h-[3px] flex-1 overflow-hidden rounded-full bg-white/35 ring-1 ring-white/50 md:mx-3"
                >
                  <div
                    class="h-full rounded-full bg-gradient-to-l from-emerald-500 to-brand shadow-[0_0_8px_rgba(0,0,0,0.15)] transition-all duration-700 ease-out"
                    :style="{ width: isStepBehindCurrent(i) ? '100%' : '0%' }"
                  />
                </div>
              </template>
            </div>

            <!-- Mobile compact stepper -->
            <div class="sm:hidden">
              <div class="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3 shadow-sm">
                <div class="flex items-center gap-3">
                  <span class="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <span class="absolute -inset-1 animate-pulse rounded-full ring-2 ring-brand/20" />
                    <Icon :name="STEP_ICONS[step]" class="text-[17px]" />
                  </span>
                  <div>
                    <p class="text-[10.5px] font-medium text-ink-faint tabular-fa">
                      مرحله {{ faNumber(currentStepIndex + 1) }} از {{ faNumber(STEPS.length) }}
                    </p>
                    <p class="text-[13.5px] font-bold text-brand">{{ STEPS[currentStepIndex].label }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-1.5">
                  <span
                    v-for="(s, i) in STEPS"
                    :key="s.id"
                    class="h-1.5 rounded-full transition-all duration-300"
                    :class="[
                      step === s.id
                        ? 'w-6 bg-brand'
                        : isStepBehindCurrent(i)
                          ? 'w-1.5 bg-emerald-500'
                          : 'w-1.5 bg-line',
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= Loading skeleton ================= -->
      <div v-if="initializing || loading" class="container-content py-8 lg:py-10">
        <div class="grid gap-6 lg:grid-cols-[1fr_380px]">

          <!-- چپ: اسکلتون سبد -->
          <div class="overflow-hidden rounded-[20px] border border-line bg-white shadow-sm">
            <!-- هدر کارت -->
            <div class="flex items-center justify-between border-b border-line px-5 py-4">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 animate-pulse rounded bg-ink/[0.07]"></div>
                <div class="h-4 w-28 animate-pulse rounded-full bg-ink/[0.07]"></div>
              </div>
              <div class="h-3.5 w-20 animate-pulse rounded-full bg-ink/[0.05]"></div>
            </div>

            <!-- آیتم‌های محصول -->
            <div class="divide-y divide-line">
              <div v-for="i in 3" :key="i" class="flex gap-4 p-4">
                <!-- تصویر -->
                <div class="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-ink/[0.06]"></div>
                <!-- اطلاعات -->
                <div class="flex-1 space-y-3 py-1">
                  <div class="flex items-start justify-between gap-2">
                    <div class="h-4 w-3/5 animate-pulse rounded-full bg-ink/[0.08]"></div>
                    <div class="h-7 w-7 animate-pulse rounded-full bg-ink/[0.05]"></div>
                  </div>
                  <div class="h-3 w-2/5 animate-pulse rounded-full bg-ink/[0.05]"></div>
                  <div class="flex items-center justify-between">
                    <!-- کنترل تعداد -->
                    <div class="flex items-center gap-1 rounded-full border border-line p-1">
                      <div class="h-7 w-7 animate-pulse rounded-full bg-ink/[0.06]"></div>
                      <div class="h-4 w-5 animate-pulse rounded bg-ink/[0.06]"></div>
                      <div class="h-7 w-7 animate-pulse rounded-full bg-ink/[0.06]"></div>
                    </div>
                    <!-- قیمت -->
                    <div class="h-5 w-24 animate-pulse rounded-full bg-ink/[0.08]"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- بخش کوپن -->
            <div class="border-t border-dashed border-line bg-gradient-to-l from-gold/5 via-cream/40 to-transparent p-5">
              <div class="flex items-center gap-2">
                <div class="h-8 w-8 animate-pulse rounded-xl bg-ink/[0.06]"></div>
                <div class="h-4 w-32 animate-pulse rounded-full bg-ink/[0.08]"></div>
              </div>
              <div class="mt-3 flex gap-2">
                <div class="h-11 flex-1 animate-pulse rounded-2xl bg-ink/[0.06]"></div>
                <div class="h-11 w-20 animate-pulse rounded-xl bg-ink/[0.06]"></div>
              </div>
            </div>

            <!-- دکمه ادامه -->
            <div class="flex justify-end border-t border-line p-5">
              <div class="h-12 w-44 animate-pulse rounded-xl bg-ink/[0.07]"></div>
            </div>
          </div>

          <!-- راست: اسکلتون خلاصه سفارش -->
          <div class="overflow-hidden rounded-[20px] border border-line bg-white shadow-sm">
            <!-- نوار رنگی بالا -->
            <div class="h-1 w-full animate-pulse bg-ink/[0.06]"></div>
            <div class="p-6 space-y-5">
              <!-- عنوان -->
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 animate-pulse rounded bg-ink/[0.07]"></div>
                <div class="h-4 w-28 animate-pulse rounded-full bg-ink/[0.08]"></div>
              </div>
              <!-- ردیف‌های قیمت -->
              <div class="space-y-3.5 pt-1">
                <div v-for="i in 3" :key="i" class="flex items-center justify-between">
                  <div class="h-3.5 animate-pulse rounded-full bg-ink/[0.06]" :class="i === 1 ? 'w-36' : i === 2 ? 'w-24' : 'w-28'"></div>
                  <div class="h-3.5 animate-pulse rounded-full bg-ink/[0.08]" :class="i === 1 ? 'w-20' : 'w-16'"></div>
                </div>
              </div>
              <!-- نوار ارسال رایگان -->
              <div class="rounded-xl bg-ink/[0.03] p-3 space-y-2">
                <div class="flex justify-between">
                  <div class="h-3 w-32 animate-pulse rounded-full bg-ink/[0.07]"></div>
                  <div class="h-3 w-8 animate-pulse rounded-full bg-ink/[0.06]"></div>
                </div>
                <div class="h-1.5 w-full animate-pulse rounded-full bg-ink/[0.07]"></div>
              </div>
              <!-- مبلغ نهایی -->
              <div class="flex items-center justify-between border-t border-line pt-4">
                <div class="h-4 w-20 animate-pulse rounded-full bg-ink/[0.08]"></div>
                <div class="h-7 w-32 animate-pulse rounded-full bg-ink/[0.10]"></div>
              </div>
              <!-- دکمه -->
              <div class="h-12 w-full animate-pulse rounded-xl bg-ink/[0.07]"></div>
              <!-- تضمین‌ها -->
              <div class="flex items-center justify-center gap-4 border-t border-line pt-3">
                <div class="flex items-center gap-1.5">
                  <div class="h-3.5 w-3.5 animate-pulse rounded bg-ink/[0.06]"></div>
                  <div class="h-3 w-16 animate-pulse rounded-full bg-ink/[0.05]"></div>
                </div>
                <div class="h-3 w-px bg-line"></div>
                <div class="flex items-center gap-1.5">
                  <div class="h-3.5 w-3.5 animate-pulse rounded bg-ink/[0.06]"></div>
                  <div class="h-3 w-20 animate-pulse rounded-full bg-ink/[0.05]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="container-content py-8 lg:py-10">
        <!-- ================= Empty guard ================= -->
        <div v-if="emptyCart && step === 'cart'" class="mx-auto max-w-[480px] animate-fade-in-up">
          <div class="relative overflow-hidden rounded-3xl border border-line bg-white p-10 text-center">
            <div class="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl"></div>
            <div class="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand/5 blur-2xl"></div>

            <div class="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-cream to-white ring-1 ring-line">
              <span class="absolute inset-0 animate-ping-slow rounded-full bg-gold/10"></span>
              <Icon name="tabler:shopping-bag" class="relative animate-bounce-soft text-[40px] text-gold-deep" />
            </div>
            <h2 class="mt-6 text-price font-black text-brand">سبد خرید شما خالی است</h2>
            <p class="mx-auto mt-2 max-w-xs text-[14px] leading-6 text-ink-muted">
              هنوز محصولی اضافه نکرده‌اید. نگاهی به فروشگاه بندازید و بهترین‌ها را انتخاب کنید.
            </p>
            <div class="mt-7 flex justify-center gap-2">
              <UiBaseButton @click="navigateTo('/shop')">
                <Icon name="tabler:building-store" class="ml-1.5" />
                مشاهده فروشگاه
              </UiBaseButton>
            </div>
          </div>
        </div>

        <!-- ================= Content ================= -->
        <div v-else class="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <!-- LEFT: step content -->
          <section>
            <Transition name="step-fade" mode="out-in">
              <!-- ============= STEP 1: CART ============= -->
              <div v-if="step === 'cart'" key="cart" class="overflow-hidden rounded-[20px] border border-line bg-white shadow-sm">
                <div class="flex items-center justify-between border-b border-line px-5 py-4">
                  <p class="flex items-center gap-2 text-small font-bold text-brand">
                    <Icon name="tabler:package" class="text-gold" />
                    محصولات سبد شما
                  </p>
                  <button
                    v-if="itemCount"
                    class="flex items-center gap-1 text-meta text-ink-faint transition hover:text-red-500"
                    @click="clearCart"
                  >
                    <Icon name="tabler:trash-x" class="text-[14px]" />
                    خالی کردن سبد
                  </button>
                </div>

                <TransitionGroup name="list" tag="div" class="divide-y divide-line">
                  <div
                    v-for="item in invoiceDetails"
                    :key="item.id"
                    class="group flex gap-4 p-4 transition-colors hover:bg-cream/30"
                  >
                    <div class="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream ring-1 ring-line/60">
                      <img
                        v-if="item.products?.cover_image"
                        :src="item.products.cover_image"
                        :alt="item.products.title_fa"
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span class="absolute bottom-0 right-0 rounded-tl-lg bg-brand/90 px-1.5 py-0.5 text-[10px] font-bold text-white tabular-fa">
                        × {{ faNumber(item.amount) }}
                      </span>
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="flex items-start justify-between gap-2">
                        <p class="line-clamp-1 text-[14px] font-bold text-brand">
                          {{ item.products?.title_fa }}
                        </p>
                        <button
                          class="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-faint transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                          :disabled="btnLoadingShop"
                          @click="removeLine(item)"
                        >
                          <Icon name="tabler:trash" class="text-[15px]" />
                        </button>
                      </div>

                      <div
                        v-if="getAddons(item).length"
                        class="mt-1.5 flex flex-wrap gap-1"
                      >
                        <span
                          v-for="(a, idx) in getAddons(item)"
                          :key="idx"
                          class="rounded-full bg-cream px-2 py-0.5 text-micro text-ink-muted"
                        >
                          {{ a.title }}
                        </span>
                      </div>

                      <div class="mt-3 flex items-center justify-between">
                        <div class="flex items-center gap-1 rounded-full border border-line bg-white p-1">
                          <button
                            class="grid h-7 w-7 place-items-center rounded-full text-ink-muted transition hover:bg-cream hover:text-brand disabled:opacity-40"
                            :disabled="btnLoadingShop || item.amount <= 1"
                            @click="decreaseAmount(item)"
                          >
                            <Icon name="tabler:minus" class="text-[14px]" />
                          </button>
                          <span class="w-6 text-center text-[13px] font-bold tabular-fa">{{ faNumber(item.amount) }}</span>
                          <button
                            class="grid h-7 w-7 place-items-center rounded-full text-ink-muted transition hover:bg-cream hover:text-brand disabled:opacity-40"
                            :disabled="btnLoadingShop || item.amount === item.products?.maximum_sale_quantity"
                            @click="increaseAmount(item)"
                          >
                            <Icon name="tabler:plus" class="text-[14px]" />
                          </button>
                        </div>

                        <p class="text-[14px] font-black text-brand tabular-fa">
                          {{ faPrice((item.unit_price || item.products?.final_price || 0) * item.amount) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </TransitionGroup>

                <!-- Coupon -->
                <div class="relative overflow-hidden border-t border-dashed border-line bg-gradient-to-l from-gold/5 via-cream/40 to-transparent p-5">
                  <div class="flex items-center gap-2">
                    <span class="grid h-8 w-8 place-items-center rounded-xl bg-gold/15 text-gold-deep">
                      <Icon name="tabler:gift" class="text-[16px]" />
                    </span>
                    <p class="text-small font-bold text-brand">کد تخفیف دارید؟</p>
                    <Transition name="pop-fade">
                      <span
                        v-if="couponSuccess"
                        class="mr-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-micro font-bold text-emerald-600"
                      >
                        <Icon name="tabler:circle-check" class="text-[13px]" /> اعمال شد
                      </span>
                    </Transition>
                  </div>

                  <div class="mt-3 flex gap-2">
                    <div class="relative flex-1">
                      <UiBaseInput
                        v-model="coupon"
                        :error="!!couponError"
                        placeholder="مثلا: SUSHIA10"
                        class="uppercase"
                        @keydown.enter="applyCoupon"
                      />
                      <button
                        v-if="invoice.discount_code || couponSuccess"
                        class="absolute left-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-cream text-ink-muted transition hover:bg-red-50 hover:text-red-500"
                        @click="removeCoupon"
                      >
                        <Icon name="tabler:x" class="text-[14px]" />
                      </button>
                    </div>
                    <UiBaseButton variant="secondary" :loading="couponLoading" class="shrink-0" @click="applyCoupon">
                      اعمال
                    </UiBaseButton>
                  </div>
                  <Transition name="fade-slide">
                    <p v-if="couponError" class="mt-2 flex items-center gap-1 text-meta text-danger" role="alert">
                      <Icon name="tabler:alert-circle" class="text-[13px]" /> {{ couponError }}
                    </p>
                  </Transition>
                  <Transition name="fade-slide">
                    <p v-if="couponSuccess" class="mt-2 text-meta text-emerald-600">تخفیف با موفقیت اعمال شد</p>
                  </Transition>
                  <p v-if="invoice.discount_code" class="mt-2 text-meta text-ink-muted">
                    کد فعال: <span class="font-bold text-brand">{{ invoice.discount_code }}</span>
                  </p>
                </div>

                <div class="flex justify-end border-t border-line p-5">
                  <UiBaseButton :disabled="emptyCart" class="group" @click="goToInfo">
                    تایید و تکمیل سفارش
                    <Icon name="tabler:arrow-left" class="mr-1.5 transition-transform group-hover:-translate-x-1" />
                  </UiBaseButton>
                </div>
              </div>

              <!-- ============= STEP 2: INFO ============= -->
              <div v-else-if="step === 'info'" key="info" class="space-y-5">
                <!-- Address summary + trigger for the address dialog -->
                <div v-if="hasShippable" class="rounded-[20px] border border-line bg-white p-5 shadow-sm">
                  <div class="mb-4 flex items-center justify-between">
                    <h3 class="flex items-center gap-2 font-black text-brand">
                      <span class="grid h-8 w-8 place-items-center rounded-xl bg-gold/15 text-gold-deep">
                        <Icon name="tabler:map-pin" class="text-[16px]" />
                      </span>
                      آدرس تحویل
                    </h3>
                    <button
                      type="button"
                      class="flex items-center gap-1 text-meta font-bold text-gold-deep transition hover:text-brand"
                      @click="selectedAddress ? openAddressModal(0) : startAddNewAddress()"
                    >
                      <Icon :name="selectedAddress ? 'tabler:replace' : 'tabler:plus'" class="text-[14px]" />
                      {{ selectedAddress ? 'تغییر آدرس' : 'افزودن آدرس' }}
                    </button>
                  </div>

                  <div v-if="selectedAddress" class="rounded-2xl border border-line bg-cream/20 p-4">
                    <div class="flex items-center gap-2">
                      <Icon name="tabler:home-2" class="text-[15px] text-gold-deep" />
                      <p class="text-[14px] font-bold text-brand">{{ selectedAddress.title }}</p>
                    </div>
                    <p class="mt-2 text-[13px] leading-6 text-ink-muted">
                      آدرس: {{ selectedAddress.description }}
                      <span v-if="selectedAddress.postal_code"> - کدپستی ({{ selectedAddress.postal_code }})</span>
                    </p>
                    <p v-if="selectedAddress.receiver_is_different" class="mt-1 flex items-center gap-1 text-meta text-ink-faint">
                      <Icon name="tabler:user" class="text-[12px]" />
                      گیرنده: {{ selectedAddress.receiver_full_name }} - {{ selectedAddress.receiver_mobile }}
                    </p>
                  </div>
                  <div v-else class="rounded-2xl border border-dashed border-line p-6 text-center">
                    <Icon name="tabler:map-pin-off" class="mx-auto text-[28px] text-ink-faint" />
                    <p class="mt-2 text-[13px] text-ink-muted">هنوز آدرسی ثبت نکرده‌اید</p>
                  </div>
                </div>

                <!-- Shipping method -->
                <div v-if="hasShippable" class="rounded-[20px] border border-line bg-white p-5 shadow-sm">
                  <h3 class="mb-4 flex items-center gap-2 font-black text-brand">
                    <span class="grid h-8 w-8 place-items-center rounded-xl bg-gold/15 text-gold-deep">
                      <Icon name="tabler:truck-delivery" class="text-[16px]" />
                    </span>
                    روش ارسال
                  </h3>
                  <div class="space-y-3">
                    <label
                      v-for="m in deliveryMethods"
                      :key="m.id"
                      class="flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-200"
                      :class="
                        selectedShippingMethod?.id === m.id
                          ? 'border-gold bg-gold/8 ring-2 ring-gold/20'
                          : 'border-line hover:border-gold/40 hover:bg-cream/20'
                      "
                    >
                      <input type="radio" class="sr-only" :value="m.id" :checked="selectedShippingMethod?.id === m.id" @change="chooseShippingMethod(m)" />
                      <span
                        class="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors"
                        :class="selectedShippingMethod?.id === m.id ? 'bg-brand text-gold' : 'bg-cream text-ink-muted'"
                      >
                        <Icon name="tabler:truck" class="text-h3" />
                      </span>
                      <div class="min-w-0 flex-1">
                        <span class="text-[14px] font-bold text-brand">{{ m.title }}</span>
                      </div>
                      <span
                        class="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors"
                        :class="selectedShippingMethod?.id === m.id ? 'border-gold bg-gold' : 'border-line'"
                      >
                        <Icon v-if="selectedShippingMethod?.id === m.id" name="tabler:check" class="text-[11px] text-white" />
                      </span>
                    </label>
                  </div>

                  <!-- روزها و ساعات ارسال -->
                  <div v-if="deliveryDays.length" class="mt-5 space-y-3 border-t border-line pt-4">
                    <p class="flex items-center gap-1.5 text-[13px] font-bold text-brand">
                      <Icon name="tabler:calendar-time" class="text-gold-deep" /> انتخاب زمان ارسال
                    </p>
                    <div class="scrollbar-thin flex gap-2 overflow-x-auto pb-1">
                      <button
                        v-for="day in deliveryDays"
                        :key="day.date"
                        type="button"
                        class="shrink-0 rounded-2xl border px-3.5 py-2.5 text-center transition-all duration-200"
                        :class="[
                          selectedDay?.date === day.date ? 'border-gold bg-gold/10 text-gold-deep shadow-sm' : 'border-line text-ink-muted hover:border-gold/40',
                          day.isClosed ? 'cursor-not-allowed opacity-40' : '',
                        ]"
                        :disabled="day.isClosed"
                        @click="selectedDay = day"
                      >
                        <span class="block text-meta font-bold">{{ day.dateFaName || day.title || (day.date ? faDate(day.date) : '') }}</span>
                        <span class="mt-0.5 block text-micro">{{ day.isToday ? 'امروز' : (day.date ? faDate(day.date) : '') }}</span>
                        <span v-if="day.isClosed" class="mt-1 block text-micro font-bold text-danger">تعطیل</span>
                      </button>
                    </div>

                    <div v-if="selectedDay?.times?.length" class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <button
                        v-for="slot in selectedDay.times"
                        :key="slot.id"
                        type="button"
                        class="flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-right transition-all duration-200"
                        :class="[
                          selectedTimeSlot?.id === slot.id ? 'border-gold bg-gold/10 shadow-sm' : 'border-line hover:border-gold/40',
                          slot.isDisabled ? 'cursor-not-allowed opacity-40' : '',
                        ]"
                        :disabled="slot.isDisabled"
                        @click="selectedTimeSlot = slot"
                      >
                        <span class="flex items-center gap-2">
                          <Icon name="tabler:clock" class="text-[14px] text-ink-faint" />
                          <span>
                            <span class="block text-meta font-bold text-brand">{{ slot.title }}</span>
                            <span class="mt-0.5 block text-micro text-ink-muted tabular-fa">ساعت {{ slot.from_time }} تا {{ slot.to_time }}</span>
                          </span>
                        </span>
                        <span
                          class="shrink-0 text-[11px] font-bold"
                          :class="slotPriceLabel(slot) === 'رایگان' ? 'text-emerald-600' : 'text-ink-muted'"
                        >
                          {{ slotPriceLabel(slot) }}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <Transition name="fade-slide">
                  <p v-if="infoError" class="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600" role="alert">
                    <Icon name="tabler:alert-circle" class="text-[16px]" /> {{ infoError }}
                  </p>
                </Transition>

                <div class="flex justify-between gap-2">
                  <UiBaseButton variant="secondary" @click="backToCart">
                    <Icon name="tabler:arrow-right" class="ml-1.5" /> بازگشت
                  </UiBaseButton>
                  <UiBaseButton class="group" @click="goToPayment">
                    ذخیره و ادامه
                    <Icon name="tabler:arrow-left" class="mr-1.5 transition-transform group-hover:-translate-x-1" />
                  </UiBaseButton>
                </div>
              </div>

              <!-- ============= STEP 3: PAYMENT ============= -->
              <div v-else key="payment" class="space-y-5">
                <div class="rounded-[20px] border border-line bg-white p-5 shadow-sm">
                  <h3 class="mb-4 flex items-center gap-2 font-black text-brand">
                    <span class="grid h-8 w-8 place-items-center rounded-xl bg-gold/15 text-gold-deep">
                      <Icon name="tabler:credit-card" class="text-[16px]" />
                    </span>
                    روش پرداخت
                  </h3>
                  <div class="space-y-3">
                    <label
                      v-for="opt in paymentProcedures"
                      :key="opt.pp_id + '-' + (opt.gateway_id || '')"
                      class="flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all duration-200"
                      :class="
                        paymentMethod === opt
                          ? 'border-gold bg-gold/8 ring-2 ring-gold/20'
                          : 'border-line hover:border-gold/40 hover:bg-cream/20'
                      "
                    >
                      <input v-model="paymentMethod" type="radio" class="sr-only" :value="opt" />
                      <span
                        class="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors"
                        :class="paymentMethod === opt ? 'bg-brand text-gold' : 'bg-cream text-ink-muted'"
                      >
                        <Icon
                          :name="
                            opt.pp_d1 === 'walletPayment'
                              ? 'tabler:wallet'
                              : opt.pp_d1 === 'offlinePayment'
                                ? 'tabler:cash'
                                : 'tabler:credit-card'
                          "
                          class="text-h3"
                        />
                      </span>
                      <div class="min-w-0 flex-1">
                        <span class="text-[14px] font-bold text-brand">
                          {{ opt.pp_title }}<span v-if="opt.gateway_title"> ({{ opt.gateway_title }})</span>
                        </span>
                        <p v-if="opt.pp_d1 === 'walletPayment'" class="mt-0.5 flex items-center gap-1 text-meta text-ink-muted">
                          <Icon name="tabler:coin" class="text-[13px] text-gold-deep" />
                          موجودی: {{ faPrice(walletInfo.balance || 0) }}
                        </p>
                      </div>
                      <span
                        class="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors"
                        :class="paymentMethod === opt ? 'border-gold bg-gold' : 'border-line'"
                      >
                        <Icon v-if="paymentMethod === opt" name="tabler:check" class="text-[11px] text-white" />
                      </span>
                    </label>
                  </div>

                  <div class="mt-4 flex items-center gap-2 rounded-xl bg-cream/60 p-3 text-meta leading-6 text-ink-muted">
                    <Icon name="tabler:shield-lock" class="shrink-0 text-[16px] text-brand" />
                    اطلاعات بانکی شما نزد ما ذخیره نمی‌شود.
                  </div>

                  <Transition
                    name="wallet-alert"
                    @before-enter="beforeWalletAlertEnter"
                    @enter="enterWalletAlert"
                    @after-enter="afterWalletAlertEnter"
                    @before-leave="beforeWalletAlertLeave"
                    @leave="leaveWalletAlert"
                  >
                    <div
                      v-if="paymentMethod?.pp_d1 === 'walletPayment' && walletShortfall !== 0"
                      class="mt-4 flex flex-col gap-3 overflow-hidden rounded-xl bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p class="flex items-center gap-2 text-[13px] font-medium text-amber-700">
                        <Icon name="tabler:alert-triangle" class="shrink-0 text-[16px]" />
                        موجودی کیف پول کافی نیست. {{ faPrice(walletShortfall) }} کسری دارید.
                      </p>
                      <UiBaseButton variant="secondary" size="sm" class="shrink-0" @click="openIncreaseBalanceDialog">
                        افزایش موجودی
                      </UiBaseButton>
                    </div>
                  </Transition>
                </div>

                <div class="rounded-[20px] border border-line bg-white p-5 shadow-sm">
                  <label class="mb-1.5 flex items-center gap-1.5 text-meta font-bold text-ink-muted">
                    <Icon name="tabler:message-2" class="text-[14px]" />
                    توضیحات سفارش <span class="text-[10px] font-normal text-ink-faint">(اختیاری)</span>
                  </label>
                  <textarea v-model="orderDescription" rows="3" maxlength="250" class="field resize-y" placeholder="مثلاً بسته‌بندی هدیه" />
                  <p class="mt-1 text-left text-[10px] text-ink-faint tabular-fa">{{ faNumber(orderDescription.length) }} / ۲۵۰</p>
                </div>

                <Transition name="fade-slide">
                  <p v-if="paymentError" class="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600" role="alert">
                    <Icon name="tabler:alert-circle" class="text-[16px]" /> {{ paymentError }}
                  </p>
                </Transition>

                <div class="flex justify-between gap-2">
                  <UiBaseButton variant="secondary" @click="backToInfo">
                    <Icon name="tabler:arrow-right" class="ml-1.5" /> بازگشت
                  </UiBaseButton>
                  <UiBaseButton
                    :disabled="paymentMethod?.pp_d1 === 'walletPayment' && walletShortfall !== 0"
                    :loading="submitting"
                    @click="submitOrder"
                  >
                    {{ paymentMethod?.pp_d1 === 'offlinePayment' ? 'ثبت سفارش' : 'پرداخت و ثبت سفارش' }}
                    <Icon name="tabler:check" class="mr-1.5" />
                  </UiBaseButton>
                </div>
              </div>
            </Transition>
          </section>

          <!-- RIGHT: order summary -->
          <aside class="lg:sticky lg:top-28">
            <div class="animate-fade-in-up overflow-hidden rounded-[20px] border border-line bg-white shadow-sm">
              <div class="h-1 w-full bg-gradient-to-l from-gold via-gold-deep to-brand"></div>

              <div class="p-6">
                <div class="mb-4 flex items-center justify-between">
                  <h2 class="flex items-center gap-2 text-[15px] font-black text-brand">
                    <Icon name="tabler:receipt" class="text-gold-deep" />
                    خلاصه سفارش
                  </h2>
                  <span v-if="step !== 'cart'" class="rounded-full bg-cream px-2.5 py-1 text-meta font-bold text-gold-deep">{{ faNumber(itemCount) }} کالا</span>
                </div>

                <ul v-if="step !== 'cart'" class="scrollbar-thin max-h-48 space-y-3 overflow-y-auto border-b border-line pb-4">
                  <li v-for="item in invoiceDetails" :key="item.id" class="flex gap-3">
                    <div class="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream ring-1 ring-line/60">
                      <img v-if="item.products?.cover_image" :src="item.products.cover_image" class="h-full w-full object-cover" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="line-clamp-1 text-[13px] font-bold text-brand">{{ item.products?.title_fa }}</p>
                      <p class="mt-0.5 text-micro text-ink-faint tabular-fa">
                        {{ faNumber(item.amount) }} × {{ faPrice(item.unit_price || item.products?.final_price || 0) }}
                      </p>
                    </div>
                  </li>
                </ul>

                <dl class="mt-4 space-y-2.5 text-[13px]">
                  <div class="flex justify-between">
                    <dt class="flex items-center gap-1.5 text-ink-muted">
                      <Icon name="tabler:shopping-bag" class="text-[14px]" />
                      جمع کالاها ({{ faNumber(itemCount) }} کالا)
                    </dt>
                    <dd class="tabular-fa font-medium">{{ faPrice(invoiceSubtotal) }}</dd>
                  </div>
                  <div v-if="invoiceDiscount" class="flex justify-between text-emerald-600">
                    <dt class="flex items-center gap-1"><Icon name="tabler:discount-2" class="text-body-lg" /> تخفیف</dt>
                    <dd class="tabular-fa font-bold">-{{ faPrice(invoiceDiscount) }}</dd>
                  </div>
                  <div v-if="invoiceTax" class="flex justify-between">
                    <dt class="flex items-center gap-1.5 text-ink-muted">
                      <Icon name="tabler:receipt-tax" class="text-[14px]" />
                      مالیات
                    </dt>
                    <dd class="tabular-fa font-medium">{{ faPrice(invoiceTax) }}</dd>
                  </div>
                  <div v-if="hasShippable" class="flex justify-between">
                    <dt class="flex items-center gap-1.5 text-ink-muted">
                      <Icon name="tabler:truck-delivery" class="text-[14px]" />
                      هزینه ارسال
                    </dt>
                    <dd class="tabular-fa">
                      <span v-if="step === 'cart'" class="text-ink-faint">در مرحله بعد</span>
                      <span v-else-if="!selectedTimeSlot" class="text-ink-faint">انتخاب نشده</span>
                      <span v-else-if="shippingCost === 0" class="font-bold text-emerald-600">رایگان</span>
                      <span v-else>{{ faPrice(shippingCost) }}</span>
                    </dd>
                  </div>
                </dl>

                <div v-if="step === 'cart' && remainingForFreeShipping > 0" class="mt-5 overflow-hidden rounded-xl bg-gold/10 p-3">
                  <div class="flex items-center justify-between text-meta">
                    <span class="flex items-center gap-1 font-bold text-gold-deep">
                      <Icon name="tabler:truck" class="text-[14px]" />
                      {{ faPrice(remainingForFreeShipping) }} تا ارسال رایگان
                    </span>
                    <span class="tabular-fa text-ink-faint">{{ faNumber(Math.round(freeShippingProgress)) }}٪</span>
                  </div>
                  <div class="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
                    <div
                      class="relative h-full rounded-full bg-gradient-to-l from-gold to-gold-deep transition-all duration-700"
                      :style="{ width: `${freeShippingProgress}%` }"
                    >
                      <span class="absolute inset-0 animate-shimmer bg-gradient-to-l from-transparent via-white/50 to-transparent"></span>
                    </div>
                  </div>
                </div>
                <div v-else-if="step === 'cart' && freeShippingThreshold" class="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-meta font-bold text-emerald-600">
                  <Icon name="tabler:circle-check" class="text-[15px]" /> شما مشمول ارسال رایگان هستید 🎉
                </div>

                <div class="mt-4 flex items-baseline justify-between border-t border-line pt-4">
                  <span class="text-[14px] font-bold text-brand">مبلغ نهایی</span>
                  <span class="bg-gradient-to-l from-brand to-brand/70 bg-clip-text text-h2 font-black text-transparent tabular-fa">
                    {{ faPrice(orderTotal) }}
                  </span>
                </div>

                <UiBaseButton
                  v-if="step === 'cart'"
                  :disabled="emptyCart"
                  class="mt-4 hidden w-full lg:flex"
                  @click="goToInfo"
                >
                  تایید و تکمیل سفارش
                  <Icon name="tabler:arrow-left" class="mr-1.5" />
                </UiBaseButton>

                <div class="mt-4 flex items-center justify-center gap-4 border-t border-line pt-3">
                  <p class="flex items-center gap-1.5 text-micro text-ink-faint">
                    <Icon name="tabler:shield-check" class="text-[14px] text-brand" />
                    پرداخت امن
                  </p>
                  <span class="h-3 w-px bg-line"></span>
                  <p class="flex items-center gap-1.5 text-micro text-ink-faint">
                    <Icon name="tabler:route" class="text-[14px] text-brand" />
                    پیگیری سفارش
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <!-- Mobile sticky bar -->
      <Transition name="fade-slide">
        <div
          v-if="!emptyCart && !loading"
          class="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm lg:hidden"
        >
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-micro text-ink-faint">مبلغ نهایی</p>
              <p class="text-body-lg font-black text-brand tabular-fa">{{ faPrice(orderTotal) }}</p>
            </div>
            <UiBaseButton :disabled="primaryDisabled" :loading="submitting" @click="primaryAction">
              {{ primaryLabel }}
            </UiBaseButton>
          </div>
        </div>
      </Transition>

      <!-- ================= Address modal ================= -->
      <Teleport to="body">
        <Transition name="modal-fade">
          <div v-if="addressModalOpen" class="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" @click.self="closeAddressModal">
            <Transition name="modal-pop" appear>
              <div class="max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-white p-5 sm:max-w-lg sm:rounded-3xl sm:p-6">
                <div class="mb-4 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-deep">
                      <Icon :name="addressStep === 0 ? 'tabler:list' : addressStep === 1 ? 'tabler:map-pin' : 'tabler:edit'" class="text-[18px]" />
                    </span>
                    <div>
                      <h3 class="text-[15px] font-black text-brand">
                        {{ addressStep === 0 ? 'انتخاب آدرس' : 'آدرس جدید' }}
                      </h3>
                      <p v-if="addressStep !== 0" class="mt-0.5 text-meta text-ink-muted">
                        {{ addressStep === 1 ? 'موقعیت مکانی آدرس را روی نقشه مشخص کنید' : 'اطلاعات آدرس را کامل کنید' }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      v-if="addressStep === 1 && addresses.length"
                      type="button"
                      class="text-meta font-bold text-ink-muted transition hover:text-brand"
                      @click="addressStep = 0"
                    >
                      برگشت
                    </button>
                    <button
                      v-if="addressStep === 2"
                      type="button"
                      class="text-meta font-bold text-ink-muted transition hover:text-brand"
                      @click="addressStep = 1"
                    >
                      برگشت
                    </button>
                    <button type="button" class="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink-muted transition hover:bg-red-50 hover:text-red-500" @click="closeAddressModal">
                      <Icon name="tabler:x" class="text-[16px]" />
                    </button>
                  </div>
                </div>

                <!-- Step 0: list -->
                <div v-if="addressStep === 0">
                  <button
                    type="button"
                    class="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gold/50 py-3 text-[13px] font-bold text-gold-deep transition hover:border-gold hover:bg-gold/5"
                    @click="startAddNewAddress"
                  >
                    <Icon name="tabler:plus" class="text-[16px]" /> افزودن آدرس جدید
                  </button>

                  <div v-if="addresses.length" class="space-y-3">
                    <div
                      v-for="a in addresses"
                      :key="a.id"
                      class="cursor-pointer rounded-2xl border p-4 transition-all duration-200"
                      :class="selectedAddressId === a.id ? 'border-gold bg-gold/8 ring-2 ring-gold/20' : 'border-line hover:border-gold/40'"
                      @click="
                        selectedAddressId = a.id;
                        closeAddressModal();
                      "
                    >
                      <div class="flex items-center justify-between">
                        <p class="flex items-center gap-1.5 text-[13px] font-bold text-brand">
                          <Icon name="tabler:home-2" class="text-[14px] text-gold-deep" />
                          {{ a.title }}
                        </p>
                        <span v-if="selectedAddressId === a.id" class="grid h-5 w-5 place-items-center rounded-full bg-gold text-white">
                          <Icon name="tabler:check" class="text-[11px]" />
                        </span>
                      </div>
                      <p class="mt-2 text-meta leading-6 text-ink-muted">{{ a.description }} - کدپستی ({{ a.postal_code }})</p>
                      <p class="mt-1 text-meta text-ink-faint">گیرنده: {{ a.receiver_full_name }} - {{ a.receiver_mobile }}</p>
                      <div class="mt-3 flex justify-end gap-3 border-t border-line pt-3">
                        <button type="button" class="flex cursor-pointer items-center gap-1 text-meta font-bold text-amber-600" @click.stop="openEditAddressForm(a)">
                          <Icon name="tabler:pencil" class="text-[14px]" /> ویرایش
                        </button>
                        <button type="button" class="flex cursor-pointer items-center gap-1 text-meta font-bold text-danger" @click.stop="openDeleteDialog(a.id)">
                          <Icon name="tabler:trash" class="text-[14px]" /> حذف
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-else class="py-8 text-center">
                    <Icon name="tabler:map-pin-off" class="mx-auto text-[40px] text-ink-faint" />
                    <p class="mt-3 text-[13px] font-bold text-brand">هیچ آدرسی ثبت نکرده‌اید</p>
                    <p class="mt-1 text-meta text-ink-muted">برای ادامه، آدرس خود را اضافه کنید.</p>
                  </div>
                </div>

                <!-- Step 1: map -->
                <div v-else-if="addressStep === 1" class="space-y-4">
                  <ClientOnly>
                    <!-- <CartAddressMapPicker v-model="geoLatLng" /> -->
                    <AccountNeshanMapInput @handle-lat-lng="geoLatLng = $event" />
                  </ClientOnly>
                  <div class="flex justify-end">
                    <UiBaseButton :disabled="!hasValidMapLatLng" @click="addressStep = 2">
                      تایید و ادامه
                      <Icon name="tabler:arrow-left" class="mr-1.5" />
                    </UiBaseButton>
                  </div>
                </div>

                <!-- Step 2: form -->
                <div v-else class="space-y-4">
                  <div>
                    <label class="mb-1.5 block text-meta font-bold text-ink-muted">عنوان آدرس <span class="text-danger">*</span></label>
                    <input v-model="newAddress.title" type="text" class="field" :class="addressErrors.title && 'field-error'" placeholder="مثلاً خانه" />
                    <p v-if="addressErrors.title" class="err">{{ addressErrors.title }}</p>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <UiBaseSelect
                      v-model="selectedProvinceTitle"
                      label="استان"
                      :options="locationGroups.map((g) => g.title)"
                      placeholder="انتخاب استان"
                      required
                    />
                    
                    <UiBaseSelect
                      v-model="newAddress.address_id"
                      label="شهر"
                      :options="citiesForSelectedProvince.map((c) => ({ label: c.title, value: c.id }))"
                      placeholder="انتخاب شهر"
                      :disabled="!citiesForSelectedProvince.length"
                      :error="addressErrors.address_id"
                      required
                    />
                  </div>

                  <div>
                    <label class="mb-1.5 block text-meta font-bold text-ink-muted">آدرس کامل <span class="text-danger">*</span></label>
                    <textarea v-model="newAddress.street" rows="3" class="field resize-y" :class="addressErrors.street && 'field-error'" placeholder="خیابان، کوچه، ..." />
                    <p v-if="addressErrors.street" class="err">{{ addressErrors.street }}</p>
                  </div>

                  <div class="grid grid-cols-3 gap-3">
                    <div>
                      <label class="mb-1.5 block text-meta font-bold text-ink-muted">پلاک <span class="text-danger">*</span></label>
                      <input v-model="newAddress.plaque" type="text" class="field" :class="addressErrors.plaque && 'field-error'" />
                      <p v-if="addressErrors.plaque" class="err">{{ addressErrors.plaque }}</p>
                    </div>
                    <div>
                      <label class="mb-1.5 block text-meta font-bold text-ink-muted">واحد</label>
                      <input v-model="newAddress.unit" type="text" class="field" />
                    </div>
                    <div>
                      <label class="mb-1.5 block text-meta font-bold text-ink-muted">کد پستی <span class="text-danger">*</span></label>
                      <input v-model="newAddress.postal_code" type="text" inputmode="numeric" maxlength="10" dir="ltr" class="field text-left" :class="addressErrors.postal_code && 'field-error'" placeholder="1234567890" />
                      <p v-if="addressErrors.postal_code" class="err">{{ addressErrors.postal_code }}</p>
                    </div>
                  </div>

                  <label class="flex items-center gap-2 text-[13px] text-ink-muted">
                    <input v-model="newAddress.receiver_is_different" type="checkbox" class="h-4 w-4 rounded border-line accent-gold" />
                    گیرنده سفارش شخص دیگری است
                  </label>

                  <Transition name="fade-slide">
                    <div v-if="newAddress.receiver_is_different" class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label class="mb-1.5 block text-meta font-bold text-ink-muted">نام گیرنده</label>
                        <input v-model="newAddress.receiver_full_name" type="text" class="field" />
                      </div>
                      <div>
                        <label class="mb-1.5 block text-meta font-bold text-ink-muted">موبایل گیرنده</label>
                        <input v-model="newAddress.receiver_mobile" type="tel" dir="ltr" class="field text-left" />
                      </div>
                    </div>
                  </Transition>

                  <p class="flex items-center justify-center gap-1.5 text-center text-micro text-ink-faint">
                    <Icon name="tabler:truck" class="text-[13px]" />
                    مرسوله‌های شما به این موقعیت ارسال خواهد شد.
                  </p>

                  <div class="flex justify-end gap-2 border-t border-line pt-4">
                    <UiBaseButton :loading="savingAddress" @click="saveAddress">ثبت آدرس</UiBaseButton>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>

      <!-- Delete address confirm -->
      <Teleport to="body">
        <Transition name="modal-fade">
          <div v-if="dialogDelete" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]" @click.self="closeDeleteDialog">
            <Transition name="modal-pop" appear>
              <div class="w-full max-w-sm rounded-2xl bg-white p-6 text-center">
                <div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
                  <Icon name="tabler:trash" class="text-[24px]" />
                </div>
                <p class="mt-4 mb-1 text-[14px] font-bold text-brand">حذف آدرس</p>
                <p class="mb-5 text-[13px] text-ink-muted">آیا از حذف این آدرس مطمئن هستید؟ این عملیات قابل بازگشت نیست.</p>
                <div class="flex justify-center gap-2">
                  <UiBaseButton variant="secondary" @click="closeDeleteDialog">انصراف</UiBaseButton>
                  <UiBaseButton :loading="isDeleting" @click="deleteAddress">حذف</UiBaseButton>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>

      <!-- Wallet: increase balance -->
      <Teleport to="body">
        <Transition name="modal-fade">
          <div v-if="increaseBalanceDialog" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]" @click.self="increaseBalanceDialog = false">
            <Transition name="modal-pop" appear>
              <div class="w-full max-w-sm rounded-2xl bg-white p-6">
                <div class="flex items-center gap-3">
                  <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-deep">
                    <Icon name="tabler:wallet" class="text-[18px]" />
                  </span>
                  <h3 class="text-[15px] font-black text-brand">افزایش کیف پول</h3>
                </div>
                <p class="mt-3 text-[13px] leading-6 text-ink-muted">
                  آیا مبلغ <span class="font-bold text-brand">{{ faPrice(walletShortfall) }}</span> به کیف پول شما افزایش داده شود؟
                </p>

                <div class="mt-4 space-y-2">
                  <label
                    v-for="opt in paymentProcedures.filter((p) => p.pp_d1 === 'onlinePayment')"
                    :key="opt.pp_id + '-' + (opt.gateway_id || '')"
                    class="flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition"
                    :class="paymentOption2 === opt ? 'border-gold bg-gold/8' : 'border-line'"
                  >
                    <input v-model="paymentOption2" type="radio" class="sr-only" :value="opt" />
                    <span class="text-[13px] font-bold text-brand">{{ opt.pp_title }}</span>
                    <span v-if="opt.gateway_title" class="text-meta text-ink-muted">({{ opt.gateway_title }})</span>
                    <span
                      class="mr-auto grid h-4 w-4 shrink-0 place-items-center rounded-full border-2"
                      :class="paymentOption2 === opt ? 'border-gold bg-gold' : 'border-line'"
                    />
                  </label>
                </div>

                <div class="mt-5 flex justify-end gap-2">
                  <UiBaseButton variant="secondary" size="sm" @click="increaseBalanceDialog = false">لغو</UiBaseButton>
                  <UiBaseButton size="sm" :loading="increasingBalance" @click="increaseBalance">تایید و پرداخت</UiBaseButton>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>

      <!-- Complete user identity info -->
      <Teleport to="body">
        <Transition name="modal-fade">
          <div v-if="userInfoDialog" class="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" @click.self="userInfoDialog = false">
            <Transition name="modal-pop" appear>
              <div class="max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-white p-6 sm:max-w-md sm:rounded-3xl">
                <div class="mb-4 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-deep">
                      <Icon name="tabler:user-edit" class="text-[18px]" />
                    </span>
                    <h3 class="text-[15px] font-black text-brand">ویرایش اطلاعات فردی</h3>
                  </div>
                  <button type="button" class="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink-muted transition hover:bg-red-50 hover:text-red-500" @click="userInfoDialog = false">
                    <Icon name="tabler:x" class="text-[16px]" />
                  </button>
                </div>
                <p class="mb-4 flex items-center gap-1.5 text-meta text-ink-muted">
                  <Icon name="tabler:info-circle" class="text-[14px]" />
                  برای ادامه خرید، تکمیل اطلاعات هویتی الزامی است.
                </p>

                <div class="space-y-4">
                  <div>
                    <label class="mb-1.5 block text-meta font-bold text-ink-muted">نام</label>
                    <input v-model="userInfoForm.first_name" type="text" class="field" :class="userInfoErrors.first_name && 'field-error'" />
                    <p v-if="userInfoErrors.first_name" class="err">{{ userInfoErrors.first_name }}</p>
                  </div>
                  <div>
                    <label class="mb-1.5 block text-meta font-bold text-ink-muted">نام خانوادگی</label>
                    <input v-model="userInfoForm.last_name" type="text" class="field" :class="userInfoErrors.last_name && 'field-error'" />
                    <p v-if="userInfoErrors.last_name" class="err">{{ userInfoErrors.last_name }}</p>
                  </div>
                  <div>
                    <label class="mb-1.5 block text-meta font-bold text-ink-muted">کد ملی</label>
                    <input v-model="userInfoForm.national_code" type="text" inputmode="numeric" maxlength="10" dir="ltr" class="field text-left" :class="userInfoErrors.national_code && 'field-error'" />
                    <p v-if="userInfoErrors.national_code" class="err">{{ userInfoErrors.national_code }}</p>
                  </div>
                  <div>
                    <label class="mb-1.5 block text-meta font-bold text-ink-muted">جنسیت</label>
                    <select v-model="userInfoForm.gender" class="field">
                      <option :value="1">مرد</option>
                      <option :value="0">زن</option>
                    </select>
                  </div>
                  <div>
                    <label class="mb-1.5 block text-meta font-bold text-ink-muted">تاریخ تولد</label>
                    <input v-model="userInfoForm.birth_date" type="text" class="field" placeholder="1370/01/01" :class="userInfoErrors.birth_date && 'field-error'" />
                    <p v-if="userInfoErrors.birth_date" class="err">{{ userInfoErrors.birth_date }}</p>
                  </div>
                </div>

                <div class="mt-5 flex justify-end">
                  <UiBaseButton :loading="savingUserInfo" @click="updateUserInfo">ذخیره</UiBaseButton>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>

      <!-- Automatic discount choice -->
      <Teleport to="body">
        <Transition name="modal-fade">
          <div v-if="discountCodeChoice" class="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" @click.self="discountCodeChoice = false">
            <Transition name="modal-pop" appear>
              <div class="max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-white p-6 sm:max-w-md sm:rounded-3xl">
                <div class="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold-deep">
                  <Icon name="tabler:sparkles" class="text-[26px]" />
                </div>
                <h3 class="text-center text-[15px] font-black text-brand">قدردان همراهی شما هستیم 🌟</h3>

                <div class="mt-4 space-y-3">
                  <div
                    v-for="(d, i) in discountCodeList"
                    :key="i"
                    class="rounded-2xl border border-gold/30 bg-gradient-to-l from-gold/5 to-transparent p-4"
                  >
                    <p
                      v-if="d.condition_purchase && d.award_type == 4"
                      class="text-[13px] leading-6 text-ink-muted"
                    >
                      به‌دلیل شرکت در <b class="text-brand">{{ JSON.parse(d.condition_purchase).title_fa }}</b>
                      مبلغ {{ faPrice(d.award_amount) }} تخفیف اختصاصی روی این سفارش دریافت کردید.
                    </p>
                    <p
                      v-else-if="d.condition_purchase && d.award_type == 3"
                      class="text-[13px] leading-6 text-ink-muted"
                    >
                      به‌دلیل شرکت در <b class="text-brand">{{ JSON.parse(d.condition_purchase).title_fa }}</b>
                      شامل {{ faNumber(d.award_amount) }}٪ تخفیف اختصاصی روی این سفارش دریافت کردید.
                    </p>
                    <p v-else class="text-[13px] leading-6 text-ink-muted">
                      به‌دلیل وجود در لیست <b class="text-brand">{{ d.title }}</b> شامل
                      {{ faNumber(d.award_amount) }}٪ تخفیف اختصاصی هستید.
                    </p>

                    <div class="mt-3 flex justify-end">
                      <UiBaseButton size="sm" @click="applyDiscount(d.code)">
                        <template v-if="d.condition_purchase && d.award_type == 4">
                          اعمال تخفیف - مبلغ نهایی: {{ faPrice((invoice.total_price || 0) + (invoice.other_price || 0) - d.award_amount) }}
                        </template>
                        <template v-else>اعمال تخفیف</template>
                      </UiBaseButton>
                    </div>
                  </div>
                </div>

                <div class="mt-5 flex justify-end">
                  <UiBaseButton variant="secondary" @click="discountCodeChoice = false">انصراف از دریافت تخفیف</UiBaseButton>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
.field {
  width: 100%;
  border-radius: 0.9rem;
  border: 1px solid var(--color-line, #e5e0d5);
  background: #fff;
  padding: 0.75rem 1rem;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field:focus {
  border-color: var(--color-gold, #b89556);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-gold, #b89556) 18%, transparent);
}
.field-error {
  border-color: #e11d48 !important;
  box-shadow: 0 0 0 3px rgb(225 29 72 / 12%);
}
.err {
  margin-top: 0.35rem;
  font-size: 12px;
  color: #e11d48;
}

/* لیست محصولات */
.list-enter-active, .list-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* تعویض استپ‌ها */
.step-fade-enter-active, .step-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.step-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.step-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* هشدار کیف پول (ارتفاع پویا) */
.wallet-alert-enter-active,
.wallet-alert-leave-active {
  overflow: hidden;
  transition: height 0.3s ease, opacity 0.22s ease, transform 0.3s ease;
}
.wallet-alert-enter-from,
.wallet-alert-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.wallet-alert-enter-to,
.wallet-alert-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* فید و اسلاید عمومی (خطاها، بج‌ها) */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.pop-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-fade-leave-active {
  transition: all 0.2s ease;
}
.pop-fade-enter-from,
.pop-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* مودال‌ها */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-pop-leave-active {
  transition: all 0.2s ease;
}
.modal-pop-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.98);
}
.modal-pop-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

/* انیمیشن‌های عمومی صفحه */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease both;
}
.animation-delay-100 {
  animation-delay: 0.1s;
}
.animation-delay-200 {
  animation-delay: 0.2s;
}

@keyframes bounceSoft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.animate-bounce-soft {
  animation: bounceSoft 2.4s ease-in-out infinite;
}

@keyframes pingSlow {
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  75%, 100% {
    transform: scale(1.7);
    opacity: 0;
  }
}
.animate-ping-slow {
  animation: pingSlow 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes checkPop {
  0% {
    transform: scale(0.3) rotate(-30deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.25) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
.animate-check-pop {
  animation: checkPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
.animate-shimmer {
  animation: shimmer 1.8s ease-in-out infinite;
}

/* اسکرول‌بار باریک برای لیست‌ها */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: var(--color-line, #e5e0d5);
  border-radius: 999px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
</style>