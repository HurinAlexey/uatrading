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

register = async (data) => {
  const candidate = await User.findOne({login: data.login})

  if (candidate) {
    console.error('Такой login уже занят')
  } else {
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      login: data.login,
      password: bcrypt.hashSync(data.password, salt)
    })

    await user.save()
    console.log(`Пользователь ${data.login} успешно создан!`)
  }  
}


register({login, password}).then(() => {
  process.exit()
})