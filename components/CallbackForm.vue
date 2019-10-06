<template>
    <div class="popup flex ai-c jc-c popup-form">
        <div class="pos-a close-bg" @click="closeForm" />
        <form action="#" class="footer__form flex fd-c pos-r c-after" autocomplete="off" novalidate="novalidate">
            <div class="form-block pos-r">
                <input type="text" id="name" class="input" required="">
                <label for="name" class="label">имя</label>
            </div>
            <div class="form-block pos-r">
                <input type="tel" id="tel" class="input" required="">
                <label for="tel" class="label">тел.</label>
            </div>
            <button type="submit" class="input btn-input">ОТПРАВИТЬ</button>
            <button class="popup-close pos-a close-icon block" @click="closeForm">
                <svg width="18" height="18">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff"></line>
                    <line x1="0" y1="100%" x2="100%" y2="0" stroke="#fff"></line>
                </svg>
            </button>
        </form>
    </div>
</template>

<script>
export default {
    methods: {
        closeForm() {
            this.$root.$emit('toggleform', false)
        }
    }
}
</script>