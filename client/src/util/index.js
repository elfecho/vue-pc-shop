/**
 * @file 所有公用的工具函数集合
 * @author junhao
*/
const navTo = function(url) {
    const path = this.$route.path
    if (url !== path) {
        this.$router.push(url);
    }
}

export default {
    install: Vue => {
        Vue.mixin({
            methods: {
                navTo
            }
        })
    }
}
