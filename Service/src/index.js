const express = require('express');
const app = express();
const port = 55555;
const cors = require('cors');
app.use(cors());


const {getAddress} = require("./controller");

app.get('/', getAddress);

app.listen(port, () => console.log(`Steelseries api finder listening on port ${port}!`));
