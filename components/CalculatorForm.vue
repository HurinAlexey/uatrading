<template>
    <div class="form-wrap">
        <div class="form-control-wrap">
            <label>Тип двигателя</label>
            <div class="dropdown">
                <div class="form-control" @click="toggleDropdown($event)">{{data.engineTypes[0].title}}</div>
                <ul class="dropdown-list">
                    <li
                        v-for="(type, index) of data.engineTypes"
                        :key="index"
                        :class="{'active': index === 0}"
                        @click="formChange($event)"
                    >{{type.title}}</li>
                </ul>
            </div>
        </div>

        <form 
            v-for="(form, index) of data.forms"
            :key="index"
            :id="data.idPrefix + '-' + form.type"
            class="calculator-form"
            :class="{'active': index === 0}"
            @submit.prevent="onSubmit($event)"
        >
            <input type="hidden" name="engine-type" :value="form.type" />
            <div 
                v-for="(control, index) of form.controls"
                :key="index"
                class="form-control-wrap"
            >
                <label>{{control.label}}</label>
                <input 
                    v-if="control.type === 'input'" 
                    type="text"
                    :name="control.name"
                    class="form-control"
                    @keypress="onKeyPress($event)"
                    @blur="onBlur($event)"
                />
                <div v-if="control.type === 'select'" class="dropdown">
                    <input type="hidden" :name="control.name" :value="control.options[0]" />
                    <div class="form-control" @click="toggleDropdown($event)">{{control.options[0]}}</div>
                    <ul class="dropdown-list">
                        <li
                            v-for="(option, index) of control.options"
                            :key="index"
                            :class="{'active': index === 0}"
                            @click="selectOption($event)"
                        >{{option}}</li>
                    </ul>
                </div>
            </div>

            <div 
                v-if="delivery && (data.idPrefix === 'passenger' || data.idPrefix === 'truck')"
                class="form-control-wrap"
            >
                <label>Расчет доставки по США</label>
                <div class="checkbox-wrap">
                    <div class="checkbox" @click="onCheck($event)">
                        <input type="checkbox" name="delivery" class="display-n" />
                        <img src="images/check.png" alt="check">
                    </div>
                </div>
            </div>
            <div v-if="showDelivery" class="delivery-calculator w100">
                <div 
                    v-for="(control, index) of deliveryControls"
                    :key="index"
                    class="form-control-wrap"
                >
                    <label>{{control.label}}</label>
                    <div class="dropdown">
                        <input type="hidden" :name="control.name" :value="control.options[0]" />
                        <div class="form-control" @click="toggleDropdown($event)">
                            <span v-if="control.staticText" class="static-text">{{control.staticText}}</span>
                            {{control.options[0]}}
                        </div>
                        <ul class="dropdown-list">
                            <li
                                v-for="(option, index) of control.options"
                                :key="index"
                                :class="{'active': index === 0}"
                                @click="selectOption($event)"
                            >{{option}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button type="submit" class="input btn-input">Рассчитать</button>
        </form>

        <div v-if="errorMessage.length" class="message-invalid">{{errorMessage}}</div>
    </div>
</template>

<script>
export default {
    props: ['data', 'delivery'],
    data() {
        return {
            errorMessage: '',
            showDelivery: false,
            deliveryControls: [
                {
                    label: 'Аукцион',
                    name: 'auction',
                    options: [
                        'IAAI', 
                        'Copart'
                    ]
                },
                {
                    label: 'Доставка по США',
                    name: 'delivery-from',
                    staticText: 'от',
                    options: [
                        'TX Texas'
                    ]
                },
                {
                    label: '',
                    name: 'delivery-to',
                    staticText: 'до',
                    options: [
                        'GA Savannah'
                    ]
                }
            ]
        }
    },
    methods: {
        toggleDropdown($event) {
            $event.target.closest('.dropdown').classList.toggle('open')
        },
        formChange($event) {
            const target = $event.target
            target.parentElement.querySelector('.active').classList.remove('active')
            target.classList.add('active')

            let engineType = target.textContent
            let targetEngine = this.data.engineTypes.filter(item => item.title === engineType)[0]
            target.closest('.dropdown').querySelector('.form-control').textContent = targetEngine.title
            
            target.closest('.form-wrap').querySelector('form.active').classList.remove('active')
            let formId = this.data.idPrefix + '-' + targetEngine.form
            document.getElementById(formId).classList.add('active')

            target.closest('.dropdown').classList.remove('open')
        },
        selectOption($event) {
            const target = $event.target
            const dropdown = target.closest('.dropdown')
            const currentOption = target.textContent

            target.parentElement.querySelector('.active').classList.remove('active')
            target.classList.add('active')

            dropdown.querySelector('.form-control').textContent = currentOption
            dropdown.querySelector('input').value = currentOption
            dropdown.classList.remove('open')
        },
        onKeyPress($event) {
            if ($event.keyCode < 48 || $event.keyCode > 57) $event.preventDefault()
        },
        onBlur($event) {
            let target = $event.target
            target.value = Number(target.value.replace(/\D+/g,""))
            
            let controls = $event.target.closest('form').getElementsByTagName('input')
            let isValid = true
            for (let control of controls) {
                if (control.value.length === 0) {
                    isValid = false
                }
            }

            if (isValid) this.setErrorMessage('')
        },
        onCheck($event) {
            let target = $event.target.closest('.checkbox')
            let input = target.getElementsByTagName('input')[0]
            if (input.checked) {
                target.classList.remove('checked')
                input.checked = false
                this.showDelivery = false
            } else {
                target.classList.add('checked')
                input.checked = true
                this.showDelivery = true
            }
        },
        setErrorMessage(text) {
            this.errorMessage = text
        },
        onSubmit($event) {
            let controls = $event.target.getElementsByTagName('input')
            let data = {
                'transport-type': this.data.idPrefix
            }

            for (let control of controls) {
                if (control.type === 'checkbox') {
                    data[control.name] = control.checked
                } else {
                    data[control.name] = control.value
                }

                if (control.value.length === 0) {
                    this.setErrorMessage('Все поля обязательные для заполнения')
                    return
                }
            }

            this.setErrorMessage('')

            this.$root.$emit('calculate', data)
        }
    }
}
</script>