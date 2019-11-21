<template>
    <div class="popup flex ai-c jc-c popup-form">
        <div class="pos-a close-bg" @click="closeForm" />
        <form action="#" class="footer__form flex fd-c pos-r c-after" autocomplete="off" novalidate="novalidate">
            <h4 class="form-title">Куда отправить расчет?</h4>
            <div class="form-block pos-r">
                <input 
                    v-model="email" 
                    type="email" 
                    class="input" 
                    placeholder="Email"
                    required
                    @blur="onBlur($event)"
                >
                <!-- <label v-if="!email" for="email" class="label">email</label> -->
            </div>
            <button type="submit" class="input btn-input" @click.prevent="onSubmit">ОТПРАВИТЬ</button>
            <button class="popup-close pos-a close-icon block" @click.prevent="closeForm">
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
            email: ''
        }
    },
    methods: {
        closeForm() {
            this.$emit('closemailform')
        },
        onBlur($event) {
            let target = $event.target
            let isValid = true
            let isEmpty = false
            if (target.type === 'email') {
                isValid = /^\w+\@\w+\.\w+$/g.test(target.value)
            }
            if (target.value.length === 0) {
                isEmpty = true
            }

            if (isValid && !isEmpty) this.setMessage('', '')
        },
        setMessage(type, text) {
            this.message.type = type
            this.message.text = text
        },
        async onSubmit() {
            let isValid = true
            let isEmpty = false

            isValid = /^\w+\@\w+\.\w+$/g.test(this.email)
            if (this.email.length === 0) {
                isEmpty = true
            }

            if (isEmpty) {
                this.setMessage('error', 'Все поля обязательные для заполнения')
                return
            } else if (!isValid) {
                this.setMessage('error', 'Неверный формат электронной почты')
                return
            }

            let tables = document.querySelectorAll('.calculation table')
            let calculationInfo = ''
            for (let table of tables) {
                calculationInfo += table.outerHTML
            }
            let date = document.querySelector('.date-input').value
            calculationInfo = calculationInfo.replace('<input type="text" placeholder="DD.MM.YYYY" class="date-input">', date)

            const formData = {
                email: this.email,
                message: calculationInfo
            }

            await this.$store.dispatch('sendCalculationInfo', formData)
                            .then(message => {
                                this.setMessage('success', message.message)
                                setTimeout(() => {
                                    this.setMessage('', '')
                                }, 5000)
                                this.email = ''
                            })
        }
    }
}
</script>