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
            @submit.stop.prevent="onSubmit($event)"
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
                v-if="delivery && (data.idPrefix !== 'bus')"
                class="form-control-wrap"
            >
                <label>Расчет доставки с США</label>
                <div class="checkbox-wrap">
                    <div class="checkbox" @click="onCheck($event, 'showDelivery')">
                        <input type="checkbox" name="delivery" class="display-n" />
                        <img src="images/check.png" alt="check">
                    </div>
                </div>
            </div>

            <div v-if="showDelivery" class="delivery-calculator w100">

                <div class="form-control-wrap">
                    <label>{{auction.label}}</label>
                    <div class="dropdown">
                        <input type="hidden" :name="auction.name" :value="activeAuction" ref="activeAuction" />
                        <div class="form-control" @click="toggleDropdown($event)">
                            {{activeAuction}}
                        </div>
                        <ul class="dropdown-list">
                            <li
                                v-for="(option, index) of auction.options"
                                :key="index"
                                :class="{'active': activeAuction === option}"
                                @click="changeAuction($event)"
                            >{{option}}</li>
                        </ul>
                    </div>
                </div>

                <div class="form-control-wrap">
                    <label>Доставка по США: от</label>
                    <div class="dropdown">
                        <input type="hidden" name="delivery-from" :value="activeDeliveryFrom['Auction Location']" />
                        <div class="form-control" @click="toggleDropdown($event)" id="delivery-from-control">
                            {{activeDeliveryFrom['Auction Location']}}
                        </div>
                        <ul class="dropdown-list">
                            <li class="input-wrap">
                                <input 
                                    type="text" 
                                    v-model="filterInput" 
                                    name="search"
                                    placeholder="Поиск..."
                                    @input="filterAuctions" 
                                />
                            </li>
                            <li
                                v-for="(option, index) of deliveryFromListFiltered"
                                :key="index"
                                :class="{'active': activeDeliveryFrom['Auction Location'] === option['Auction Location']}"
                                @click="changeDeliveryFrom($event)"
                            >{{option['Auction Location']}}</li>
                        </ul>
                    </div>
                </div>

                <div class="form-control-wrap">
                    <label>до</label>
                    <div v-if="deliveryFromListFiltered.length > 0" class="dropdown">
                        <input type="hidden" name="delivery-to" :value="activeDeliveryTo.port" />
                        <input type="hidden" name="delivery-cost" :value="activeDeliveryTo.cost" />
                        <div class="form-control" @click="toggleDropdown($event)" id="delivery-to-control">
                            {{activeDeliveryTo.port}} - <span class="cost">{{activeDeliveryTo.cost}} $</span>
                        </div>
                        <ul class="dropdown-list">
                            <li
                                v-for="(option, index) of deliveryToList"
                                :key="index"
                                :class="{'active': activeDeliveryTo.port === option.port}"
                                @click="changeDeliveryTo($event)"
                            >{{option.port}} - {{option.cost}} $</li>
                        </ul>
                    </div>
                </div>

                <div class="form-control-wrap">
                    <label>{{deliveryPorts.label}}</label>
                    <div class="dropdown">
                        <input type="hidden" :name="deliveryPorts.name" :value="activeDeliveryPort" />
                        <div class="form-control" @click="toggleDropdown($event)">{{activeDeliveryPort}}</div>
                        <ul class="dropdown-list">
                            <li
                                v-for="(option, index) of deliveryPorts.options"
                                :key="index"
                                :class="{'active': activeDeliveryPort === option}"
                                @click="changeDeliveryPort($event)"
                            >{{option}}</li>
                        </ul>
                    </div>
                </div>

                <div v-if="activeDeliveryPort === 'Одесса – Украина'" class="form-control-wrap">
                    <label>Доставка Одесса - Киев</label>
                    <div class="checkbox-wrap">
                        <div class="checkbox" :class="{'checked': deliveryOdessaKiev}" @click="deliveryOdessaKiev = !deliveryOdessaKiev">
                            <img src="images/check.png" alt="check">
                        </div>
                    </div>
                </div>

                <div v-if="activeDeliveryPort === 'Клайпеда – Литва'" class="form-control-wrap">
                    <label>Доставка Клайпеда - Киев</label>
                    <div class="checkbox-wrap">
                        <div class="checkbox" :class="{'checked': deliveryKlaypedaKiev}" @click="deliveryKlaypedaKiev = !deliveryKlaypedaKiev">
                            <img src="images/check.png" alt="check">
                        </div>
                    </div>
                </div>

                <div class="form-control-wrap">
                    <label>Сертификация автомобиля</label>
                    <div class="checkbox-wrap">
                        <div class="checkbox" @click="onCheck($event, 'carCertification')">
                            <input type="checkbox" name="delivery" class="display-n" />
                            <img src="images/check.png" alt="check">
                        </div>
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
        const auction = {
            label: 'Аукцион',
            name: 'auction',
            options: [
                'IAAI', 
                'Copart'
            ]
        }

        const ports = ['Savannah, GA', 'Newark, NJ', 'Los Angeles, CA', 'Indianapolis, IN', 'Houston, TX']
        const deliveryToList = []
        for (let item of ports) {
            deliveryToList.push({port: item, cost: 0})
        }

        const deliveryPorts = {
            label: 'Порт доставки',
            name: 'deliveryPort',
            options: [
                'Одесса – Украина', 
                'Клайпеда – Литва'
            ]
        }

        return {
            errorMessage: '',
            showDelivery: false,
            auction,
            activeAuction: auction.options[0],
            transportation: [],
            deliveryFromList: [],
            deliveryFromListFiltered: [],
            filterInput: '',
            activeDeliveryFrom: {
                'Auction Location': ''
            },
            ports,
            deliveryToList,
            activeDeliveryTo: deliveryToList[0],
            deliveryPorts,
            activeDeliveryPort: '',
            deliveryOdessaKiev: false,
            deliveryKlaypedaKiev: false,
            carCertification: false
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

            let activeOption = target.parentElement.querySelector('.active')
            if (activeOption) activeOption.classList.remove('active')
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
        onCheck($event, model) {
            let target = $event.target.closest('.checkbox')
            let input = target.getElementsByTagName('input')[0]
            if (input.checked) {
                target.classList.remove('checked')
                input.checked = false
                this[model] = false
            } else {
                target.classList.add('checked')
                input.checked = true
                this[model] = true
            }
        },
        changeAuction($event) {
            $event.target.closest('.dropdown').classList.remove('open')
            this.activeAuction = $event.target.textContent
            this.deliveryFromList = this.transportation.filter(item => item['Auction'] === this.activeAuction)
            this.deliveryFromListFiltered = this.deliveryFromList            
            this.filterInput = ''

            this.activeDeliveryFrom = this.deliveryFromList[0]
            let deliveryFromElem = $event.target.closest('form').querySelector('input[name="delivery-from"]')
            deliveryFromElem.value = this.deliveryFromList[0]['Auction Location']

            let toList = []
            for (let item of this.ports) {
                if (this.activeDeliveryFrom[item]) {
                    toList.push({port: item, cost: this.activeDeliveryFrom[item]})
                }
            }
            this.deliveryToList = toList
            this.activeDeliveryTo = toList[0]
        },
        changeDeliveryFrom($event) {
            $event.target.closest('.dropdown').classList.remove('open')
            let targetTitle = $event.target.textContent
            this.activeDeliveryFrom = this.transportation.find(item => item['Auction Location'] === targetTitle)

            let toList = []
            for (let item of this.ports) {
                if (this.activeDeliveryFrom[item]) {
                    toList.push({port: item, cost: this.activeDeliveryFrom[item]})
                }
            }
            this.deliveryToList = toList
            this.activeDeliveryTo = toList[0]
        },
        changeDeliveryTo($event) {
            $event.target.closest('.dropdown').classList.remove('open')
            let targetText = $event.target.textContent
            this.activeDeliveryTo = this.deliveryToList.find(item => targetText.indexOf(item.port) !== -1)
        },
        changeDeliveryPort($event) {
            $event.target.closest('.dropdown').classList.remove('open')
            this.activeDeliveryPort = $event.target.textContent
        },
        filterAuctions() {
            this.deliveryFromListFiltered = this.deliveryFromList.filter(item => {
                let itemLocation = item['Auction Location'].toLowerCase()
                return itemLocation.includes(this.filterInput.toLowerCase())
            })
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
                if (control.name === 'search') continue

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

            if (this.showDelivery) {
                let delivery = {
                    auction: this.activeAuction,
                    from: this.activeDeliveryFrom['Auction Location'],
                    to: this.activeDeliveryTo.port,
                    cost: this.activeDeliveryTo.cost,
                    port: this.activeDeliveryPort,
                    odessaKiev: this.activeDeliveryPort === 'Одесса – Украина' && this.deliveryOdessaKiev,
                    klaypedaKiev: this.activeDeliveryPort === 'Клайпеда – Литва' && this.deliveryKlaypedaKiev,
                    certification: this.carCertification
                }
                data.delivery = delivery
            }

            this.setErrorMessage('')

            this.$root.$emit('calculate', data)
        }
    },
    async mounted() {
        const jsonData = await this.$store.dispatch('calculator/getData', 'transportation')
        this.transportation = jsonData.data
        this.deliveryFromList = this.transportation.filter(item => item['Auction'] === this.activeAuction)
        this.deliveryFromListFiltered = this.deliveryFromList
        this.activeDeliveryFrom = this.deliveryFromList[0]

        let toList = []
        for (let item of this.ports) {
            if (this.activeDeliveryFrom[item]) {
                toList.push({port: item, cost: this.activeDeliveryFrom[item]})
            }
        }
        this.deliveryToList = toList
        this.activeDeliveryTo = toList[0]

        document.onclick = (e) => {
            let dropdown = e.target.closest('.dropdown')

            let dropdownArray = document.querySelectorAll('.dropdown.open')
            for (let el of dropdownArray) {
                if (el != dropdown) {
                    el.classList.remove('open')
                }
            }
        }
    }
}
</script>