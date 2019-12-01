<template>
    <vue-draggable-resizable
      :w="dragOptions.w"
      :h="dragOptions.h"
      :draggable="dragOptions.draggable"
      :resizable="dragOptions.resizable"
      class-name="calculator-wrap"
      class-name-draggable="draggable"
    >
        <div class="calculator" ref="calculator">
            <button class="popup-close pos-a close-icon block" @click="closeCustomsCalculator">
                <svg width="18" height="18">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#fff"></line>
                    <line x1="0" y1="100%" x2="100%" y2="0" stroke="#fff"></line>
                </svg>
            </button>
            <ul class="transport-tabs">
                <li 
                    v-for="(tab, index) of transportTabs" 
                    :key="index"
                    class="tab"
                    :class="{'active': tab.default}"
                    @click="tabClick($event)"
                >{{tab.title}}</li>
            </ul>

            <div class="calculator-content">
                <vuescroll :ops="scrollOptions">
                    <app-calculator-form 
                        :class="{'display-n': activeCalculator !== 'passenger-calculator'}" 
                        :data="passengerCalculator" 
                        :delivery="delivery" 
                    />
                    <app-calculator-form 
                        :class="{'display-n': activeCalculator !== 'truck-calculator'}" 
                        :data="truckCalculator" 
                        :delivery="delivery" 
                    />
                    <app-calculator-form 
                        :class="{'display-n': activeCalculator !== 'moto-calculator'}" 
                        :data="motoCalculator" 
                        :delivery="delivery" 
                    />
                    <app-calculator-form 
                        :class="{'display-n': activeCalculator !== 'bus-calculator'}" 
                        :data="busCalculator" 
                        :delivery="delivery" 
                    />
                </vuescroll>
            </div>
        </div>

        <app-calculation v-if="calculation" :data="calculation" class="calculation" />
    </vue-draggable-resizable>
</template>

<script>
import vuescroll from 'vuescroll'
import AppCalculatorForm from '@/components/CalculatorForm.vue'
import AppCalculation from '@/components/Calculation.vue'

