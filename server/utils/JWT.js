const jsonwebtoken = require('jsonwebtoken')

const secret = "Nero"

const JWT = {
    //生成token方法
    //exprires用来设置token过期时间
    generate: (value, exprires) => {
        return jsonwebtoken.sign(value, secret, { expiresIn: exprires })
    },
    //解密token方法
    verify: (token) => {
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (error) {
            // console.log(error);
            return false
        }
    }

}


module.exports = JWT