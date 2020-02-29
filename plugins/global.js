import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', value => {
    let year = String(value.getFullYear())
    let month = String(value.getMonth() + 1)
    if (month.length === 1) month = '0' + month
    let day = String(value.getDate())
    if (day.length === 1) day = '0' + day
    let date = year + month + day
    return moment(date).locale('uk').format('DD MMMM YYYY')
})

Vue.filter('float', (value, num) => {
    let result = Number(value).toFixed(num)
    if (String(result).endsWith('.00')) result = Math.round(result)
    return result
})