export default {
    props: ['delivery'],
    components: {
        AppCalculatorForm,
        AppCalculation,
        vuescroll
    },
    data() {
        return {
            dragOptions: {
                w: 630,
                h: 490,
                draggable: true,
                resizable: false
            },
            scrollOptions: {
                bar: {
                    showDelay: 500,
                    onlyShowBarOnScroll: false,
                    keepShow: false,
                    background: '#cc9557',
                    opacity: 1,
                    hoverStyle: false,
                    specifyBorderRadius: false,
                    minSize: 0,
                    size: '5px',
                    disable: false
                }
            },
            transportTabs: [
                {
                    title: 'Легковой',
                    target: 'passenger-calculator',
                    default: true
                }, 
                {
                    title: 'Грузовой',
                    target: 'truck-calculator'
                }, 
                {
                    title: 'Мото',
                    target: 'moto-calculator'
                }, 
                {
                    title: 'Автобус',
                    target: 'bus-calculator'
                }
            ],
            activeCalculator: 'passenger-calculator',
            passengerCalculator: {
                idPrefix: 'passenger',
                engineTypes: [
                    {title: 'Бензин', form: 'petrol'},
                    {title: 'Дизель', form: 'diesel'},
                    {title: 'Электро', form: 'electro'},
                    {title: 'Гибрид', form: 'hybrid'}
                ],
                forms: [
                    {
                        title: 'Бензин',
                        type: 'petrol',
                        controls: [
                            {
                                label: 'Объем двигателя, см3',
                                type: 'input',
                                name: 'engine-volume'
                            },
                            {
                                label: 'Год выпуска',
                                type: 'input',
                                name: 'year'
                            },
                            {
                                label: 'Валюта',
                                type: 'select',
                                name: 'currency',
                                options: ['USD', 'EUR']
                            },
                            {
                                label: 'Стоимость',
                                type: 'input',
                                name: 'cost'
                            }
                        ]
                    },
                    {
                        title: 'Дизель',
                        type: 'diesel',
                        controls: [
                            {
                                label: 'Объем двигателя, см3',
                                type: 'input',
                                name: 'engine-volume'
                            },
                            {
                                label: 'Год выпуска',
                                type: 'input',
                                name: 'year'
                            },
                            {
                                label: 'Валюта',
                                type: 'select',
                                name: 'currency',
                                options: ['USD', 'EUR']
                            },
                            {
                                label: 'Стоимость',
                                type: 'input',
                                name: 'cost'
                            }
                        ]
                    },
                    {
                        title: 'Электро',
                        type: 'electro',
                        controls: [
                            {
                                label: 'Мощность двигателя, кВт',
                                type: 'input',
                                name: 'engine-power'
                            },
                            {
                                label: 'Валюта',
                                type: 'select',
                                name: 'currency',
                                options: ['USD', 'EUR']
                            },
                            {
                                label: 'Стоимость',
                                type: 'input',
                                name: 'cost'
                            }
                        ]
                    },
                    {
                        title: 'Гибрид',
                        type: 'hybrid',
                        controls: [
                            {
                                label: 'Валюта',
                                type: 'select',
                                name: 'currency',
                                options: ['USD', 'EUR']
                            },
                            {
                                label: 'Стоимость',
                                type: 'input',
                                name: 'cost'
                            }
                        ]
                    }
                ]
            },
            truckCalculator: {
                idPrefix: 'truck',
                engineTypes: [
                    {title: 'Бензин', form: 'petrol'},
                    {title: 'Дизель', form: 'diesel'}
                ],
                forms: [
                    {
                        title: 'Бензин',
                        type: 'petrol',
                        controls: [
                            {
                                label: 'Полная маса, кг',
                                type: 'select',
                                name: 'weight',
                                options: [
                                    'не более 5 т', 
                                    'более 5 т'
                                ]
                            },
                            {
                                label: 'Объем двигателя, см3',
                                type: 'input',
                                name: 'engine-volume'
                            },
                            {
                                label: 'Возраст автомобиля ',
                                type: 'select',
                                name: 'age',
                                options: [
                                    'Новый', 
                                    'В использовании до 5 лет', 
                                    'В использовании с 5 до 8 лет', 
                                    'В использовании более 8 лет'
                                ]
                            },
                            {
                                label: 'Валюта',
                                type: 'select',
                                name: 'currency',
                                options: ['USD', 'EUR']
                            },
                            {
                                label: 'Стоимость',
                                type: 'input',
                                name: 'cost'
                            }
                        ]
                    },
                    {
                        title: 'Дизель',
                        type: 'diesel',
                        controls: [
                            {
                                label: 'Полная маса, кг',
                                type: 'select',
                                name: 'weight',
                                options: [
                                    'не более 5 т', 
                                    'более 5 т, но не более 20 т', 
                                    'более 20 т'
                                ]
                            },
                            {
                                label: 'Объем двигателя, см3',
                                type: 'input',
                                name: 'engine-volume'
                            },
                            {
                                label: 'Возраст автомобиля ',
                                type: 'select',
                                name: 'age',
                                options: [
                                    'Новый', 
                                    'В использовании до 5 лет', 
                                    'В использовании с 5 до 8 лет', 
                                    'В использовании более 8 лет'
                                ]
                            },
                            {
                                label: 'Валюта',
                                type: 'select',
                                name: 'currency',
                                options: ['USD', 'EUR']
                            },
                            {
                                label: 'Стоимость',
                                type: 'input',
                                name: 'cost'
                            }
                        ]
                    }
                ]
            },
            motoCalculator: {
                idPrefix: 'moto',
                engineTypes: [
                    {title: 'Бензин', form: 'petrol'}
                ],
                forms: [
                    {
                        title: 'Бензин',
                        type: 'petrol',
                        controls: [
                            {
                                label: 'Объем двигателя, см3',
                                type: 'input',
                                name: 'engine-volume'
                            },
                            {
                                label: 'Валюта',
                                type: 'select',
                                name: 'currency',
                                options: ['USD', 'EUR']
                            },
                            {
                                label: 'Стоимость',
                                type: 'input',
                                name: 'cost'
                            }
                        ]
                    }
                ]
            },
            busCalculator: {
                idPrefix: 'bus',
                engineTypes: [
                    {title: 'Бензин', form: 'petrol'},
                    {title: 'Дизель', form: 'diesel'}
                ],
                forms: [
                    {
                        title: 'Бензин',
                        type: 'petrol',
                        controls: [
                            {
                                label: 'Объем двигателя, см3',
                                type: 'input',
                                name: 'engine-volume'
                            },
                            {
                                label: 'Возраст автомобиля ',
                                type: 'select',
                                name: 'age',
                                options: [
                                    'Новый', 
                                    'В использовании до 8 лет',
                                    'В использовании более 8 лет'
                                ]
                            },
                            {
                                label: 'Валюта',
                                type: 'select',
                                name: 'currency',
                                options: ['USD', 'EUR']
                            },
                            {
                                label: 'Стоимость',
                                type: 'input',
                                name: 'cost'
                            }
                        ]
                    },
                    {
                        title: 'Дизель',
                        type: 'diesel',
                        controls: [
                            {
                                label: 'Объем двигателя, см3',
                                type: 'input',
                                name: 'engine-volume'
                            },
                            {
                                label: 'Возраст автомобиля ',
                                type: 'select',
                                name: 'age',
                                options: [
                                    'Новый', 
                                    'В использовании до 8 лет',
                                    'В использовании более 8 лет'
                                ]
                            },
                            {
                                label: 'Валюта',
                                type: 'select',
                                name: 'currency',
                                options: ['USD', 'EUR']
                            },
                            {
                                label: 'Стоимость',
                                type: 'input',
                                name: 'cost'
                            }
                        ]
                    }
                ]
            },
            calculation: null
        }
    },
    methods: {
        closeCustomsCalculator() {
            this.$root.$emit('closecustomscalculator')
        },
        tabClick($event) {
            let activeTab = this.$refs.calculator.querySelector('.tab.active')
            activeTab.classList.remove('active')
            $event.target.classList.add('active')

            let currentTitle = $event.target.textContent
            this.activeCalculator = this.transportTabs.filter(item => item.title === currentTitle)[0].target
        }
    },
    async mounted() {
        try {
            // await this.$store.dispatch('getCurrency', new Date())
            this.$store.dispatch('getCurrentCurrency')
        } catch(e) {
            console.error(e)
        }

        this.$root.$on('calculate', data => {
            this.calculation = data

            document.querySelector('.calculator').classList.add('rotate')
        })
        this.$root.$on('returntocalculator', () => {
            document.querySelector('.calculation').classList.remove('open')

            setTimeout(() => {
                this.calculation = null
                document.querySelector('.calculator').classList.remove('rotate')
            }, 200)
        })
    }
}
</script>

