const states = [{ title: "全部", value: 0 },
{ title: "待认证", value: 1 },
{ title: "已认证", value: 2 },
{ title: "已屏蔽", value: 3 },];

export default {
    // 时间格式化
    dateFormat: (val) => {
        if (val == 0) {
            return "-"
        }
        let dt = new Date(val * 1000)
        let y = dt.getFullYear()
        // 月份从0开始,使她变成字符串,不足两位时,前面补个0.
        let m = (dt.getMonth() + 1 + '').padStart(2, '0')
        let d = (dt.getDate() + '').padStart(2, '0')
        let hh = (dt.getHours() + '').padStart(2, '0')
        let mm = (dt.getMinutes() + '').padStart(2, '0')
        let ss = (dt.getSeconds() + '').padStart(2, '0')
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },

    //用户状态
    getUserStates: () => {
        return states
    },

    // 用户状态
    userStateFormat: (state) => {
        let title = "-"

        for (let i = 0; i < states.length; i++) {
            if (states[i].value == state) {
                title = states[i].title
                break
            }
        }
        return title
    }
}