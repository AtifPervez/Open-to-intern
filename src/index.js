const express=require('express')
const mongoose=require('mongoose')
mongoose.set('strictQuery', true)

const router=require('./router/route')
const bodyParser=require('body-parser')
const multer = require('multer')

const app=express()
app.use(bodyParser.json())
app.use(multer().any())

mongoose.connect('mongodb+srv://atifpervez:34BmDa5XVvtznQvO@code.8mvlc.mongodb.net/openToIntern')

.then(()=>{console.log('MongoDb is connected');})
.catch((err)=>console.log(err))

app.use('/',router)

app.listen(5000,()=>console.log(5000,"Port is connected to the server"))