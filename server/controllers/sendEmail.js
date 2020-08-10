const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

module.exports = (newUser) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { email } = newUser;
  let emailSign = "";
  jwt.sign({email: email }, process.env.SECRET_KEY, (err, token) => {
    if (!err) {
      emailSign = token;
      const url = `http://localhost:6969/register/confirmation/${emailSign}`;
      console.log(url);
      const msg = {
        to: email,
        from: 'ukthitayeumi@gmail.com',
        subject: 'Confirm account',
        html: `Please confirm your email for app chat in: <a href='${url}'>Link</a>`,
      };
     
      sgMail.send(msg)
        .then(() => {
          console.log('Message sent')
        })
        .catch((error) => {
          console.log(error.response.body);
        })
      return;
    }
    console.log(err);
  });
} 

