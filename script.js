// Simple mock API to simulate adoption inquiries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock data
const inquiries = [];

// Routes
app.get('/api/inquiries', (req, res) => {
    res.json({ success: true, data: inquiries });
});

app.post('/api/inquiries', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required!' });
    }

    const newInquiry = { id: inquiries.length + 1, name, email, message, date: new Date() };
    inquiries.push(newInquiry);

    res.status(201).json({ success: true, message: 'Inquiry submitted successfully!', data: newInquiry });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
