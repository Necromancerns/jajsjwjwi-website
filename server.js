const express = require('express');
const path = require('path');
const xnxx = require('xnxx-scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Tampilkan halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint untuk pencarian
app.post('/search', async (req, res) => {
  const { keyword } = req.body;
  try {
    const response = await xnxx.search(keyword || 'squirt');
    const results = Array.isArray(response.result)
      ? response.result.slice(0, 20)
      : [];
    res.json({ success: true, results });
  } catch (err) {
    console.error('xnxx-scraper error:', err);
    res.json({ success: false, message: 'Gagal mengambil data dari xnxx-scraper.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});