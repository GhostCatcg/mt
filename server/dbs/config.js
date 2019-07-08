// 数据库配置文件

export default {
    dbs: 'mongodb://localhost:27017/student',
    redis: {
        get host() {
            return 'localhost'
        },
        get port() {
            return 6379
        }
    },
    smtp: {
        get host() {
            return 'smtp.qq.com'
        },
        get user() {
            return '1169518718@qq.com'
        },
        get pass() {
            return 'peczsebyboixbafe'
        },
        get code() {
            return () => {
                // 随机的验证码
                return Math.rendom().toString(16).slice(2, 6).toUpperCase()
            }
        },
        get expire() {
            // 过期时间
            return () => {
                return new Date().getTime() + 60 * 60 * 1000
            }
        }
    },
    
}