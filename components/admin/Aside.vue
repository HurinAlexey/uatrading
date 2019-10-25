<template>
    <el-aside class="admin-aside">
        <el-menu 
            class="aside-menu" 
            :collapse="isCollapse"
        >
            <el-menu-item index="1">
                <nuxt-link to="/" class="logo">UB<span>Trading</span></nuxt-link>
            </el-menu-item>
            <el-menu-item index="2">
                <button class="collapse-btn" @click="isCollapse = !isCollapse">
                    <i class="el-icon-arrow-left"></i>
                    <span slot="title">Скрыть</span>
                </button>
            </el-menu-item>
            <el-menu-item index="3">
                <nuxt-link to="/admin/setting">
                    <i class="el-icon-setting"></i>
                    <span>Общие опции</span>
                </nuxt-link>
            </el-menu-item>
            <el-menu-item index="4">
                <nuxt-link to="/admin/categories">
                    <i class="el-icon-collection-tag"></i>
                    <span>Категории</span>
                </nuxt-link>
            </el-menu-item>
            <el-menu-item index="5">
                <nuxt-link to="/admin/posts">
                    <i class="el-icon-tickets"></i>
                    <span>Посты</span>
                </nuxt-link>
            </el-menu-item>
            <el-menu-item index="6">
                <nuxt-link to="/admin/meta">
                    <i class="el-icon-data-analysis"></i>
                    <span>Мета-данные</span>
                </nuxt-link>
            </el-menu-item>
            <el-menu-item index="7" class="logout">
                <nuxt-link to="/admin/logout">
                    <i class="el-icon-user"></i>
                    <span>Выйти</span>
                </nuxt-link>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-aside {
    min-height: 100vh;
    max-width: 300px;
    width: auto !important;
    
    .aside-menu {
        width: 100%;
        height: 100%;
    }
}

.el-menu-item {
    padding: 0!important;

    a {
        display: block;
        padding: 0 20px;
        width: 100%;
        height: 100%;
    }

    .collapse-btn {
        display: block;
        padding: 0 20px;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        font-family: NokiaPureText_Lt;
        text-align: left;
        color: #303133;
        cursor: pointer;
    }
}

.el-menu--collapse {
    .collapse-btn i {
        transform: scaleX(-1);
    }
}

.logo {
    text-align: center;
    font-size: 20px;
}

.logout {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
}
</style>