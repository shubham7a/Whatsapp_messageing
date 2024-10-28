// backend/routes/whatsapp.js
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

require("dotenv").config();

const Port=process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
  origin: "*",
}
));

// Replace with your WhatsApp Business API Access Token
const WHATSAPP_TOKEN = process.env.Token;
const PHONE_NUMBER_ID = process.env.Phone;

app.post("/send-message", async (req, res) => {
    const { phone, message } = req.body;
    console.log(phone, message);
    
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: "91"+phone,
                type: "text",
                text: { body: message },
            },
            {
                headers: {
                    "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        
        res.status(200).json(response.data);
        console.log(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response.data });
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(Port, () => {
    console.log(`Server is running on port  ${Port} `);
});
