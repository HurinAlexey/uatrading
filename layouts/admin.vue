<template>
    <el-container>
        <admin-aside />
        <el-main>
            <nuxt />
        </el-main>
    </el-container>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import AdminAside from '@/components/admin/Aside.vue'

export default {
    head() {
        return {
            link: [
                { rel: 'stylesheet', href: '/css/element-ui.css' }
            ]
        }
    },
    middleware: ['admin-auth'],
    components: {
        AdminAside
    },
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(value) {
            this.$message.error(value.response.data.message)
        }
    },
    created() {
        Vue.use(ElementUI, { locale })
    }
}
</script>