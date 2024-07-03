const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsConfig));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Naiem Hasan Website Server Is Running");
});

app.post(`/api/contact`, async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configure your email transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // use your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: subject,
    text: `Name: ${name}\nSubject: ${subject}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);

    res.status(200).send({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send the message" });
  }
});

app.listen(port, () => {
  console.log(`Naiem Hasan Website Server Is Running on port: ${port}`);
});
