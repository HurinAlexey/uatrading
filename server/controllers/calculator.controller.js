const path = require('path')
const fs = require('fs')
const XLSX = require('xlsx')

module.exports.uploadXlsTable = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, '../../static/xls/', req.file.filename)
    const workbook = XLSX.readFile(filePath)
    const sheet_name_list = workbook.SheetNames
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    const data = JSON.stringify(jsonData)
    const jsonPath = path.resolve(__dirname, `../../static/json/${req.body.title}.json`)
    fs.writeFile(jsonPath, `{"data": ${data}}`, error => {
        if(error) throw error
        console.log("Асинхронная запись файла завершена.")
    })
    res.status(201).json({message: 'Данные успешно загружены!'})
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getJsonData = async (req, res) => {
  try {
    const jsonPath = path.resolve(__dirname, `../../static/json/${req.params.title}.json`)
    fs.readFile(jsonPath, 'utf8', (error, data) => {
      console.log("Асинхронное чтение файла")
      if(error) throw error
      let result = JSON.parse(data)
      res.status(200).json(result)
    })
    
  } catch (e) {
    res.status(500).json(e)
  }
}