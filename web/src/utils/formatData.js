import moment from "moment"
moment.locale("zh-cn");// zh-cn 设置为中国时间

const formatDate = {
    getTime: (data) => {
        return moment(data).format("lll")
    }
}

export default formatDate