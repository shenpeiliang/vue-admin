import { defineStore } from 'pinia'

export const useBarStore = defineStore('bar', {
    state: () => ({
        history: [], // 存储路由历史记录的数组
        currentPath: "", //当前访问地址
    }),
    actions: {
        addToHistory(route) {
            // 记录当前访问地址
            this.currentPath = route.path

            // 添加新的路由信息到数组中，并去重
            const idx = this.history.findIndex(r => r.name === route.name)
            if (idx === -1) {
                this.history.push(route)
            }
        },
        removeFromHistory(route) {
            // 从数组中移除指定的路由信息
            this.history = this.history.filter(item => item.name !== route.name)
        },
        // 从数组中移除指定的路由信息
        removeFromHistoryByIndex(router, index) {
            if (this.history.length <= 1) {
                return false;
            }

            //如果关闭的是当前路由跳转到上一个路由
            let flag = false
            if (router.currentRoute.value.name == this.history[index].name) {
                flag = true
            }

            this.history.splice(index, 1)
            if (flag) {
                router.push(this.history[this.history.length - 1])
            }

        },
        //打开指定路由
        openRouteByIndex(router, index) {
            if (router.currentRoute.value.name != this.history[index].name) {
                router.push(this.history[index])
            }
        },
        clearHistory() {
            // 清空历史记录数组
            this.history = []
        },
    },
})
