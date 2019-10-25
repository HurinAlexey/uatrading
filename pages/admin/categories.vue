<template>
    <div>
        <h1>Категории</h1>
        <div class="content-wrap">
            <el-table
                :data="categories"
            >
                <el-table-column
                    prop="title"
                    label="Название"
                />
                <el-table-column
                    fixed="right"
                    label="Действия"
                >
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" icon="el-icon-edit" @click="editCategory(scope.row)">Редактировать</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteCategory(scope.row.title, scope.row._id)">Удалить</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="form-wrap">
                <h3>Добавить новую категорию</h3>
                <el-form :model="createForm" ref="createForm">
                    <el-form-item
                        prop="title"
                        :rules="[
                            { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
                        ]"
                    >
                        <el-input v-model="createForm.title" placeholder="Название" />
                    </el-form-item>
                    <el-form-item>
                        <el-button 
                            type="success" 
                            icon="el-icon-circle-plus-outline" 
                            @click="createCategory" 
                            :loading="loadingCreate"
                        >Добавить категорию</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <el-dialog
                title="Редактировать категорию"
                :visible.sync="editVisible"
                width="320px"
            >
                <el-form :model="editForm" ref="editForm">
                    <el-form-item
                        prop="title"
                        :rules="[
                            { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
                        ]"
                    >
                        <el-input v-model="editForm.title" placeholder="Название" />
                    </el-form-item>
                    <el-form-item>
                        <el-button 
                            type="primary" 
                            icon="el-icon-document-checked" 
                            @click="updateCategory" 
                            :loading="loadingEdit"
                        >Сохранить</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            createForm: {
                title: ''
            },
            editForm: {
                _id: '',
                title: ''
            },
            loadingCreate: false,
            loadingEdit: false,
            editVisible: false
        }
    },
    async asyncData({store}) {
        const categories = await store.dispatch('category/fetch')
        return {categories}
    },
    methods: {
        createCategory() {
            this.$refs.createForm.validate(async valid => {
                if (valid) {
                    this.loadingCreate = true

                    try {
                        await this.$store.dispatch('category/create', this.createForm)
                            .then(category => {
                                this.categories.push(category)
                                this.$refs.createForm.resetFields()
                                this.loadingCreate = false
                            })

                    } catch (e) {
                        this.loadingCreate = false
                    }
                }
            })
        },
        async deleteCategory(title, id) {
            try {
                await this.$confirm(`Вы действительно хитите удалить категорию "${title}"?`, {type: 'warning'})
                await this.$store.dispatch('category/remove', id)
                    .then(message => {this.$message.success(message.message)})
                this.categories = this.categories.filter(item => item._id !== id)
            } catch (e) {}
        },
        editCategory(data) {
            this.editVisible = true
            this.editForm = {
                id: data._id,
                title: data.title
            }
        },
        updateCategory() {
            this.$refs.editForm.validate(async valid => {
                if (valid) {
                    this.loadingEdit = true

                    try {
                        await this.$store.dispatch('category/update', this.editForm)
                            .then(() => {
                                this.categories.map((item, index) => {
                                    if (item._id === this.editForm.id) {
                                        item.title = this.editForm.title
                                    }
                                })
                                this.loadingEdit = false
                            })

                    } catch (e) {
                        this.loadingEdit = false
                    }
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

.content-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
}

.form-wrap {
    width: 300px;
    padding: 20px;
    margin-left: 20px;
    background-color: #fff;

    h3 {
        margin-bottom: 15px;
    }

    .el-form {
        width: 100%;

        .el-button {
            width: 100%;
        }
    }
}
</style>
