const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static("static"))
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '../static/index.html');
});

app.post('/', (req, res) => {
    const { name, email, message, subject, number} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., Gmail
        auth: {
            user: 'bansalujjwal1810@gmail.com',
            pass: 'efaxlqdrvfvhpxny'}
            
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
            res.redirect('/?status=fail');
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/?status=success')
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
