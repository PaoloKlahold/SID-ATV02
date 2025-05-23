const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const items = require('./items.json');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the backend API!');
});


app.get('/api/items', (req, res) => {
    res.json({ items });
});

app.post('/api/item', (req, res) => {
    const { name } = req.body;
    const price = (Math.random() * 100).toFixed(2);
    res.json({ name, price });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});