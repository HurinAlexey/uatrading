const nodemailer = require('nodemailer')
const path = require('path')
const Email = require('email-templates')


const smtpOptions = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ukrbroktrading.host@gmail.com',
        pass: 'foxtrottango'
    },
    tls: {
        rejectUnauthorized: false
    }
}


module.exports.sendCallbackMail = (req, res) => {
    try {
        const transporter = nodemailer.createTransport(smtpOptions)

        const mailOptions = {
            from: 'ukrbroktrading.host@gmail.com',
            to: 'tanatosvii@gmail.com',
            subject: 'UBTrading - Callback',
            text: `Пользователь ${req.body.name} просит Вас перезвонить по номеру ${req.body.phone}.`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json(error)
            } else {
                res.status(200).json({
                    message: 'Письмо успешно отправлено!'
                })
            }
        })

    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.sendCalculation = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport(smtpOptions)
        const email = new Email({
            message: {
                from: 'ukrbroktrading.host@gmail.com'
            },
            transport: transporter
        })
        const templatePath = path.resolve(__dirname, '../../assets/email-templates/calculation')

        await email.send({
            template: templatePath,
            message: {
                to: req.body.email,
                subject: 'UBTrading - Расчеты таможенного калькулятора'
            },
            locals: {
                data: req.body.message
            },
            send: true
        })
        .then(() => {
            res.status(200).json({
                message: 'Письмо успешно отправлено!'
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })

        // const transporter = nodemailer.createTransport(smtpOptions)
        // const templatePath = path.resolve(__dirname, '../../assets/email-templates/calculation')
        // let sendCalculationTemplate = transporter.templateSender(new EmailTemplate(templatePath), {
        //     from: 'ukrbroktrading.host@gmail.com'
        // })
        
        // sendCalculationTemplate({
        //     to: req.body.email,
        //     subject: 'UBTrading - Расчеты таможенного калькулятора',
        // }, {
        //     data: req.body.message
        // }, (error, info) => {
        //     if (error) {
        //         res.status(500).json(error)
        //     } else {
        //         res.status(200).json({
        //             message: 'Письмо успешно отправлено!'
        //         })
        //     }
        // })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}