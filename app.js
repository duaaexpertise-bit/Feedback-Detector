const express = require('express');
const path = require('path');
const app = express();

// 1. Static files serve karo - index.html, CSS, JS
app.use(express.static(path.join(__dirname)));

// 2. Home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
