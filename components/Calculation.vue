<template>
    <div ref="calculation">
        <img src="images/blur-schema-usa.png" alt="calculator bg" class="calculator-bg">

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
                    <td>{{costUah | float(2)}}</td>
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
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            currency: {
                'USD': 24.6,
                'EUR': 26.9
            }
        }
    },
    computed: {
        costUah() {
            return +this.data['cost'] * this.currency[this.data['currency']]
        },
        importTax() {
            return this.data['engine-type'] === 'electro' ? 0 : this.costUah * 0.1
        },
        exciseTax() {
            return this.calculateExciseTax(this.data['transport-type'])
        },
        exciseTaxUah() {
            return this.exciseTax * this.currency['EUR']
        },
        costWithTax() {
            return this.costUah + this.importTax + this.exciseTaxUah
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

            return [
                {title: 'Дата расчета', value: new Date().toLocaleDateString()},
                {title: 'Тип двигателя', value: engineType},
                {title: 'Объем двигателя', value: this.data['engine-volume']},
                {title: 'Год выпуска', value: this.data['year']},
                {title: 'Стоимость', value: this.data['cost'] + ' ' + this.data['currency']}
            ]
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

        },
        calculateMotoExciseTax() {
            switch (this.data['engine-volume-range']) {
                case 'не более 50 см3':
                    return 1
                    break
                case 'более 50 см3, но не более 250 см3':
                    return 2
                    break
                case 'более 250 см3, но не более 500 см3':
                    return 3
                    break
                case 'более 500 см3, но не более як 800 см3':
                    return 4
                    break
                case 'более 800 см3':
                    return 5
                    break
                default:
                    throw new Error('Неверный объем двигателя')
            }
        },
        calculateBusExciseTax() {

        }
    },
    mounted() {
        setTimeout(() => {
            document.querySelector('.calculation').classList.add('open')
        }, 200)
    }
}
</script>

