import nodemailer from 'nodemailer'
import config from 'config'

export const sendConfirmedEmail = async (
  email: string,
  password: string,
  conf: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('email'),
        pass: config.get('password'),
      },
    })

    await transporter.sendMail({
      from: `"Регистрация на сайте" <${config.get('email')}>`,
      to: email,
      subject: 'Регистрация на сайте',
      html: `
        <h3>Подтверждение email</h3>
        <p>Данные вашей учетной записи:</p>
        <ul>
            <li>email: ${email}</li>
            <li>password: ${password}</li>
        </ul>
        <p>Чтобы подтвердить email 
        <a href="${config.get(
          'serverURL'
        )}/confirmed/${conf}">нажмите сюда</a><p>`,
    })
  } catch (e) {
    console.log(e)
  }
}

export const validateEmail = (email: string) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
