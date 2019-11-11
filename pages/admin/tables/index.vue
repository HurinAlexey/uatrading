<template>
    <div>
        <h1>Таблицы для расчета доставки</h1>
        
        <div class="flex fw-w">
            <nuxt-link 
                v-for="(link, index) of links" 
                :key="index" 
                :to="`/admin/tables/${link.href}`"
                class="card-link"
            >
                {{link.title}}
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            links: [
                {title: 'Транспортировка по США', href: 'transportation'},
                {title: 'Плата аукциона IAA', href: 'iaa-fee'},
                {title: 'Интернет ставка аукциона IAA', href: 'iaa-internet-bid'},
                {title: 'Плата аукциона Copart', href: 'copart-fee'},
                {title: 'Интернет ставка аукциона Copart', href: 'copart-internet-bid'},
                {title: 'Стоимость доставки по воде', href: 'ship-delivery'}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 28px;
    margin-bottom: 40px;
}

.card-link {
    width: calc((100% / 3) - 40px);
    margin: 20px;
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    transition: all .3s;

    &:hover {
        color: #409eff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
}
</style>