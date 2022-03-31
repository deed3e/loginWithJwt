const express = require('express')
const app = express()
const PORT= process.env.PORT || 3000
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
require('dotenv').config()


var data=[{
     id :'1',
     name :'dog and cat'
},{
    id :'2',
    name :'java and python'
}]

var f5Tokens=[]

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
     res.status(200).json({
         mess : "home"
     })
})

app.post('/login',(req,res)=>{
    //authentical 

    //authenrizon
    let data =req.body
    console.log(data)
    let acessToken = jwt.sign(data, process.env.ACCESS_KEY_JWT,{
        expiresIn: '70s',
      })
    let f5Token = jwt.sign(data, process.env.F5_KEY_JWT,{
        expiresIn: '1h',
      })  
    f5Tokens.push(f5Token) 
 
    res.json({acessToken,f5Token}) 

})

app.get('/f5token',(req,res)=>{
    let f5TokenHeader = req.headers['authorization']
    let f5Token = f5TokenHeader.split(' ')[1]
    if(!f5Token) res.status(401).json({err:'401'})
    if(!f5Tokens.includes(f5Token)) res.status(401).json({err:'401'})
    jwt.verify(f5Token,process.env.F5_KEY_JWT,(err,data)=>{
        if(err) res.status(403).json({err:'403'})
        if(data){
        let acessToken = jwt.sign({username:'tienhung' }, process.env.ACCESS_KEY_JWT,{
            expiresIn: '30s',
          })
        res.json({acessToken})  
        }

     })
})

app.get('/list',middleware,(req,res)=>{

    res.json({data})

})

function middleware(req,res,next){

let token = req.headers['authorization'].split(' ')[1]
    if(!token) res.status(401)
    jwt.verify(token,process.env.ACCESS_KEY_JWT,(err,data)=>{
        if(err) res.status(403).json({err:'time out or not corect token'})
        if(data) next() 
    })

}

app.get('/logout',(req,res)=>{
    let f5TokenHeader = req.headers['authorization']
    let f5Token = f5TokenHeader.split(' ')[1]
    if(!f5Token) res.status(401).json({err:'401'})

    f5Tokens=f5Tokens.filter(tmp=> tmp!=f5Token)
    res.json({ mss:'dang xuat thanh cong'})



})

app.listen(PORT,()=>{
       console.log(`Server is connect in port : ${PORT}`);
})