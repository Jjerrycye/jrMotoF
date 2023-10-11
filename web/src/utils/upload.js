import axios from "axios"

function upload(path, data) {

    //有文件的post提交的对数据改为FormData()类型
    const params = new FormData()
    //把需要上传的数据添加到params中
    for (let key in data) {
        params.append(key, data[key])
    }

    return axios.post(path, params, {
        headers: {
            "Content-Type": "multipart/form-data"//多部份的表单数据
        }
    })
}

export default upload