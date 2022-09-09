const express = require('express');
const app = express();

app.use('/',(req, res, mid) => {
    res.send({status: 200,msg: "Hello world!"});
})

app.listen(3000,() => {
    console.log('Server listening on 3000...');
});