// const express = require('express');
// const app = express();
// const PORT = 8000;

// app.get('/get-data', (req, res) => {
//     res.json({ v: [100, 200, 300, 400, 500] });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Serve static files (HTML, CSS, JS) from the current directory
app.use(express.static(path.join(__dirname)));

// API endpoint to get random data
app.get('/get-data', (req, res) => {
    const randomValues = Array.from({ length: 5 }, () => Math.floor(Math.random() * 1000));
    res.json({ v: randomValues });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
