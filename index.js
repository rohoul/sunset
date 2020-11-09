const express = require('express')
const app = express()
const port = 3000

const config = require('./config/key');

const bodyParser = require('body-parser');
const {User} = require("./models/User");

// bodyParser 옵션
// body-parser : 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해주는 것

// 1) application/x-www-form-urlencoded 분석해서 가져오는 것
app.use(bodyParser.urlencoded({extended: true}));
// 2) application/json 타입으로 된 것을 분석해서 가져오는 것
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex: true, useFindAndModify:false
}).then(()=> console.log('MongoDB Connected..!'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요~ 얄루얄루')
})

// 클라이언트에서 보내주는 정보들(회원가입을 위한 라우트)
// 회원가입 할때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어준다.
app.post('/register', (req, res) => {
    // body-parser가 request body에 넣어준다.
    const user = new User(req.body)
    // save : mongoDB에서 오는 메소드
    user.save((err,userInfo) => {
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success:true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})