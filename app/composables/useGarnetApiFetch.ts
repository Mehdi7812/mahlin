export const useGarnetApiFetch = async <T = any>(
    url: string,
    body?: object,
    isForm: boolean = false
): Promise<any> => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase
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

    try {
        return await $fetch<T>(url, {
            method: 'POST',
            baseURL: baseUrl,
            body,
            headers,
        })
    } catch (error) {
        console.error('Garnet API Error:', error)
        return { data: null, error }
    }
}
