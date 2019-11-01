<template>
    <div ref="calculation">
        <img src="images/blur-schema-usa.jpg" alt="calculator bg" class="calculator-bg">

        <button class="back-to-calc" @click="returnToCalculator">
            <img src="images/arrow-back.png" alt="back">
        </button>

        <button class="popup-close pos-a close-icon block" @click="closeCustomsCalculator">
            <svg width="18" height="18">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff"></line>
                <line x1="0" y1="100%" x2="100%" y2="0" stroke="#fff"></line>
            </svg>
        </button>

        <table class="data-info">
            <tbody>
                <tr >
                    <td class="title">Дата расчета</td>
                    <td class="input-wrap">
                        <input 
                            type="text" 
                            v-model="date" 
                            @blur="setCurrencyByDate" 
                            placeholder="DD.MM.YYYY"
                            class="date-input" 
                        />
                        <div 
                            v-if="calculationError" 
                            class="message-invalid"
                        >{{calculationError.toString()}}</div>
                    </td>
                </tr>
                <tr v-for="(item, index) of dataInfo" :key="index">
                    <td class="title">{{item.title}}</td>
                    <td>{{item.value}}</td>
                </tr>
            </tbody>
        </table>

        <table class="customs-payments">
            <thead>
                <tr>
                    <td class="table-title">Таможенные платежи</td>
                    <td>Основа начисления</td>
                    <td>Ставка</td>
                    <td>Сумма, грн</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="title">Ввозная пошлина</td>
                    <td>{{finalBid | float(2)}}</td>
                    <td>10 %</td>
                    <td>{{importTax | float(2)}}</td>
                </tr>
                <tr>
                    <td class="title">Акцизный налог</td>
                    <td>{{data['engine-volume']}}</td>
                    <td>{{exciseTax | float(2)}} EUR</td>
                    <td>{{exciseTaxUah | float(2)}}</td>
                </tr>
                <tr>
                    <td class="title">НДС</td>
                    <td>{{costWithTax | float(2)}}</td>
                    <td>20 %</td>
                    <td>{{vat | float(2)}}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td class="title">Итого (грн/usd)</td>
                    <td class="result">{{paymentsSum | float(2)}} / {{paymentsSumUsd | float(2)}}</td>
                </tr>
            </tfoot>
        </table>

        <div class="button-wrap">
            <button class="send-button" @click="showMailForm">Отправить расчет на почту</button>
        </div>

        <app-calculation-mail-form v-if="formVisible" @closemailform="hideMailForm" />
    </div>
</template>

<script>
import AppCalculationMailForm from '@/components/CalculationMailForm.vue'

