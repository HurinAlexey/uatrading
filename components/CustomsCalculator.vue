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
            <img src="images/blur-schema-usa.jpg" alt="calculator bg" class="calculator-bg">
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
                <app-calculator-form :class="{'display-n': activeCalculator !== 'passenger-calculator'}" :data="passengerCalculator" />
                <app-calculator-form :class="{'display-n': activeCalculator !== 'truck-calculator'}" :data="truckCalculator" />
                <app-calculator-form :class="{'display-n': activeCalculator !== 'moto-calculator'}" :data="motoCalculator" />
                <app-calculator-form :class="{'display-n': activeCalculator !== 'bus-calculator'}" :data="busCalculator" />
            </div>
        </div>

        <app-calculation v-if="calculation" :data="calculation" class="calculation" />
    </vue-draggable-resizable>
</template>

<script>
import AppCalculatorForm from '@/components/CalculatorForm.vue'
import AppCalculation from '@/components/Calculation.vue'

export default {
    components: {
        AppCalculatorForm,
        AppCalculation
    },
    data() {
        return {
            dragOptions: {
                w: 600,
                h: 600,
                draggable: true,
                resizable: false
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
    mounted() {
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
    padding-bottom: 20px;
    perspective: 1200px;
    z-index: 100 !important;
}

.calculator {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all .2s;

    &.rotate {
        transform: rotateY(90deg);
    }

    .transport-tabs {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 30px);
        display: flex;

        .tab {
            flex: 1;
            margin: 0 1px;
            padding: 5px;
            font-size: 14px;
            line-height: 18px;
            text-transform: uppercase;
            text-align: center;
            color: rgba(255, 255, 255, .7);
            background-color: rgba(0, 0, 0, .3);
            cursor: pointer;

            &.active {
                color: #fff;
                background-color: transparent;
            }
        }
    }

    .calculator-content {
        width: calc(100% - 40px);
        height: 100%;
        margin: 60px auto 0;
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
            background-color: rgba(255, 255, 255, .5);
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
               z-index: 5;

               li {
                   display: block;
                   width: 100%;
                   padding: 5px;
                   font-size: 16px;
                   line-height: 18px;
                   background-color: #333;
                   color: #fff;
                   text-align: center;
                   cursor: pointer;

                   &.active,
                   &:hover {
                       background-color: #fff;
                       color: #333;
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
    padding: 50px 20px 20px;
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

    table {
        width: 100%;

        tr {
            display: flex;
            justify-content: space-between;
            padding-bottom: 5px;

            td {
                width: calc(70% / 3);
                padding: 5px;
                font-size: 14px;
                line-height: 18px;
                color: rgba(255, 255, 255, .7);
                text-align: center;

                &.table-title {
                    width: 30%;
                    padding-right: 15px;
                    font-size: 13px;
                    text-transform: uppercase;
                    color: #b04e50;
                    text-align: left;
                }

                &.title {
                    width: 30%;
                    padding-right: 15px;
                    background-color: transparent;
                    text-align: right;
                }

                &.result {
                    width: auto;
                    background-color: #cc9557;
                }
            }
        }

        thead {
            display: block;
            padding-bottom: 10px;

            tr {
                border-bottom: 1px solid rgba(255, 255, 255, .7);

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
                width: 65%;

                &.title {
                    width: 35%;
                }
            }
        }
    }    
}
</style>