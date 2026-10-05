<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h2 class="font-display text-xl md:text-2xl text-ink">آدرس‌های من</h2>
        <p v-if="loading" class="mt-2 h-3 w-28 animate-pulse rounded-full bg-ink/10" />
        <p v-else class="text-[12.5px] text-inkSoft mt-1">{{ faNumber(addresses.length) }} آدرس ثبت‌شده</p>
      </div>
      <button type="button" class="hidden sm:flex items-center gap-1.5 text-[13px] font-bold text-cream bg-accent px-5 py-2.5 rounded-full hover:bg-accentHover transition-colors disabled:opacity-50" :disabled="loading" @click="startAddAddress">
        <Icon name="tabler:plus" class="text-[16px]" /> افزودن آدرس جدید
      </button>
    </div>

    <div v-if="loading" class="grid sm:grid-cols-2 gap-4 animate-pulse" aria-busy="true">
      <div v-for="item in 2" :key="item" class="rounded-[20px] border border-ink/[0.06] bg-cardLight p-5">
        <div class="h-5 w-28 rounded-full bg-ink/10" />
        <div class="mt-5 h-12 w-full rounded-xl bg-ink/[0.06]" />
        <div class="mt-3 h-3 w-32 rounded-full bg-ink/10" />
        <div class="mt-5 border-t border-ink/[0.06] pt-4"><div class="h-3 w-20 rounded-full bg-ink/10" /></div>
      </div>
    </div>

    <div v-else-if="addresses.length" class="grid sm:grid-cols-2 gap-4">
      <div
        v-for="address in addresses"
        :key="address.id"
        class="relative rounded-[20px] border p-5 transition-colors"
        :class="address.is_default ? 'border-[#b89556]/20 bg-gold/[0.06]' : 'border-ink/[0.06] bg-cardLight'"
      >
        <div class="flex items-center justify-between gap-3 mb-3">
          <div class="flex min-w-0 items-center gap-2">
            <span class="w-9 h-9 rounded-xl bg-ink/[0.05] flex items-center justify-center text-inkSoft shrink-0"><Icon :name="address.title === 'خانه' ? 'tabler:home-2' : 'tabler:building-store'" class="text-[16px]" /></span>
            <p class="text-[14px] font-bold text-ink truncate">{{ address.title }}</p>
          </div>
          <span v-if="address.is_default" class="flex shrink-0 items-center gap-1 text-[10.5px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full"><Icon name="tabler:star-filled" class="text-[11px]" /> پیش‌فرض</span>
        </div>
        <p class="text-[12.5px] text-inkSoft leading-6">{{ address.province || '' }}{{ address.province && address.city ? '، ' : '' }}{{ address.city || '' }}{{ address.city ? ' — ' : '' }}{{ address.description }}</p>
        <p class="text-[11.5px] text-inkSoft/70 mt-2 font-latin" dir="ltr">کد پستی: {{ fa(address.postal_code) }}</p>
        <p class="text-[11.5px] text-inkSoft mt-1">گیرنده: {{ receiverName(address) }} — {{ fa(receiverMobile(address)) }}</p>
        <div class="flex items-center gap-3 mt-4 pt-4 border-t border-ink/[0.06]">
          <button type="button" class="flex items-center gap-1 text-[12px] font-bold text-inkSoft hover:text-accent transition-colors" @click="startEditAddress(address)"><Icon name="tabler:pencil" class="text-[13px]" /> ویرایش</button>
          <button v-if="!address.is_default" type="button" class="flex items-center gap-1 text-[12px] font-bold text-inkSoft hover:text-gold transition-colors" :disabled="saving" @click="setDefaultAddress(address)"><Icon name="tabler:check" class="text-[13px]" /> انتخاب به‌عنوان پیش‌فرض</button>
          <button v-if="!address.is_default" type="button" class="mr-auto flex items-center gap-1 text-[12px] font-bold text-inkSoft hover:text-red-500 transition-colors" :disabled="deletingId === address.id" @click="openDeleteDialog(address)"><Icon :name="deletingId === address.id ? 'tabler:loader-2' : 'tabler:trash'" class="text-[13px]" :class="deletingId === address.id && 'animate-spin'" /> حذف</button>
        </div>
      </div>
    </div>

    <div v-else class="rounded-[22px] border border-dashed border-ink/15 bg-cardLight p-10 text-center"><Icon name="tabler:map-pin-off" class="mx-auto text-[38px] text-inkSoft/50" /><p class="mt-3 text-[13px] font-bold text-ink">هنوز آدرسی ثبت نکرده‌اید</p><p class="mt-1 text-[12px] text-inkSoft">برای ثبت سفارش، اولین آدرس خود را اضافه کنید.</p></div>

    <button type="button" class="sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full shadow-xl text-[13px] font-bold disabled:opacity-50" :disabled="loading" @click="startAddAddress"><Icon name="tabler:plus" class="text-[16px]" /> آدرس جدید</button>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="modalOpen" class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-[2px] p-0 sm:p-4" @click.self="closeModal">
          <div class="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-[24px] sm:rounded-3xl bg-cardLight p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <span class="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent"><Icon name="tabler:map-pin-plus" /></span>
                <div>
                  <h3 class="text-[15px] font-bold text-ink">{{ editing ? 'ویرایش آدرس' : 'آدرس جدید' }}</h3>
                  <p v-if="modalStep === 1" class="mt-0.5 text-[11px] text-inkSoft">موقعیت آدرس را روی نقشه مشخص کنید</p>
                </div>
              </div>
              <button type="button" class="w-9 h-9 grid place-items-center rounded-full bg-ink/5 hover:bg-red-50 hover:text-red-500" @click="closeModal"><Icon name="tabler:x" /></button>
            </div>

            <!-- ─── مرحله ۱: نقشه ─── -->
            <div v-if="modalStep === 1" class="space-y-4">
              <div ref="mapContainer" class="relative min-h-[300px] overflow-hidden rounded-2xl">
                <ClientOnly>
                  <AccountNeshanMapInput
                    :input-lat-lng="mapLatLng"
                    @handle-lat-lng="mapLatLng = $event"
                    @map-ready="markMapReady"
                  />
                </ClientOnly>

                <Transition name="map-skel">
                  <div
                    v-if="mapLoading"
                    class="map-skeleton absolute inset-0 z-[500]"
                    role="status"
                    aria-live="polite"
                  >
                    <div class="map-skeleton-grid absolute inset-0" />
                    <span class="absolute left-[-5%] top-[22%] h-[7px] w-[70%] rotate-[10deg] rounded-full bg-white/70" />
                    <span class="absolute right-[-8%] top-[48%] h-[9px] w-[85%] -rotate-[6deg] rounded-full bg-white/80" />
                    <span class="absolute bottom-[18%] left-[10%] h-[6px] w-[65%] rotate-[3deg] rounded-full bg-white/60" />
                    <span class="absolute left-[30%] top-[-5%] h-[110%] w-[7px] rotate-[14deg] rounded-full bg-white/60" />
                    <span class="absolute right-[22%] top-[-5%] h-[110%] w-[5px] -rotate-[9deg] rounded-full bg-white/50" />
                    <span class="absolute left-[8%] top-[56%] h-14 w-20 rounded-xl bg-[#dfe6d3]/80" />
                    <span class="absolute right-[10%] top-[12%] h-12 w-16 rounded-xl bg-[#dfe6d3]/70" />
                    <span class="absolute bottom-[8%] right-[30%] h-10 w-24 rounded-xl bg-ink/[0.04]" />
                    <div class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                      <span class="map-pin grid h-12 w-12 place-items-center rounded-full bg-white text-accent shadow-lg">
                        <Icon name="tabler:map-pin-filled" class="text-[24px]" />
                      </span>
                      <span class="map-pin-shadow mt-1 h-1.5 w-6 rounded-full bg-ink/15" />
                      <span class="mt-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-bold text-inkSoft shadow-sm">
                        <Icon name="tabler:loader-2" class="animate-spin text-[13px]" />
                        در حال بارگذاری نقشه...
                      </span>
                    </div>
                    <div class="absolute end-3 top-3 flex flex-col gap-1.5">
                      <span class="h-8 w-8 rounded-lg bg-white/80" />
                      <span class="h-8 w-8 rounded-lg bg-white/80" />
                    </div>
                    <span class="map-skeleton-shine absolute inset-y-0 w-1/2" aria-hidden="true" />
                  </div>
                </Transition>
              </div>

              <div class="flex justify-end">
                <button type="button" class="rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-cream disabled:opacity-50" :disabled="mapLoading || !hasValidMapLatLng" @click="modalStep = 2">تایید و ادامه</button>
              </div>
            </div>

            <!-- ─── مرحله ۲: فرم ─── -->
            <div v-else class="flex flex-col gap-3.5">
              <!-- عنوان آدرس -->
              <div>
                <label class="mb-1.5 block text-[12px] font-bold text-inkSoft">عنوان آدرس <span class="text-red-400">*</span></label>
                <input v-model="form.title" type="text" placeholder="مثلاً خانه" class="address-field" :class="errors.title && 'address-field-error'" />
                <p v-if="errors.title" class="address-error">{{ errors.title }}</p>
              </div>

              <!-- استان و شهر -->
              <div class="grid grid-cols-2 gap-3">
                <UiBaseSelect v-model="provinceTitle" label="استان" :options="locationGroups.map((group) => group.title)" placeholder="انتخاب استان" />
                <UiBaseSelect v-model="form.address_id" label="شهر" :options="cities.map((city) => ({ label: city.title, value: city.id }))" placeholder="انتخاب شهر" :disabled="!cities.length" :error="errors.address_id" />
              </div>

              <!-- آدرس کامل -->
              <div>
                <label class="mb-1.5 block text-[12px] font-bold text-inkSoft">آدرس کامل <span class="text-red-400">*</span></label>
                <textarea v-model="form.street" rows="3" class="address-field resize-none" :class="errors.street && 'address-field-error'" placeholder="خیابان، کوچه، ..." />
                <p v-if="errors.street" class="address-error">{{ errors.street }}</p>
              </div>

              <!-- پلاک، واحد، کدپستی -->
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <input
                    v-model="form.plaque"
                    type="text"
                    inputmode="numeric"
                    placeholder="پلاک *"
                    class="address-field"
                    :class="errors.plaque && 'address-field-error'"
                    @input="form.plaque = sanitizeDigits(form.plaque)"
                  />
                  <p v-if="errors.plaque" class="address-error">{{ errors.plaque }}</p>
                </div>

                <div>
                  <input
                    v-model="form.unit"
                    type="text"
                    inputmode="numeric"
                    placeholder="واحد"
                    class="address-field"
                    :class="errors.unit && 'address-field-error'"
                    @input="form.unit = sanitizeDigits(form.unit)"
                  />
                  <p v-if="errors.unit" class="address-error">{{ errors.unit }}</p>
                </div>

                <div>
                  <input
                    v-model="form.postal_code"
                    type="text"
                    inputmode="numeric"
                    maxlength="10"
                    dir="ltr"
                    placeholder="کد پستی *"
                    class="address-field"
                    :class="errors.postal_code && 'address-field-error'"
                    @input="form.postal_code = sanitizeDigits(form.postal_code)"
                  />
                  <p v-if="errors.postal_code" class="address-error">{{ errors.postal_code }}</p>
                </div>
              </div>

              <!-- گیرنده متفاوت -->
              <label class="flex items-center gap-2 text-[13px] text-inkSoft">
                <input v-model="form.receiver_is_different" type="checkbox" class="h-4 w-4 accent-accent" />
                گیرنده سفارش شخص دیگری است
              </label>

              <div v-if="form.receiver_is_different" class="grid grid-cols-2 gap-3">
                <div>
                  <input
                    v-model="form.receiver_full_name"
                    type="text"
                    placeholder="نام و نام‌خانوادگی گیرنده *"
                    class="address-field"
                    :class="errors.receiver_full_name && 'address-field-error'"
                  />
                  <p v-if="errors.receiver_full_name" class="address-error">{{ errors.receiver_full_name }}</p>
                </div>

                <div>
                  <input
                    v-model="form.receiver_mobile"
                    type="tel"
                    dir="ltr"
                    inputmode="numeric"
                    maxlength="11"
                    placeholder="۰۹XXXXXXXXX *"
                    class="address-field"
                    :class="errors.receiver_mobile && 'address-field-error'"
                    @input="form.receiver_mobile = sanitizeDigits(form.receiver_mobile)"
                  />
                  <p v-if="errors.receiver_mobile" class="address-error">{{ errors.receiver_mobile }}</p>
                </div>
              </div>

              <div class="flex justify-end gap-2 border-t border-ink/[0.06] pt-4">
                <button type="button" class="rounded-full border border-ink/10 px-5 py-2.5 text-[13px] font-bold text-inkSoft" @click="modalStep = 1">بازگشت</button>
                <button type="button" class="rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-cream disabled:opacity-50" :disabled="saving" @click="saveAddress">
                  <Icon v-if="saving" name="tabler:loader-2" class="ml-1 inline animate-spin" /> ذخیره آدرس
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="deleteDialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]" @click.self="closeDeleteDialog">
          <Transition name="modal-pop" appear>
            <div class="w-full max-w-sm rounded-2xl bg-white p-6 text-center">
              <div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
                <Icon name="tabler:trash" class="text-[24px]" />
              </div>
              <p class="mt-4 mb-1 text-[14px] font-bold text-gold">حذف آدرس</p>
              <p class="mb-5 text-[13px] text-ink-muted">آیا از حذف آدرس «{{ addressToDelete?.title }}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.</p>
              <div class="flex justify-center gap-2">
                <UiBaseButton variant="secondary" :disabled="deletingId !== null" @click="closeDeleteDialog">انصراف</UiBaseButton>
                <UiBaseButton :loading="deletingId !== null" @click="confirmDeleteAddress">حذف</UiBaseButton>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { fa, faNumber } from '~/utils/format.ts'

