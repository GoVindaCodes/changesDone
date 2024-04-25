import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import CustomerServices from "services/CustomerServices";
import { notifySuccess } from "utils/toast";

const ComposeEmail = ({ recipientEmail, onClose, user }) => {
    const params = useParams();
    const history = useHistory();
    const [to, setTo] = useState(recipientEmail);
    const [from, setFrom] = useState("");
    const [subject, setSubject] = useState("");
    const [additionalHeaders, setAdditionalHeaders] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const [error, setError] = useState("");
    // console.log("hi: ", params)
    const handleClose = () => {
        history.push("/customers");
        // onClose();
    };



    const handleSendEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            setError("Please enter a valid email address for the recipient.");
            return;
        }

        // Construct the email data object
        const emailData = {
            to,
            from,
            subject,
            additionalHeaders,
            messageBody
        };

        try {
            // Call the sendEmail function from CustomerServices
            await CustomerServices.sendEmail(emailData);
            console.log("Email sent successfully!");
            notifySuccess('Email sent successfully!');
            // Reset form fields and close compose email window
            setTo("");
            setFrom("");
            setSubject("");
            setAdditionalHeaders("");
            setMessageBody("");
            setError(""); // Clear any previous error messages
            // onClose(); // Close the compose email window
        } catch (error) {
            console.error("Error sending email:", error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div className="bg-white rounded-md p-4 w-80">
            {/* <p>User ID: {userId}</p> */}
            <h2 className="text-lg font-semibold mb-4">Compose Email</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-4">
                <label htmlFor="to" className="block font-semibold mb-1">To:</label>
                <input type="email" id="to" value={to} onChange={(e) => setTo(e.target.value)} className="w-full border rounded-md p-2" />
            </div>
            <div className="mb-4">
                <label htmlFor="from" className="block font-semibold mb-1">From:</label>
                <input type="email" id="from" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full border rounded-md p-2" />
            </div>
            <div className="mb-4">
                <label htmlFor="subject" className="block font-semibold mb-1">Subject:</label>
                <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border rounded-md p-3" />
            </div>
            <div className="mb-4">
                <label htmlFor="additionalHeaders" className="block font-semibold mb-1">Additional Headers:</label>
                <textarea id="additionalHeaders" value={additionalHeaders} onChange={(e) => setAdditionalHeaders(e.target.value)} className="w-full border rounded-md p-2" rows="2"></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="messageBody" className="block font-semibold mb-1">Message Body:</label>
                <textarea id="messageBody" value={messageBody} onChange={(e) => setMessageBody(e.target.value)} className="w-full border rounded-md p-2" rows="6"></textarea>
            </div>
            <button onClick={handleSendEmail} className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">Send Email</button>
            <button onClick={handleClose} className="bg-red-500 ml-2 rounded-md py-2 px-4 text-white hover:bg-red-600 focus:outline-none">Close</button>
        </div>
    );
};

export default ComposeEmail;
