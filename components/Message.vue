<template>
    <div class="popup flex ai-c jc-c thanks">
        <div class="popup-close pos-a close-bg"></div>
        <div class="footer__form flex fd-c pos-r  c-after">
            <a href="#" class="popup-close pos-a close-icon block">
                <svg width="18" height="18">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff"></line>
                    <line x1="0" y1="100%" x2="100%" y2="0" stroke="#fff"></line>
                </svg>
            </a>
            <div class="thanks__tex pos-r" style="z-index: 1">
                Спасибо!
                <br>
                Мы свяжемся с Вами в ближайшее время.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['text']
}
</script>