const { t } = useI18n()

definePageMeta({ layout: 'account' })
useSeoMeta({ title: 'آدرس‌های من | ماهلین اسکین‌کر' })

const addresses = ref([])
const customizer = useCustomizerStore()
const loading = ref(true)
const modalOpen = ref(false)
const modalStep = ref(1)
const editing = ref(false)
const saving = ref(false)
const deletingId = ref(null)
const deleteDialogOpen = ref(false)
const addressToDelete = ref(null)
const locationGroups = ref([])
const provinceTitle = ref('')
const mapLatLng = ref(null)
const errors = reactive({})
const form = reactive({
  id: null, title: '', address_id: '', postal_code: '', street: '',
  plaque: '', unit: '', receiver_is_different: false,
  receiver_full_name: '', receiver_mobile: '', is_default: false,
})

let skipCityReset = false

const cities = computed(() => locationGroups.value.find((group) => group.title === provinceTitle.value)?.cities || [])
const hasDefaultAddress = computed(() => addresses.value.some((address) => address.is_default))
const hasValidMapLatLng = computed(() => Array.isArray(mapLatLng.value) && mapLatLng.value.length === 2 && mapLatLng.value.every((value) => Number.isFinite(Number(value))))
const currentUser = computed(() => customizer.userInfo && !Array.isArray(customizer.userInfo) ? customizer.userInfo : {})

