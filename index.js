import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import morgan from 'morgan';

// import userRoutes from './routes/users.js'



const app = express();

app.use(express.static('public'))

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
// app.set('view',path.join(__dirname,'views'))
app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.render('home')
})

app.get('/diseniadores', (req, res) => {
    res.render('diseniadores')
})

app.get('/carreras',(req,res) => {
    res.render('carreras')
})

app.get('*/',(req,res)=>{
    res.render('error')
})

// app.use(userRoutes)


dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DATABASE,{

})

app.listen(process.env.PORT, () => {
    console.log('servidor ejecutandose')
})

