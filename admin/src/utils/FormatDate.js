import moment from "moment"
moment.locale("zh-cn");// zh-cn 设置为中国时间

const FormatDate = {
    getTime: (data) => {
        return moment(data).format('YYYY/MM/DD , h:mm:ss')
    }
}

export default FormatDate