// ═══════════════ تشخیص لود نقشه ═══════════════
const mapContainer = ref(null)
const mapLoading = ref(true)
const MAP_TIMEOUT = 8000

let mapObserver = null
let mapTimer = null

function stopMapWatch() {
  mapObserver?.disconnect()
  mapObserver = null
  clearTimeout(mapTimer)
  mapTimer = null
  mapContainer.value?.removeEventListener('load', checkMapLoaded, true)
}

function markMapReady() {
  setTimeout(() => { mapLoading.value = false }, 250)
  stopMapWatch()
}

function checkMapLoaded() {
  const el = mapContainer.value
  if (!el) return
  const canvas = el.querySelector('canvas')
  if (canvas && canvas.width > 0 && canvas.height > 0) return markMapReady()
  const tiles = el.querySelectorAll('img.leaflet-tile, .leaflet-tile-loaded, .ol-layer img, img')
  if ([...tiles].some((img) => img.complete && img.naturalWidth > 0)) return markMapReady()
}

async function startMapWatch() {
  stopMapWatch()
  mapLoading.value = true
  await nextTick()
  if (!process.client || !mapContainer.value) return
  mapObserver = new MutationObserver(checkMapLoaded)
  mapObserver.observe(mapContainer.value, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'width', 'src'] })
  mapContainer.value.addEventListener('load', checkMapLoaded, true)
  mapTimer = setTimeout(markMapReady, MAP_TIMEOUT)
  checkMapLoaded()
}

