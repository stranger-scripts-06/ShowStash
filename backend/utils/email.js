const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, pdfBuffer }) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: "Please find your booking confirmation attached.",
        attachments: [
            {
                filename: "Booking_Confirmation.pdf",
                content: pdfBuffer,
            },
        ],
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
