import { ref } from 'vue'

export const useGarnetApiFetchReactive = <T = any>(
    url: string,
    body?: object,
    isForm: boolean = false
) => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase
    const nuxtApp = tryUseNuxtApp()
    const data = ref<T | null>(null)
    const error = ref<any>(null)
    const pending = ref<boolean>(false)

    const buildHeaders = () => {
        // توکن هنگام هر درخواست خوانده می‌شود، نه یک بار هنگام ساخت
        const token = getAuthToken()
        const headers: Record<string, string> = {
            'g-platform': 'Garnet-Build-v4',
            'g-api-key': 'AEbk35zB9YfSqw8u9mjH7ykNK4xq2Yq5',
        }
        if (token) headers.Authorization = `Bearer ${token}`
        if (!isForm) headers['Content-Type'] = 'application/json'
        return headers
    }

    const onUnauthorized = () => {
        if (nuxtApp) nuxtApp.runWithContext(() => handleUnauthorized())
        else handleUnauthorized()
    }

    const fetchData = async () => {
        pending.value = true
        error.value = null
        try {
            const response = await $fetch<T>(url, {
                method: 'POST',
                baseURL: baseUrl,
                body,
                headers: buildHeaders(),
            })
            if (isUnauthorizedResponse(response)) {
                onUnauthorized()
                error.value = { message: 'نشست شما منقضی شده است', details: response }
            }
            data.value = response
        } catch (err: any) {
            if (err?.status === 500) {
                error.value = {
                    message: 'خطای داخلی سرور (500)، لطفا بعدا تلاش کنید.',
                    details: err.data || null
                }
            } else if (err?.status === 401 || isUnauthorizedResponse(err?.data)) {
                onUnauthorized()
                error.value = {
                    message: 'نشست شما منقضی شده است',
                    details: err.data || null
                }
            } else if (err?.status) {
                error.value = {
                    message: `خطای سرور: ${err.status}`,
                    details: err.data || null
                }
            } else {
                error.value = {
                    message: 'خطای شبکه یا درخواست',
                    details: err.message || err
                }
            }
            console.error(`[Garnet API Controlled Error] ${url}`, error.value)
        } finally {
            pending.value = false
        }
    }

    return {
        data,
        error,
        pending,
        fetchData
    }
}