watch([modalOpen, modalStep], ([open, step]) => {
  if (open && step === 1) startMapWatch()
  else stopMapWatch()
})

onBeforeUnmount(stopMapWatch)

// ═══════════════ ابزارهای کمکی ═══════════════

/**
 * اعداد فارسی (۰-۹) و عربی (٠-٩) را به انگلیسی تبدیل می‌کند
 * و هرچیزی غیر از رقم انگلیسی را حذف می‌کند
 */
function sanitizeDigits(val) {
  return String(val ?? '')
    .replace(/[۰-۹]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x06F0 + 48))
    .replace(/[٠-٩]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x0660 + 48))
    .replace(/\D/g, '')
}

/** بررسی شماره موبایل ایرانی: ۰۹XXXXXXXXX (دقیقاً ۱۱ رقم شروع با 09) */
function isValidIranMobile(val) {
  const digits = sanitizeDigits(val)
  return /^09\d{9}$/.test(digits)
}

/** بررسی کد پستی ایرانی: دقیقاً ۱۰ رقم، بدون صفر شروع‌شونده */
function isValidPostalCode(val) {
  const digits = sanitizeDigits(val)
  return /^[1-9]\d{9}$/.test(digits)
}

// ═══════════════ گیرنده ═══════════════
function receiverName(address) {
  return address.receiver_is_different
    ? address.receiver_full_name
    : (currentUser.value.full_name || [currentUser.value.first_name, currentUser.value.last_name].filter(Boolean).join(' '))
}
function receiverMobile(address) {
  return address.receiver_is_different ? address.receiver_mobile : currentUser.value.mobile
}

