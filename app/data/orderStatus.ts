export type OrderStatus =
  | 'pending'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'

const NUMERIC_STATUS: Record<number, OrderStatus> = {
  0: 'pending',
  1: 'pending',
  2: 'preparing',
  3: 'preparing',
  4: 'preparing',
  5: 'shipped',
  6: 'delivered',
  7: 'cancelled',
  8: 'preparing',
  9: 'returned',
  10: 'returned',
  11: 'returned',
  12: 'returned',
}

const TEXT_STATUS: Record<string, OrderStatus> = {
  awaiting_payment: 'pending',
  pending: 'pending',
  preparing: 'preparing',
  processing: 'preparing',
  shipped: 'shipped',
  sent: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
  canceled: 'cancelled',
  returned: 'returned',
}

export function resolveOrderStatus(invoice: any): OrderStatus {
  // سفارشی که هنوز پرداخت نشده، حتی با status عددی 2 (یا هر کد دیگر)
  // نباید «در حال آماده‌سازی» نمایش داده شود.
  const text = String(invoice?.status_text ?? '').trim().toLowerCase()
  if (text === 'awaiting_payment') return 'pending'

  const raw = invoice?.status ?? invoice?.status_code

  if (raw !== null && raw !== undefined && raw !== '') {
    const asNumber = Number(raw)
    if (!Number.isNaN(asNumber) && NUMERIC_STATUS[asNumber]) {
      return NUMERIC_STATUS[asNumber]
    }

    const asText = String(raw).trim().toLowerCase()
    if (TEXT_STATUS[asText]) return TEXT_STATUS[asText]
  }

  const textual = String(invoice?.status_text ?? '').trim().toLowerCase()
  return TEXT_STATUS[textual] || 'pending'
}

// سفارشی که واقعاً پرداخت شده (در انتظار پرداخت/لغو نیست) → «خرید موفق»
export function isSuccessfulPurchase(invoice: any): boolean {
  return ['preparing', 'shipped', 'delivered', 'returned'].includes(resolveOrderStatus(invoice))
}

export function getOrderProgressIndex(status: OrderStatus): number {
  if (status === 'delivered') return 3
  if (status === 'shipped') return 2
  if (status === 'preparing') return 1
  return 0
}

export function assertGarnetOk(response: any, fallbackMessage: string) {
  if (response?.error) {
    throw new Error(
      response.error?.data?.message
      ?? response.error?.data?.msg
      ?? response.error?.message
      ?? fallbackMessage,
    )
  }

  if (response?.code !== undefined && response.code !== 2000) {
    throw new Error(response?.msg ?? response?.message ?? fallbackMessage)
  }

  return response
}