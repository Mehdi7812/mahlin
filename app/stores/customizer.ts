import { defineStore } from 'pinia'

export const useCustomizerStore = defineStore('customizer', {
    state: () => ({
        auth: false,
        token: null as string | null,
        userInfo: [] as any[],
        allOptions: [] as any[],
        drawer: false,
        drawerPanel: false,
        language: 'fa',
        currencyId: 1,
        cartCount: 0,
        dateString: 'jYYYY/jMM/jDD',
        timeZoneString: { H: 3, M: 30 },
        snackbarContent: '',
        snackbarColor: '',
        snackbarTimeout: '',
    }),
    actions: {
        Set_Auth(payload: boolean) {
            this.auth = payload
        },
        Set_Token(payload: string) {
            this.token = payload
        },
        Set_UserInfo(payload: any[]) {
            this.userInfo = payload
        },
        Set_AllOptions(payload: any[]) {
            this.allOptions = payload
        },
        Set_Drawer(payload: boolean) {
            this.drawer = payload
        },
        Set_Drawer_Panel(payload: boolean) {
            this.drawerPanel = payload
        },
        Set_Language(payload: string) {
            this.language = payload
        },
        Set_CurrencyId(payload: number) {
            this.currencyId = payload
        },
        Set_CartCount(payload: number) {
            this.cartCount = payload
        },
        Set_DateString(payload: string) {
            this.dateString = payload
        },
        Show_Message(payload: { snackbarContent: string; snackbarColor: string }) {
            this.snackbarContent = payload.snackbarContent
            this.snackbarColor = payload.snackbarColor
        },
    },
})
