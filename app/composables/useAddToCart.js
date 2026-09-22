import { toast } from 'vue-sonner';

/**
 * افزودن محصول به سبد از طریق API.
 * state با useState اشتراکی است تا PriceBox (دسکتاپ) و MobileBar (موبایل)
 * هر دو وضعیت loading و مودال را یکسان ببینند.
 */
export function useAddToCart() {
  const { t } = useI18n();
  const router = useRouter();
  const route = useRoute();
  const customizer = useCustomizerStore();

  const loading = useState('cart-adding', () => false);
  const modalOpen = useState('cart-added-modal', () => false);
  const cartCount = useState('cart-added-count', () => 0);

  /** @returns {Promise<boolean>} true اگر با موفقیت اضافه شد */
  async function addToCart({ productId, qty = 1, currencyId = 1 }) {
    if (loading.value) return false;

    if (!customizer.auth) {
      router.push(`/login?back=${encodeURIComponent(route.fullPath)}`);
      return false;
    }

    loading.value = true;
    try {
      const response = await useGarnetApiFetch('invoices/create', {
        product_id: productId,
        currency_id: currencyId,
        payment_id: 0,
        force: true,
        amount: qty,
      });

      if (response?.code === 2000 || response?.Invoice) {
        const count = response.Invoice?.invoice_details?.length ?? 0;
        customizer.cartCount = count;
        cartCount.value = count;
        modalOpen.value = true;
        if (route.name === 'cart') router.go();
        return true;
      }

      if (response?.code === 2005) {
        toast.error(t(response.error) || 'افزودن به سبد انجام نشد');
      } else {
        toast.error('افزودن به سبد انجام نشد. دوباره تلاش کنید.');
      }
    } catch (err) {
      console.error('[useAddToCart]', err);
      toast.error('ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کنید.');
    } finally {
      loading.value = false;
    }
    return false;
  }

  return { addToCart, loading, modalOpen, cartCount };
}