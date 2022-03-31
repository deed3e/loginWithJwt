const express = require('express')
const app = express()
const PORT= process.env.PORT || 3000
const jwt = require('jsonwebtoken')
require('dotenv').config()

app.use(express.json())

app.get('/',(req,res)=>{
     res.status(200).json({
         mess : "home"
     })
})


app.listen(PORT,()=>{
       console.log('Server is connect in port :'+ PORT);
})