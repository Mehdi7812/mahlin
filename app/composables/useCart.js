import { DEFAULT_CART, PRODUCTS, DISCOUNT, SHIPPING } from '~/data/products';
import { money, fa } from '~/utils/format';

export function useCart() {
  const lines = useState('cart-lines', () => DEFAULT_CART.map((l) => ({ ...l })));

  const add = (pid, qty = 1) => {
    const existing = lines.value.find((l) => l.pid === pid);
    if (existing) existing.qty += qty;
    else lines.value.push({ pid, qty });
  };
  const setQty = (pid, qty) => {
    const l = lines.value.find((x) => x.pid === pid);
    if (l) l.qty = Math.max(1, qty);
  };
  const remove = (pid) => { lines.value = lines.value.filter((l) => l.pid !== pid); };

  const detailedLines = computed(() => lines.value.map((l) => {
    const p = PRODUCTS.find((x) => x.id === l.pid);
    return { ...l, product: p, lineTotal: p ? p.price * l.qty : 0 };
  }));

  const subtotal = computed(() => detailedLines.value.reduce((s, l) => s + l.lineTotal, 0));
  const count = computed(() => lines.value.reduce((s, l) => s + l.qty, 0));
  const grandTotal = computed(() => Math.max(0, subtotal.value - DISCOUNT + (subtotal.value > 0 ? SHIPPING : 0)));

  return { lines, detailedLines, add, setQty, remove, subtotal, count, grandTotal, money, fa, DISCOUNT, SHIPPING };
}
