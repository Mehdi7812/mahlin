import { z } from 'zod'
import { toLatinDigits } from './format.ts'

/**
 * Shared zod schemas. Error messages are the exact Persian strings from
 * behavior-spec.md — do not paraphrase them.
 */

const digits = (value: string) => toLatinDigits(value).trim()

export const mobileSchema = z
  .string({ required_error: 'شماره موبایل را وارد کنید' })
  .transform(digits)
  .refine((v) => /^09\d{9}$/.test(v), {
    message: 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد',
  })

export const otpSchema = z
  .string({ required_error: 'کد را وارد کنید' })
  .transform(digits)
  .refine((v) => /^\d{5}$/.test(v), { message: 'کد باید ۵ رقم باشد' })

export const postalCodeSchema = z
  .string({ required_error: 'کد پستی را وارد کنید' })
  .transform(digits)
  .refine((v) => /^\d{10}$/.test(v), { message: 'کد پستی باید ۱۰ رقم باشد' })

export const nationalCodeSchema = z
  .string({ required_error: 'کد ملی را وارد کنید' })
  .transform(digits)
  .refine((v) => /^\d{10}$/.test(v), { message: 'کد ملی باید ۱۰ رقم باشد' })
  .refine((v) => {
    if (/^(\d)\1{9}$/.test(v)) return false
    const check = Number(v[9])
    const sum = Array.from(v.slice(0, 9)).reduce(
      (acc, digit, i) => acc + Number(digit) * (10 - i),
      0,
    )
    const remainder = sum % 11
    return remainder < 2 ? check === remainder : check === 11 - remainder
  }, { message: 'کد ملی معتبر نیست' })

export const fullNameSchema = z
  .string({ required_error: 'نام و نام خانوادگی را وارد کنید' })
  .min(3, 'نام و نام خانوادگی را کامل وارد کنید')

export const emailSchema = z
  .string()
  .email('ایمیل معتبر نیست')
  .optional()
  .or(z.literal(''))

export const addressSchema = z.object({
  fullName: fullNameSchema,
  province: z.string({ required_error: 'استان را انتخاب کنید' }).min(1, 'استان را انتخاب کنید'),
  city: z.string({ required_error: 'شهر را انتخاب کنید' }).min(1, 'شهر را انتخاب کنید'),
  street: z.string({ required_error: 'آدرس را وارد کنید' }).min(10, 'آدرس را کامل وارد کنید'),
  postalCode: postalCodeSchema,
  unit: z.string().optional(),
  note: z.string().optional(),
})

export const contactSchema = z.object({
  name: fullNameSchema,
  phone: mobileSchema,
  email: emailSchema,
  subject: z.string().min(1, 'موضوع را انتخاب کنید'),
  message: z.string().min(10, 'پیام را کامل‌تر بنویسید'),
})