export default {
    props: ['data'],
    components: {
        AppCalculationMailForm,
    },
    data() {
        return {
            date: new Date().toLocaleDateString(),
            formVisible: false
        }
    },
    computed: {
        currency() {
            const data = this.$store.getters['currency']
            return {
                'USD': data['USD'],
                'EUR': data['EUR']
            }
        },
        calculationError() {
            const error = this.$store.getters['calculationError']
            return error
        },
        finalBid() {
            let costUah = +this.data['cost'] * this.currency[this.data['currency']]
            return costUah + 500 * this.currency['USD']
        },
        importTax() {
            return this.data['engine-type'] === 'electro' ? 0 : this.finalBid * 0.1
        },
        exciseTax() {
            return this.calculateExciseTax(this.data['transport-type'])
        },
        exciseTaxUah() {
            return this.exciseTax * this.currency['EUR']
        },
        costWithTax() {
            return this.finalBid + this.importTax + this.exciseTaxUah
        },
        vat() {
            return this.data['engine-type'] === 'electro' ? 0 : this.costWithTax * 0.2
        },
        paymentsSum() {
            return this.importTax + this.exciseTaxUah + this.vat
        },
        paymentsSumUsd() {
            return this.paymentsSum / this.currency['USD']
        },
        dataInfo() {
            let engineType = ''
            switch (this.data['engine-type']) {
                case 'petrol':
                    engineType = 'Бензин'
                    break
                case 'diesel':
                    engineType = 'Дизель'
                    break
                case 'electro':
                    engineType = 'Электро'
                    break
                case 'hybrid':
                    engineType = 'Гибрид'
                    break
                default:
                    engineType = 'Неверный тип двигателя'
            }

            let result =  [
                // {title: 'Дата расчета', value: this.date},
                {title: 'Тип двигателя', value: engineType},
                {title: 'Объем двигателя', value: this.data['engine-volume']},
                {title: 'Стоимость', value: this.data['cost'] + ' ' + this.data['currency']}
            ]

            if (this.data['year']) {
                result.push({title: 'Год выпуска', value: this.data['year']})
            }
            if (this.data['age']) {
                result.push({title: 'Возраст', value: this.data['age']})
            }

            return result
        }
    },
    methods: {
        closeCustomsCalculator() {
            this.$root.$emit('closecustomscalculator')
        },
        returnToCalculator() {
            this.$root.$emit('returntocalculator')
        },
        calculateExciseTax(transportType) {
            switch (transportType) {
                case 'passenger':
                    return this.calculatePassengerExciseTax()
                    break
                case 'truck':
                    return this.calculateTruckExciseTax()
                    break
                case 'moto':
                    return this.calculateMotoExciseTax()
                    break
                case 'bus':
                    return this.calculateBusExciseTax()
                    break
                default:
                    throw new Error('Неверный тип транспорта')
            }
        },
        calculatePassengerExciseTax() {
            if (this.data['engine-type'] === 'petrol') {
                let baseTax = this.data['engine-volume'] <= 3000 ? 50 : 100
                let engineCoefficient = this.data['engine-volume'] / 1000
                let age = new Date().getFullYear() - this.data['year']
                let yearCoefficient = 0
                if (age < 1) {
                    yearCoefficient = 1
                } else if (age > 15) {
                    yearCoefficient = 15
                } else {
                    yearCoefficient = age
                }
                return baseTax * engineCoefficient * yearCoefficient
            } else if (this.data['engine-type'] === 'diesel') {
                let baseTax = this.data['engine-volume'] <= 3500 ? 75 : 150
                let engineCoefficient = this.data['engine-volume'] / 1000
                let age = new Date().getFullYear() - this.data['year']
                let yearCoefficient = 0
                if (age < 1) {
                    yearCoefficient = 1
                } else if (age > 15) {
                    yearCoefficient = 15
                } else {
                    yearCoefficient = age
                }
                return baseTax * engineCoefficient * yearCoefficient
            } else if (this.data['engine-type'] === 'electro') {
                return this.data['engine-power']
            } else if (this.data['engine-type'] === 'hybrid') {
                return 100
            }
        },
        calculateTruckExciseTax() {
            let engineVolume = this.data['engine-volume']
            let taxPerUnit = 0
            if (this.data['weight'] === 'не более 5 т') {
                taxPerUnit = this.data['age'] === 'Новый' ? 0.01 : 0.02
            } else if (this.data['weight'] === 'более 5 т' || this.data['weight'] === 'более 5 т, но не более 20 т') {
                taxPerUnit = this.data['age'] === 'Новый' ? 0.013 : 0.026
            } else if (this.data['weight'] === 'более 20 т') {
                taxPerUnit = this.data['age'] === 'Новый' ? 0.016 : 0.033
            } else {
                throw new Error('Неверный вес автомобиля')
            }
            let yearCoefficient = 1
            if (this.data['age'] === 'В использовании с 5 до 8 лет') {
                yearCoefficient = 40
            } else if (this.data['age'] === 'В использовании более 8 лет') {
                yearCoefficient = 50
            }
            return engineVolume * taxPerUnit * yearCoefficient
        },
        calculateMotoExciseTax() {
            let engineVolume = this.data['engine-volume']
            let taxPerUnit = 0
            if (engineVolume <= 500) {
                taxPerUnit = 0.062
            } else if (engineVolume <= 800) {
                taxPerUnit = 0.443
            } else {
                taxPerUnit = 0.447
            }
            return engineVolume * taxPerUnit
        },
        calculateBusExciseTax() {
            let engineVolume = this.data['engine-volume']
            let taxPerUnit = 0
            if (this.data['age'] === 'В использовании более 8 лет') {
                taxPerUnit = 0.003
            } else if (this.data['engine-type'] === 'diesel' && engineVolume > 2500 && engineVolume <= 5000) {
                taxPerUnit = 0.003
            } else {
                taxPerUnit = 0.007
            }
            let yearCoefficient = 1 
            if (this.data['age'] === 'В использовании более 8 лет') {
                yearCoefficient = 50
            }
            return engineVolume * taxPerUnit * yearCoefficient
        },
        async setCurrencyByDate() {
            const valid = /^\d{2}\.\d{2}\.\d{4}$/g.test(this.date)
            if (valid) {
                const dateArray = this.date.split('.')
                const date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0])
                this.$store.commit('clearCalculationError')
                await this.$store.dispatch('getCurrency', date)
            } else {
                const error = new Error('Неверный формат даты')
                this.$store.commit('setCalculationError', error)
            }

            this.calculationError = this.$store.getters['calculationError']
        },
        showMailForm() {
            this.formVisible = true
        },
        hideMailForm() {
            this.formVisible = false
        },
        async sendByMail() {

        }
    },
    mounted() {
        setTimeout(() => {
            document.querySelector('.calculation').classList.add('open')
        }, 200)
    }
}
</script>

