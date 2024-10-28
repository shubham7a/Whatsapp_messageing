
import React, { useState } from "react";
import axios from "axios";

const WhatsAppBox = () => {
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const handleSendMessage = async () => {
        try {
            const response = await axios.post("http://localhost:4000/send-message", {
                phone,
                message,
            });
            setResponse("Message sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            setResponse("Failed to send message");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5">
            <h3 className="text-3xl font-bold mb-5">Send WhatsApp Message</h3>
            <input
                type="text"
                placeholder="Customer Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 border mb-3 rounded w-full max-w-md"
            />
            <textarea
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-2 border mb-3 rounded w-full max-w-md"
            ></textarea>
            <button onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded">Send Message</button>

              {response && <p className="mt-5">{response}</p>}
        </div>
    );
};

export default WhatsAppBox;
