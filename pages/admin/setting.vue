<template>
    <div>
        <h1>Общие опции</h1>
        <el-table
            :data="options"
            style="width: 100%"
        >
            <el-table-column
                prop="title"
                label="Название"
            />
            <el-table-column
                prop="value"
                label="Значение"
            />
            <el-table-column
                fixed="right"
                label="Действия"
            >
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click="editOption(scope.row)" />
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteOption(scope.row.title, scope.row._id)" />
                </template>
            </el-table-column>
        </el-table>

        <div class="form-wrap">
            <h3>Добавить новую опцию</h3>
            <el-form :model="createForm" ref="createForm">
                <el-form-item
                    prop="title"
                    :rules="[
                        { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
                    ]"
                >
                    <el-input v-model="createForm.title" placeholder="Название" />
                </el-form-item>
                <el-form-item
                    prop="value"
                    :rules="[
                        { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
                    ]"
                >
                    <el-input v-model="createForm.value" placeholder="Значение" />
                </el-form-item>
                <el-form-item>
                    <el-button 
                        type="success" 
                        icon="el-icon-circle-plus-outline" 
                        @click="createOption" 
                        :loading="loadingCreate"
                    >Добавить опцию</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog
            title="Редактировать опцию"
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
                <el-form-item
                    prop="value"
                    :rules="[
                        { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
                    ]"
                >
                    <el-input v-model="editForm.value" placeholder="Значение" />
                </el-form-item>
                <el-form-item>
                    <el-button 
                        type="primary" 
                        icon="el-icon-document-checked" 
                        @click="updateOption" 
                        :loading="loadingEdit"
                    >Сохранить</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            createForm: {
                title: '',
                value: ''
            },
            editForm: {
                _id: '',
                title: '',
                value: ''
            },
            loadingCreate: false,
            loadingEdit: false,
            editVisible: false
        }
    },
    async asyncData({store}) {
        let options = await store.dispatch('option/fetch')
        options = options.sort((a, b) => {
            return String(a.title).localeCompare(b.title)
        })
        return {options}
    },
    methods: {
        async deleteOption(title, id) {
            try {
                await this.$confirm(`Вы действительно хитите удалить опцию "${title}"?`, {type: 'warning'})
                await this.$store.dispatch('option/remove', id)
                    .then(message => {this.$message.success(message.message)})
                this.options = this.options.filter(item => item._id !== id)
            } catch (e) {}
        },
        createOption() {
            this.$refs.createForm.validate(async valid => {
                if (valid) {
                    this.loadingCreate = true

                    try {
                        await this.$store.dispatch('option/create', this.createForm)
                            .then(option => {
                                this.options.push(option)
                                this.$refs.createForm.resetFields()
                                this.loadingCreate = false
                            })

                    } catch (e) {
                        this.loadingCreate = false
                    }
                }
            })
        },
        editOption(data) {
            this.editVisible = true
            this.editForm = {
                id: data._id,
                title: data.title,
                value: data.value
            }
        },
        updateOption() {
            this.$refs.editForm.validate(async valid => {
                if (valid) {
                    this.loadingEdit = true

                    try {
                        await this.$store.dispatch('option/update', this.editForm)
                            .then(() => {
                                this.options.map((item, index) => {
                                    if (item._id === this.editForm.id) {
                                        item.title = this.editForm.title,
                                        item.value = this.editForm.value
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

.form-wrap {
    width: 100%;
    max-width: 100%;
    padding: 20px;
    margin: 20px auto;
    background-color: #fff;

    h3 {
        margin-bottom: 15px;
    }

    .el-form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-form-item {
            width: calc((100% / 3) - 10px);
        }

        .el-button {
            width: 100%;
        }
    }
}
</style>
