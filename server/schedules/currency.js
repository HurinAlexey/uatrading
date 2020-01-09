const path = require('path')
const fs = require('fs')
const schedule = require('node-schedule')
const axios = require('axios')

module.exports.start = () => {
    schedule.scheduleJob('*/15 3-9 * * *', async () => {
        try {
            let date = new Date()
            let year = String(date.getFullYear())
            let month = String(date.getMonth() + 1)
            if (month.length === 1) month = '0' + month
            let day = String(date.getDate())
            if (day.length === 1) day = '0' + day
            let dateString = year + month + day
            const eurData = await axios.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=${dateString}&json`)
            const usdData = await axios.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${dateString}&json`)
            if (eurData.data.length === 0 || usdData.data.length === 0) {
              let error = new Error('Нет данных для указаной даты.')
              console.error(error)
            } else {
              const eurRate = eurData.data[0].rate
              const usdRate = usdData.data[0].rate
              const currency = {
                'USD': usdRate,
                'EUR': eurRate
              }

              const data = JSON.stringify(currency)
              const jsonPath = path.resolve(__dirname, `../../static/json/currency.json`)
              fs.writeFile(jsonPath, `{"data": ${data}}`, error => {
                if(error) throw error
                console.log("Данные о курсе валют обновлены.")
            })
            }
          } catch (e) {
            console.error(e)
          }
    })
}