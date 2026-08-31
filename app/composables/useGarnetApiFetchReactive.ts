import {ref} from 'vue'

export const useGarnetApiFetchReactive = <T = any>(
    url: string,
    body?: object,
    isForm: boolean = false
) => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase
    const data = ref<T | null>(null)
    const error = ref<any>(null)
    const pending = ref<boolean>(false)
    const token =
        typeof localStorage !== 'undefined'
            ? localStorage.getItem('g-auth-token')
            : typeof sessionStorage !== 'undefined'
                ? sessionStorage.getItem('g-auth-token')
                : null

    const headers = Object.fromEntries(
        Object.entries({
            'g-platform': 'Garnet-Build-v4',
            'g-api-key': 'AEbk35zB9YfSqw8u9mjH7ykNK4xq2Yq5',
            "Authorization": "Bearer " + token,
            ...(isForm ? {} : { 'Content-Type': 'application/json' })
        }).filter(([_, value]) => value !== null)
    ) as HeadersInit

    const fetchData = async () => {
        pending.value = true
        error.value = null
        try {
            data.value = await $fetch<T>(url, {
                method: 'POST',
                baseURL: baseUrl,
                body,
                headers
            })
        } catch (err: any) {
            if (err?.status === 500) {
                error.value = {
                    message: 'خطای داخلی سرور (500)، لطفا بعدا تلاش کنید.',
                    details: err.data || null
                }
            } else if (err?.status === 401) {
                error.value = {
                    message: 'توکن اکسپایر',
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
