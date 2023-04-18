import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
    state: () => ({
        token: "",
    }),
    actions: {
        login(data) {
            this.token = data
            sessionStorage.setItem("token", data);
        },
        logout() {
            this.token = ""
            sessionStorage.removeItem("token")
        },
        getToken() {
            if (this.token == "") {
                this.token = sessionStorage.getItem("token")
            }
            return this.token
        }
    },
})
