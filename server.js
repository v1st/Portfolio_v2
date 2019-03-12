const express = require('express');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const EMAIL = require('./config/keys');

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);

// EJS view engine
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// BodyParser middleware
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Server static files
app.use('/src', express.static(path.join(__dirname, '/src')));

app.get('/', (req, res) => {
  // Serve html to user
  res.render('index');
});

// Post request for contact form
app.post('/contact', (req, res) => {
  const smtpTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL.USER,
      pass: EMAIL.PASS,
    },
    tls: {
      rejectUnautherized: false,
    },
  });

  const mailOpts = {
    from: `${req.body.name}&lt;${req.body.email}&gt;`,
    to: EMAIL.MY_ACCOUNT,
    subject: 'New message from portfolio form',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
  };

  smtpTransporter.sendMail(mailOpts, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: %s', info.messageId);
      res.render('index', { msg: 'Email has been sent!' });
    }
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('src'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'views', 'index.ejs'));
  });
}

app.listen(port, () => { console.log('Server started'); });
