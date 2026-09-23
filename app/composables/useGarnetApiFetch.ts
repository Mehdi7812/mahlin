export const useGarnetApiFetch = async <T = any>(
    url: string,
    body?: object,
    isForm: boolean = false
): Promise<any> => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase
    // کانتکست Nuxt را قبل از await نگه می‌داریم تا بعداً navigateTo و استور کار کنند
    const nuxtApp = tryUseNuxtApp()
    const token = getAuthToken()

    const headers: Record<string, string> = {
        'g-platform': 'Garnet-Build-v4',
        'g-api-key': 'AEbk35zB9YfSqw8u9mjH7ykNK4xq2Yq5',
    }
    // قبلاً بدون توکن هم "Bearer null" ارسال می‌شد
    if (token) headers.Authorization = `Bearer ${token}`
    if (!isForm) headers['Content-Type'] = 'application/json'

    const onUnauthorized = () => {
        if (nuxtApp) nuxtApp.runWithContext(() => handleUnauthorized())
        else handleUnauthorized()
    }

    try {
        const response = await $fetch<T>(url, {
            method: 'POST',
            baseURL: baseUrl,
            body,
            headers,
        })
        // سرور ممکن است 401 را با HTTP 200 داخل body برگرداند
        if (isUnauthorizedResponse(response)) onUnauthorized()
        return response
    } catch (error: any) {
        console.error('Garnet API Error:', error)
        // یا با HTTP 401 که $fetch آن را throw می‌کند
        if (error?.status === 401 || error?.statusCode === 401 || isUnauthorizedResponse(error?.data)) {
            onUnauthorized()
            return { data: null, error, ...(error?.data ?? {}), code: 401 }
        }
        return { data: null, error }
    }
}
