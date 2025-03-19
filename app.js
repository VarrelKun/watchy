const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/drama/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'detail.html'));
});

app.get('/proxy', (req, res) => {
    const videoUrl = req.query.url;
    res.redirect(`https://playeriframe.lol/?url=${encodeURIComponent(videoUrl)}`);
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
