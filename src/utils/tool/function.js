const string = {
    //裁剪最后指定字符串
    rTrim: (val, char) => {
        let index = val.lastIndexOf(char)
        if (index == val.length - 1)
            return val.substring(0, index)
    },
    lTrim: (val, char) => {
        let index = val.indexOf(char)
        if (index == 0) {
            return val.substring(index + 1, val.length + 1)
        }
        return val
    },
}

const array = {
    in: (search, arr) => {
        for (let i in arr) {
            if (arr[i] == search) {
                return true;
            }
        }
        return false;
    }
}

const path = {
    // 拼接
    join: (left, right) => {
        return string.rTrim(left, "/") + "/" + string.lTrim(right, "/")
    }
}


export default {
    string,
    path,
    array,
}