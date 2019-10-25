<template>
    <div>Loading...</div>
</template>

<script>
export default {
    layout: 'admin',
    beforeCreate() {
        this.$router.push('/admin/setting')
    }
}
</script>
