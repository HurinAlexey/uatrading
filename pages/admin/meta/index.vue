<template>
    <div>
        <h1>Мета-данные</h1>
        <nuxt-link to="/admin/meta/create">
            <el-button type="primary">Добавить</el-button>
        </nuxt-link>
        

        <div class="content-wrap">
            <el-table
                :data="data"
            >
                <el-table-column
                    prop="page"
                    label="Страница"
                />
                <el-table-column
                    fixed="right"
                    label="Действия"
                >
                    <template slot-scope="scope">
                        <nuxt-link :to="`/admin/meta/${scope.row._id}`"><el-button type="primary" size="small" icon="el-icon-edit">Редактировать</el-button></nuxt-link>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteMeta(scope.row.page, scope.row._id)">Удалить</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    async asyncData({store}) {
        const data = await store.dispatch('meta/fetch')
        return {data}
    },
    methods: {
        async deleteMeta(page, id) {
            try {
                await this.$confirm(`Вы действительно хитите удалить мета-данные для страницы "${page}"?`, {type: 'warning'})
                await this.$store.dispatch('meta/remove', id)
                    .then(() => {
                        this.$message.success('Мета-данные удалены!')
                        this.data = this.data.filter(item => item._id !== id)
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

.content-wrap {
    margin-top: 20px;
}
</style>
