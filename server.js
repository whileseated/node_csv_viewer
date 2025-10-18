const express = require('express');
const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CSV/TSV Viewer server is running on http://localhost:${PORT}`);
});