// ═══════════════ API ═══════════════
function loadAddresses() {
  loading.value = true
  useGarnetApiFetch('users/userAddress')
    .then((response) => { addresses.value = response.UserAddress || [] })
    .catch((error) => toast.error(t(error?.message) || t(error) || 'خطا در دریافت آدرس‌ها'))
    .finally(() => { loading.value = false })
}

function loadLocations() {
  useGarnetApiFetch('address/indexWithKind', { kind: 2 })
    .then((response) => {
      locationGroups.value = (response.Address || []).map((item) => ({
        title: item.title,
        cities: (item.address_children || []).map((city) => ({ id: city.id, title: city.title })),
      }))
    })
    .catch((error) => toast.error(t(error?.message) || t(error) || 'خطا در دریافت شهرها'))
}

// ═══════════════ فرم ═══════════════
function clearErrors() { Object.keys(errors).forEach((key) => delete errors[key]) }

function resetForm() {
  Object.assign(form, {
    id: null, title: '', address_id: '', postal_code: '', street: '',
    plaque: '', unit: '', receiver_is_different: false,
    receiver_full_name: currentUser.value.full_name || '',
    receiver_mobile: currentUser.value.mobile || '',
    is_default: !hasDefaultAddress.value,
  })
  provinceTitle.value = ''
  mapLatLng.value = null
  clearErrors()
}

function startAddAddress() {
  editing.value = false
  resetForm()
  modalStep.value = 1
  modalOpen.value = true
  if (!locationGroups.value.length) loadLocations()
}

function startEditAddress(address) {
  editing.value = true
  clearErrors()
  Object.assign(form, {
    id: address.id,
    title: address.title || '',
    postal_code: address.postal_code || '',
    street: address.description || '',
    plaque: address.plaque || '',
    unit: address.unit || '',
    receiver_is_different: !!address.receiver_is_different,
    receiver_full_name: address.receiver_is_different ? address.receiver_full_name || '' : currentUser.value.full_name || '',
    receiver_mobile: address.receiver_is_different ? address.receiver_mobile || '' : currentUser.value.mobile || '',
    is_default: !!address.is_default,
  })
  skipCityReset = true
  provinceTitle.value = address.province || ''
  form.address_id = address.address_id || ''
  mapLatLng.value = [Number(address.lat) || 0, Number(address.lon) || 0]
  modalStep.value = 1
  modalOpen.value = true
  if (!locationGroups.value.length) loadLocations()
}

