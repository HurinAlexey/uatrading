const nodemailer = require('nodemailer')


module.exports.send = (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'hurinalex@gmail.com',
                pass: 'r2d2k911lol'
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const mailOptions = {
            from: 'hurinalex@gmail.com',
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
};