<template>
    <el-container id="login-page">
        <el-header>
            <nuxt-link to="/" class="logo">UBTrading</nuxt-link>
        </el-header>
        <el-main>
            <div class="form-wrap">
                <el-form :model="form" ref="form" label-width="70px">
                    <el-form-item
                        prop="login"
                        label="Логин"
                        :rules="[
                            { required: true, message: 'Логин не должен быть пустым', trigger: 'blur' }
                        ]"
                    >
                        <el-input v-model="form.login"></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="password"
                        label="Пароль"
                        :rules="[
                            { required: true, message: 'Пароль не должен быть пустым', trigger: 'blur' }
                        ]"
                    >
                        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onSubmit" :loading="loading">Войти в систему</el-button>
                    </el-form-item>
                </el-form>
            </div>
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
  data() {
    return {
      loading: false,
      form: {
        login: '',
        password: ''
      }
    }
  },
  computed: {
      error() {
          let error = this.$store.getters.error
          console.log(error)
          return error
      }
  },
  watch: {
      error(value) {
          this.$message.error(value.response.data.message)
      }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          try {
            const formData = {
              login: this.form.login,
              password: this.form.password
            }

            await this.$store.dispatch('auth/login', formData)
            this.$router.push('/admin')

          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  },
  created() {
      Vue.use(ElementUI, { locale })
  },
  mounted() {
    const {message} = this.$route.query

    switch (message) {
      case 'login':
        this.$message.info('Для начала войдите в систему')
        break
      case 'logout':
        this.$message.success('Вы успешно вышли из системы')
        break
      case 'session':
        this.$message.warning('Время сессии истекло, пожалуйста зайдите заного')
        break
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: #fff;

    .logo {
        font-size: 24px;
        transition: all .2s;

        &:hover {
            color: #cc9557;
        }
    }
}

.el-main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px);
}

.form-wrap {
    width: 500px;
    max-width: 96%;
    padding: 40px 30px 20px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, .1);

    button {
        background-color: #cc9557;
        color: #fff;

        &:hover {
            background: #8e683d;
        }
    }
}
</style>