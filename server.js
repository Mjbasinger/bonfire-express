const express = require('express');
const app = express();
const port = proccess.env.PORT;


// Index route
app.get('/', (req, res) => {
    res.send('hewwo');
});

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});