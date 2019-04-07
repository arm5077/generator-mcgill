const express = require('express');
const app = express();

app.use(express.static('dist'));
app.listen(process.env.PORT || 61386, () => console.log(`Listening on port ${process.env.PORT || 61386}!`));