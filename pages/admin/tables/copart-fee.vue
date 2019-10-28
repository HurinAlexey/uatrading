<template>
    <div>
        <h1>Плата аукциона Copart</h1>

        <div class="flex ai-fs">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleFileChange"
                :auto-upload="false"
                class="mb20 mr20"
            >
                <el-button type="warning">Загрузить новые данные XLS</el-button>
                <div slot="tip" class="el-upload__tip">jpg/png менее чем 500kb</div>
            </el-upload>

            <el-button class="mb20" type="primary" :loading="loading" @click="onSubmit">Отправить</el-button>
        </div>

         <el-table
            :data="data"
        >
            <el-table-column
                prop="Price from"
                label="Price from"
            />
            <el-table-column
                prop="Price to"
                label="Price to"
            />
            <el-table-column
                prop="Buyer fee"
                label="Buyer fee"
            />
        </el-table>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            file: null,
            loading: false
        }
    },
    async asyncData({store}) {
        const jsonData = await store.dispatch('calculator/getData', 'copart_fee')
        const data = jsonData.data
        return {data}
    },
    methods: {
        handleFileChange(file, fileList) {
            this.file = file.raw
        },
        async onSubmit() {
            if (this.file) {
                this.loading = true
                const formData = {
                    title: 'copart_fee',
                    file: this.file
                }

                try {
                    await this.$store.dispatch('calculator/uploadTable', formData)
                        .then(message => {
                            this.$message.success(message.message)
                            this.$router.reload()
                        })
                } catch (e) {} finally {
                    this.loading = false
                }
            } else {
                this.$message.warning('Файл не загружен')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 28px;
    margin-bottom: 40px;
}

.mb20 {
    margin-bottom: 20px;
}

.mr20 {
    margin-right: 20px;
}
</style>