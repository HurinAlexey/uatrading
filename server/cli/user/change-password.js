const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const User = require('../../models/User')
const keys = require('../../keys')

let login = process.argv[2]
let password = process.argv[3]

if (password.length < 6) {
  console.error('Пароль не должен быть меньше 6!')
  process.exit()
}

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

changePassword = async (data) => {
    const salt = bcrypt.genSaltSync(10)
    const $set = {
        password: bcrypt.hashSync(data.password, salt)
    }
    try {
        await User.findOneAndUpdate({
            login: data.login
        }, {$set}, {new: true})
        console.log('Пароль успешно изменен!')
    } catch (err) {
        console.error(err)
    }
}


changePassword({login, password}).then(() => {
  process.exit()
})