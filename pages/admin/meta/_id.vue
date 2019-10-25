<template>
    <div>
        <h1>Редактировать мета-данные</h1>
        
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
                <el-button :loading="loading" type="danger" @click="onDelete">Удалить</el-button>
                <el-button :loading="loading" type="primary" @click="onSubmit">Сохранить</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    validate ({params}) {
        return !!params.id
    },
    data() {
        return {
            loading: false
        }
    },
    async asyncData({store, params}) {
        const meta = await store.dispatch('meta/fetchById', params.id)
        return {meta}
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true

                    try {
                        let formData = {
                            id: this.meta._id,
                            page: this.meta.page,
                            title: this.meta.title,
                            description: this.meta.description,
                            keywords: this.meta.keywords
                        }
                        await this.$store.dispatch('meta/update', formData)
                            .then(meta => {
                                this.$message.success('Изменения сохранены!')
                            })
                    } catch (e) {} finally {
                        this.loading = false
                    }
                } else {
                    this.$message.warning('Форма не валидна')
                }
            })
        },
        async onDelete() {
            try {
                await this.$confirm(`Вы действительно хитите удалить мета-данные страницы "${this.meta.page}"?`, {type: 'warning'})
                await this.$store.dispatch('meta/remove', this.meta._id)
                    .then(() => {
                        this.$message.success('Мета-данные удалены!')
                        this.$router.push('/admin/meta')
                    })
            } catch (e) {}
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 28px;
    margin-bottom: 40px;
}

.switch-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
        display: block;
        margin-right: 10px;
    }
}

.quill-editor {
    background-color: #fff;
    height: 200px;
    max-height: 400px;
    overflow-y: auto;
}
</style>