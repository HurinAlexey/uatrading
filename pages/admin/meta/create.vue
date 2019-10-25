<template>
    <div>
        <h1>Добавить мета-данные на страницу</h1>
        
        <el-form ref="form" :model="meta" label-width="120px">
            <el-form-item label="Страница">
                <el-input 
                    v-model="meta.page"
                    :rules="[
                        { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
                    ]"
                />
            </el-form-item>
            <el-form-item label="Title">
                <el-input 
                    v-model="meta.title"
                    :rules="[
                        { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
                    ]"
                />
            </el-form-item>
            <el-form-item label="Description">
                <el-input
                    type="textarea"
                    :rows="4"
                    v-model="meta.description"
                />
            </el-form-item>
            <el-form-item label="Keywords">
                <el-input v-model="meta.keywords"/>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" @click="onSubmit">Создать</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            meta: {
                page: '',
                title: '',
                description: '',
                keywords: ''
            },
            loading: false
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true

                    try {
                        let formData = {...this.meta}
                        await this.$store.dispatch('meta/create', formData)
                            .then(meta => {
                                this.$message.success('Мета-данные для страницы добавлены!')
                                this.$router.push(`/admin/meta/${meta._id}`)
                            })
                    } catch (e) {} finally {
                        this.loading = false
                    }
                } else {
                    this.$message.warning('Форма не валидна')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 28px;
    margin-bottom: 40px;
}
</style>
