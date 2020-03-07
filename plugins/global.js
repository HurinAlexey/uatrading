import Vue from 'vue'

const months = [
    'Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'
]

Vue.filter('date', value => {
    let year = String(value.getFullYear())
    let month = months[value.getMonth()].toLowerCase()
    let day = String(value.getDate())
    if (day.length === 1) day = '0' + day
    let date = day + ' ' + month + ' ' + year
    return date
})

Vue.filter('float', (value, num) => {
    let result = Number(value).toFixed(num)
    if (String(result).endsWith('.00')) result = Math.round(result)
    return result
})