function closeModal() { modalOpen.value = false; modalStep.value = 1; resetForm() }

watch(provinceTitle, () => {
  if (skipCityReset) { skipCityReset = false; return }
  form.address_id = ''
})

// ═══════════════ ولیدیشن ═══════════════
function validateForm() {
  clearErrors()

  // عنوان
  if (!String(form.title ?? '').trim()) {
    errors.title = 'عنوان آدرس را وارد کنید'
  }

  // شهر
  if (!form.address_id) {
    errors.address_id = 'شهر را انتخاب کنید'
  }

  // آدرس کامل
  if (!String(form.street ?? '').trim()) {
    errors.street = 'آدرس کامل را وارد کنید'
  } else if (String(form.street ?? '').trim().length < 10) {
    errors.street = 'آدرس حداقل باید ۱۰ کاراکتر باشد'
  }

  // پلاک — الزامی و فقط عدد
  const plaque = sanitizeDigits(form.plaque)
  if (!plaque) {
    errors.plaque = 'پلاک الزامی است'
  } else if (plaque.length > 5) {
    errors.plaque = 'پلاک حداکثر ۵ رقم'
  }

  // واحد — اختیاری ولی اگر پر شد فقط عدد
  const unit = sanitizeDigits(form.unit)
  if (String(form.unit ?? '').trim() && !unit) {
    errors.unit = 'واحد باید عددی باشد'
  } else if (unit && unit.length > 4) {
    errors.unit = 'واحد حداکثر ۴ رقم'
  }

  // کد پستی — ۱۰ رقمی ایران (بدون صفر ابتدایی)
  const postal = sanitizeDigits(form.postal_code)
  if (!postal) {
    errors.postal_code = 'کد پستی الزامی است'
  } else if (postal.length !== 10) {
    errors.postal_code = 'کد پستی باید دقیقاً ۱۰ رقم باشد'
  } else if (!isValidPostalCode(postal)) {
    errors.postal_code = 'کد پستی معتبر نیست (نمی‌تواند با ۰ شروع شود)'
  }

  // فیلدهای گیرنده‌ی متفاوت
  if (form.receiver_is_different) {
    const name = String(form.receiver_full_name ?? '').trim()
    if (!name) {
      errors.receiver_full_name = 'نام گیرنده الزامی است'
    } else if (name.length < 3) {
      errors.receiver_full_name = 'نام گیرنده حداقل ۳ کاراکتر باشد'
    }

    const mobile = sanitizeDigits(form.receiver_mobile)
    if (!mobile) {
      errors.receiver_mobile = 'شماره موبایل گیرنده الزامی است'
    } else if (!isValidIranMobile(mobile)) {
      errors.receiver_mobile = 'شماره موبایل معتبر نیست (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)'
    }
  }

  // اگر خطایی وجود داشت، اسکرول به اولین فیلد خطادار
  if (Object.keys(errors).length) {
    nextTick(() => {
      const firstError = document.querySelector('.address-field-error')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      firstError?.focus()
    })
    return false
  }

  return true
}

function addressPayload() {
  let description = String(form.street ?? '').trim()
  if (String(form.plaque ?? '').trim()) description += `، پلاک: ${sanitizeDigits(form.plaque)}`
  if (String(form.unit ?? '').trim()) description += `، واحد: ${sanitizeDigits(form.unit)}`
  const shouldBeDefault = form.is_default || !hasDefaultAddress.value
  return {
    ...(form.id ? { id: form.id } : {}),
    title: String(form.title ?? '').trim(),
    kind: 1,
    address_id: form.address_id,
    postal_code: sanitizeDigits(form.postal_code),
    description,
    lat: String(mapLatLng.value?.[0] ?? 0).substring(0, 10),
    lon: String(mapLatLng.value?.[1] ?? 0).substring(0, 10),
    receiver_is_different: form.receiver_is_different,
    is_default: shouldBeDefault ? 1 : 0,
    receiver_full_name: form.receiver_is_different ? form.receiver_full_name : currentUser.value.full_name,
    receiver_mobile: form.receiver_is_different ? sanitizeDigits(form.receiver_mobile) : currentUser.value.mobile,
  }
}

