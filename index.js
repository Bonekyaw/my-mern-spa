const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {User} = require('./models/user');

mongoose.connect(config.mongoURI,{useNewUrlParser:true,useUnifiedTopology: true})
            .then(() => console.log("DB Connected"))
            .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err,userDate) => {
        if(err) return res.json({success:false,err});
    });
    return res.status(200).json({success:true});
});

app.get('/', (req, res) => {
    res.send("Hello Express");
});

app.listen(5000, () => {
    console.log('App listening on port 5000!');
});