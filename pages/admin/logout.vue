<template>
  <div>Очищаем данные</div>
</template>

<script>
export default {
  layout: 'empty',
  middleware: ['admin-auth'],
  beforeCreate() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/admin/login?message=logout')
  }
}
</script>
