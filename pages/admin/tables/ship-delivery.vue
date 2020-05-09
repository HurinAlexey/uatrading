<template>
    <div>
        <h1>Стоимость доставки по воде</h1>

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
                prop="Port"
                label="Port"
            />
            <el-table-column
                prop="Odessa Car"
                label="Odessa Car"
            />
            <el-table-column
                prop="Odessa Moto"
                label="Odessa Moto"
            />
            <el-table-column
                prop="Klaypeda Car"
                label="Klaypeda Car"
            />
            <el-table-column
                prop="Klaypeda Moto"
                label="Klaypeda Moto"
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
        const jsonData = await store.dispatch('calculator/getData', 'ship_delivery')
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
                    title: 'ship_delivery',
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