function saveAddress() {
  if (!validateForm()) return
  saving.value = true
  const wasEditing = editing.value
  useGarnetApiFetch('users/saveUserAddress', addressPayload())
    .then((response) => {
      if (response?.UserAddress) addresses.value = response.UserAddress
      closeModal()
      toast.success(wasEditing ? 'آدرس ویرایش شد' : 'آدرس ذخیره شد')
    })
    .catch((error) => toast.error(t(error?.message) || t(error) || 'خطا در ذخیره آدرس'))
    .finally(() => { saving.value = false })
}

function setDefaultAddress(address) {
  saving.value = true
  useGarnetApiFetch('users/saveUserAddress', {
    id: address.id, title: address.title, kind: address.kind || 1,
    address_id: address.address_id, postal_code: address.postal_code,
    description: address.description, lat: address.lat || '0', lon: address.lon || '0',
    receiver_is_different: !!address.receiver_is_different, is_default: 1,
    receiver_full_name: address.receiver_is_different ? address.receiver_full_name : currentUser.value.full_name,
    receiver_mobile: address.receiver_is_different ? address.receiver_mobile : currentUser.value.mobile,
  })
    .then((response) => {
      const list = response?.UserAddress || addresses.value
      addresses.value = list.map((item) => ({ ...item, is_default: String(item.id) === String(address.id) }))
      toast.success('آدرس پیش‌فرض تغییر کرد')
    })
    .catch((error) => toast.error(t(error?.message) || t(error) || 'خطا در تغییر آدرس پیش‌فرض'))
    .finally(() => { saving.value = false })
}

function openDeleteDialog(address) { addressToDelete.value = address; deleteDialogOpen.value = true }
function closeDeleteDialog() { if (deletingId.value !== null) return; deleteDialogOpen.value = false; addressToDelete.value = null }

function confirmDeleteAddress() {
  if (!addressToDelete.value) return
  const address = addressToDelete.value
  if (address.is_default) { toast.error('آدرس پیش‌فرض قابل حذف نیست'); closeDeleteDialog(); return }
  deletingId.value = address.id
  useGarnetApiFetch('users/deleteUserAddress', { address_id: address.id })
    .then((response) => {
      addresses.value = response?.UserAddress || addresses.value.filter((item) => item.id !== address.id)
      toast.success('آدرس حذف شد')
      deleteDialogOpen.value = false
      addressToDelete.value = null
    })
    .catch((error) => toast.error(t(error?.message) || t(error) || 'خطا در حذف آدرس'))
    .finally(() => { deletingId.value = null })
}

onMounted(loadAddresses)
</script>

<style scoped>
.address-field { width: 100%; border-radius: 0.75rem; border: 1px solid rgb(63 55 51 / 0.15); background: white; padding: 0.875rem; font-size: 13px; outline: none; transition: border-color 0.2s; }
.address-field:focus { border-color: var(--color-accent, #a28466); }
.address-field-error { border-color: #e11d48 !important; }
.address-error { margin-top: 0.35rem; font-size: 11px; color: #e11d48; line-height: 1.4; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ─── اسکلتون نقشه ─── */
.map-skeleton { background: #efeae2; border-radius: inherit; }
.map-skeleton-grid {
  background-image:
    linear-gradient(rgb(63 58 53 / 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgb(63 58 53 / 0.04) 1px, transparent 1px);
  background-size: 28px 28px;
}
.map-skeleton-shine {
  left: -60%;
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.55), transparent);
  transform: skewX(-15deg);
  animation: mapShine 1.6s ease-in-out infinite;
}
@keyframes mapShine { to { left: 130%; } }
.map-pin { animation: pinBounce 1.4s ease-in-out infinite; }
.map-pin-shadow { animation: pinShadow 1.4s ease-in-out infinite; }
@keyframes pinBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes pinShadow { 0%, 100% { transform: scale(1); opacity: .6; } 50% { transform: scale(.6); opacity: .3; } }
.map-skel-leave-active { transition: opacity 0.4s ease; }
.map-skel-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .map-skeleton-shine, .map-pin, .map-pin-shadow { animation: none; }
}
</style>