<style lang="scss">
.calculator-wrap {
    position: fixed !important;
    perspective: 1200px;
    z-index: 100 !important;

    * {
        font-family: NokiaPureText_Lt, serif;
    }
}

.calculator {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(39, 49, 48, .95);
    transition: all .2s;

    &.rotate {
        transform: rotateY(90deg);
    }

    .transport-tabs {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 28px);
        display: flex;

        .tab {
            flex: 1;
            margin-right: 2px;
            padding: 5px;
            font-size: 14px;
            line-height: 18px;
            text-transform: uppercase;
            text-align: center;
            color: rgba(255, 255, 255, .7);
            background-color: rgb(61, 75, 78);
            cursor: pointer;

            &:hover {
                color: #fff;
            }

            &.active {
                color: #fff;
                background-color: transparent;
            }
        }
    }

    .calculator-content {
        width: 100%;
        height: calc(100% - 80px);
        margin: 60px auto 0;
    }

    .form-wrap {
        margin-right: 25px;
    }

    form {
        display: none;
        flex-direction: column;
        align-items: flex-end;

        &.active {
            display: flex;
        }
    }

    .form-control-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        margin-bottom: 15px;

        > * {
            width: 50%;
        }

        label {
            position: relative;
            display: block;
            padding: 5px 15px 0 5px;
            font-size: 14px;
            line-height: 18px;
            color: rgba(255, 255, 255, .7);
            text-align: right;
        }

        .form-control {
            min-height: 33px;
            background-color: rgba(0, 0, 0, .3);
            padding: 7.5px;
            color: #fff;
            font-size: 16px;
            line-height: 18px;
            text-align: center;
            border: none;

            &:focus {
                outline: none;
            }
        }

        .dropdown {
           position: relative;

           &::after {
               content: "";
               position: absolute;
               top: calc(50% - 3px);
               right: 10px;
               display: block;
               border: 4px solid transparent;
               border-top: 6px solid #fff;
           }

           .form-control {
               cursor: pointer;

               .static-text {
                   display: block;
                   position: absolute;
                   top: 10px;
                   left: 30px;
               }
           }

           .dropdown-list {
               display: none;
               position: absolute;
               top: 100%;
               left: 0;
               width: 100%;
               background-color: rgb(61, 75, 78);
               z-index: 5;

               li {
                   display: block;
                   width: 100%;
                   padding: 5px;
                   font-size: 16px;
                   line-height: 18px;
                   color: #fff;
                   text-align: center;
                   cursor: pointer;

                   &.active,
                   &:hover {
                       background-color: rgba(0,0,0,.3);
                   }

                   &.input-wrap {
                       padding: 0;

                       input {
                           width: 100%;
                           height: 28px;
                           background-color: #cc9557;
                            padding: 0 7.5px;
                            color: #fff;
                            font-size: 16px;
                            line-height: 18px;
                            border: none;

                            &::placeholder {
                                color: #fff;
                            }

                            &:focus {
                                outline: none;
                            }
                       }
                   }
               }
           }

           &.open {
               .dropdown-list {
                   display: block;
               }
           }
        }

        .checkbox {
            width: 18px;
            height: 18px;
            margin-top: 5px;
            padding: 2px;
            background-color: rgba(255, 255, 255, .5);
            cursor: pointer;

            img {
                display: none;
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            &.checked img {
                display: block;
            }
        }

        .btn-input {
            text-transform: uppercase;
        }
    }

    button[type="submit"] {
        margin-top: 10px;
    }
}

