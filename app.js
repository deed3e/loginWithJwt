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
    let user =req.body.user
    //console.log(user)
    let acessToken= jwt.sign(user,process.env.ACCESS_KEY_JWT,{expiresIn:'1h'})
    res.json({acessToken}) 

})

app.get('/list',middleware,(req,res)=>{

    res.json({data})

})

function middleware(req,res,next){

let token = req.headers['authorization'].split(' ')[1]
    if(!token) res.status(401)
    jwt.verify(token,process.env.ACCESS_KEY_JWT,(err,data)=>{
        if(err) res.status(403)
        if(data) next() 
    })

}


app.listen(PORT,()=>{
       console.log('Server is connect in port :'+ PORT);
})