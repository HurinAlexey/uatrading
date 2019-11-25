<template>
    <div class="popup flex ai-c jc-c popup-form">
        <div class="pos-a close-bg" @click="closeForm" />
        <form action="#" ref="callbackForm" class="footer__form flex fd-c pos-r c-after" autocomplete="off" novalidate="novalidate">
            <div class="form-block pos-r">
                <input 
                    v-model="callbackForm.name" 
                    type="text" 
                    id="name" 
                    class="input" 
                    placeholder="Имя"
                    required
                    @blur="onBlur($event)"
                >
                <label for="name" class="label display-n">имя</label>
            </div>
            <div class="form-block pos-r">
                <input 
                    v-model="callbackForm.phone" 
                    type="tel" 
                    id="tel" 
                    class="input" 
                    placeholder="Телефон"
                    required
                    @keypress="onKeyPress($event)"
                    @blur="onBlur($event)"
                >
                <label for="tel" class="label display-n">тел.</label>
            </div>
            <button type="submit" class="input btn-input" @click.prevent="onSubmit">ОТПРАВИТЬ</button>
            <button class="popup-close pos-a close-icon block" @click.prevent="closeForm" title="close">
                <svg width="18" height="18">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff"></line>
                    <line x1="0" y1="100%" x2="100%" y2="0" stroke="#fff"></line>
                </svg>
            </button>
            <div 
                v-if="message.text" 
                :class="{'message-valid': message.type === 'success', 'message-invalid': message.type === 'error'}"
            >{{message.text}}</div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: {
                type: '',
                text: ''
            },
            callbackForm: {
                name: '',
                phone: ''
            }
        }
    },
    methods: {
        closeForm() {
            this.$root.$emit('toggleform', false)
        },
        onKeyPress($event) {
            if ($event.keyCode < 48 || $event.keyCode > 57) $event.preventDefault()
        },
        onBlur($event) {
            let target = $event.target
            if (target.type === 'tel' && target.value.length !== 0) target.value = Number(target.value.replace(/\D+/g,""))
            
            let controls = $event.target.closest('form').getElementsByTagName('input')
            let isValid = true
            for (let control of controls) {
                if (control.value.length === 0) {
                    isValid = false
                }
            }

            if (isValid) this.setMessage('', '')
        },
        setMessage(type, text) {
            this.message.type = type
            this.message.text = text
        },
        async onSubmit() {
            const formData = {
                name: this.callbackForm.name,
                phone: this.callbackForm.phone
            }

            for (let value of Object.values(formData)) {
                if (value.length === 0) {
                    this.setMessage('error', 'Все поля обязательные для заполнения')
                    return
                }
            }

            await this.$store.dispatch('sendCallbackMail', formData)
                            .then(message => {
                                this.setMessage('success', message.message)
                                setTimeout(() => {
                                    this.setMessage('', '')
                                }, 5000)
                                this.callbackForm.name = ''
                                this.callbackForm.phone = ''
                            })
        }
    }
}
</script>