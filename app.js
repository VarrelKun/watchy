const express = require('express');
const path = require('path');
const cors = require('cors');
const request = require("request");
const axios = require("axios");
const cheerio = require("cheerio");

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

app.get("/proxy", (req, res) => {
    let url = req.query.url;
    if (!url) return res.status(400).send("Missing URL");
    // Set header untuk menghindari pembatasan CORS dan X-Frame-Options
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Frame-Options", "ALLOWALL");

    request({ url, headers: { "Origin": "nilo.my.id" } }).pipe(res);
});


app.get("/bypass", async (req, res) => {
    let url = req.query.url;
    if (!url) return res.status(400).send("Missing URL");

    try {
        let response = await axios.get(url);
        let $ = cheerio.load(response.data);

        // Hapus script iklan & overlay
        $("script[src*='lk21static.buzz']").remove();
        $("script[src*='organicowner.com']").remove();
        $("script").filter((i, el) => $(el).html().includes("adsPlay")).remove();
        $("#overlay, #admad, #player-lux").remove();

        res.send($.html());
    } catch (error) {
        res.status(500).send("Error fetching the URL");
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