.calculator-bg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .98;
    filter: blur(2px);
    z-index: -1;
}

.calculation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(39, 49, 48, .95);
    z-index: 2;
    transition: all .2s;
    transform: rotateY(-90deg);

    &.open {
        transform: rotateY(0);
    }

    .back-to-calc {
        position: absolute;
        top: 0;
        left: 0;
        padding: 7px 15px;
        color: rgba(255, 255, 255, 0.7);
        background-color: rgba(0, 0, 0, 0.3);
        border: none;
        cursor: pointer;

        img {
            display: block;
            height: 14px;
            width: auto;
            opacity: .7;
        }
    }

    .calculation-content {
        width: 100%;
        height: calc(100% - 90px);
        margin: 40px auto 0;
    }

    .tables-wrap {
        width: calc(100% - 40px);
        min-width: 450px;
        margin: 0 28px 0 12px;
    }

    table {
        width: 100%;

        tr {
            display: flex;
            justify-content: space-between;
            padding-bottom: 5px;

            td {
                width: calc(62% / 3);
                padding: 5px;
                font-size: 14px;
                line-height: 18px;
                color: rgba(255, 255, 255, .7);
                text-align: center;

                &.table-title {
                    width: 38% !important;
                    padding-right: 15px;
                    font-size: 13px;
                    text-transform: uppercase;
                    color: #cc9557;
                    text-align: left;
                }

                &.title {
                    width: 38% !important;
                    padding-right: 15px;
                    background-color: transparent;
                    text-align: right;
                }

                &.result {
                    width: auto;
                    background-color: #cc9557;
                }

                &.input-wrap {
                    padding: 0;
                    background: transparent;

                    .message-invalid {
                        margin: 5px 0;
                    }
                }
            }

            &.three-columns {
                td {
                    width: calc(62% / 2);
                }
            }
        }

        thead {
            display: block;
            padding-bottom: 10px;

            tr {
                border-bottom: 1px solid rgba(255, 255, 255, .1);

                td {
                    font-size: 12px;
                }
            }
        }

        tbody td {
            background-color: rgba(0, 0, 0, 0.3);
        }

        &.data-info {
            td {
                width: 62%;

                &.title {
                    width: 38%;
                }
            }
        }
    }    

    .result-row {
        margin-top: 10px;
    }

    .date-input {
        width: 100%;
        height: 28px;
        font-size: 14px;
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
        background-color: rgba(0, 0, 0, 0.3);
        border: none;
        cursor: pointer;
        transition: all .3s;

        &::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        &:focus {
            outline: none;
            color: #fff;
            background-color: rgba(204, 149, 87, 1);

            &::placeholder {
                color: rgba(255, 255, 255, 0.9);
            }
        }

        &.error {
            border: 2px solid #b04e50;

            &:focus {
                color: #b04e50;
            }
        }
    }

    .button-wrap {
        margin-top: 10px;
        text-align: right;
    }

    .send-button {
        position: absolute;
        right: 25px;
        bottom: 15px;
        padding: 5px;
        font-size: 14px;
        line-height: 18px;
        color: #fff;
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            color: #cc9557;
        }
    }
}

@media screen and (max-width: 992px) {
    .calculator-wrap {
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
    }
}

@media screen and (max-width: 500px) {
    .calculator {
        .transport-tabs {
            .tab {
                font-size: 12px;
            }
        }

        .form-control-wrap {
            margin-bottom: 10px;

            label {
                font-size: 12px;
            }

            .form-control {
                    min-height: 21px;
                    padding: 5px;
                    font-size: 14px;
                    line-height: 16px;
            }

            .dropdown {
                .dropdown-list {
                    li {
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>