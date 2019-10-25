const mongoose = require('mongoose')
const User = require('../../models/User')
const keys = require('../../keys')

let login = process.argv[2]

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

remove = async (login) => {
    const user = await User.findOne({login})
  
    if (!user) {
      console.error(`Пользователь ${login} не найден!`)
    } else {  
      await user.remove()
      console.log(`Пользователь ${login} успешно удален!`)
    }
}

remove(login).then(() => {
    process.exit()
}).catch(err => {
    console.error(err)
    process.exit()
})