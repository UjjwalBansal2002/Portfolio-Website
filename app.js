const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static("static"))
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const { name, email, message, subject, number} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., Gmail
        auth: {
            user: 'bansalujjwal2002@gmail.com',
            pass: 'mvtw ihbv msxp uwlk'}
    });

    const mailOptions = {
        from: email,
        to: 'bansalujjwal1810@gmail.com', // Your email address
        subject: `${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMobile Number: ${number}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully.');
            // res.redirect('/')
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
