// invocamos a express
const express = require('express')
const app = express()

//invocamos a express-ejs-layouts
// const expressLayouts = require('express-ejs-layouts')

// seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });


// Directirio public
app.use(express.static('public'))
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + 'public'));

// establecer el motor de plantillas ejs - 
app.set('view engine', 'ejs')
// app.use(expressLayouts)

// invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

// variables de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// invocamos al modulo de la base de datos
const mongoDB = require('./database/db_mongo').Mongo

// estableciendo las rutas

app.get('/login', (req, res) => {
    res.render('login')
})

// registracion

// app.get('/', (req, res) => {
//         res.render('home')
//  })

app.get('/registrar', (req, res) => {
    res.render('registrar')
})

app.get('/carreras',(req,res) => {
    res.render('carreras')
})

app.get('/producto',(req,res) => {
    res.render('paginaProducto')
})

app.get('/buscador',(req,res) => {
    res.render('buscador')
})



app.post('/registrar', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);

    try {
        const mongo = new mongoDB(process.env.DB_HOST, process.env.DB_DATABASE)

        await mongo.connect()

        const result = mongo.insert({
            name,
            user,
            rol,
            pass: passwordHash,
        }, 'users')

        res.render('registrar', {
            alert: true,
            alertTitle: "Registracion",
            alertMessage: "Registracion Exitosa",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1600,
            ruta: ''
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Hubo un error interno en el server' })
    }
    // connection.query('INSERT INTO user SET ?', { user: user, name: name, rol: rol, pass: passwordHash }, async (error, results) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         //res.send('ALTA EXITOSA')
    //         res.render('registrar', {
    //             alert: true,
    //             alertTitle: "Registracion",
    //             alertMessage: "Registracion Exitosa",
    //             alertIcon: 'success',
    //             showConfirmButton: false,
    //             timer: 1600,
    //             ruta: ''
    //         })
    //     }
    // })
})

app.get('/contacto', (req, res) => {
    res.render('contacto')
})

app.get('/diseniadores', (req, res) => {
    res.render('diseniadores')
})

app.get('/comercio', (req, res) => {
    res.render('comercio')
})

// autenticacion

app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    console.log(user)
    console.log(pass)
    // let passwordHash = await bcryptjs.hash(pass, 8);
    // console.log(passwordHash)
    if (user && pass) {
        try {
            const mongo = new mongoDB(process.env.DB_HOST, process.env.DB_DATABASE)

            await mongo.connect()

            const results = await mongo.getCollection('users')
            const found = results.find(async (el) => {
                let match = await bcryptjs.compare(pass,el.pass)
                return el.user == user &&  match

            })
            if (found) {

                req.session.loggedin = true
                req.session.name = results[0].name
                res.render('login', {
                    alert: true,
                    alertTitle: "Conexion Exitosa",
                    alertMessage: "Acceso Correcto",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1800,
                    ruta: ''

                })

            } else {

                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o Contraseña Incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 1800,
                    ruta: 'login'

                })

        
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({ status: -1, message: 'Se produjo error interno' })
        }
        //  connection.query('SELECT * FROM user WHERE user = ?',[user], async (error,results)=>{
        //     if(results.length==0 || !(await bcryptjs.compare(pass,results[0].pass))){
        //         res.render('login',{
        //             alert:true,
        //             alertTitle: "Error",
        //             alertMessage: "Usuario y/o Contraseña Incorrectas",
        //             alertIcon: 'error',
        //             showConfirmButton:false,
        //             timer:1800,
        //             ruta:'login'
        //         })
        //     }else{
        //         req.session.loggedin = true
        //         req.session.name=results[0].name
        //         res.render('login',{
        //             alert:true,
        //             alertTitle: "Conexion Exitosa",
        //             alertMessage: "Acceso Correcto",
        //             alertIcon: 'success',
        //             showConfirmButton:false,
        //             timer:1800,
        //             ruta:''
        //         })
        //     }
        //})
    } else {
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese un usuario y/o contraseña",
            alertIcon: 'warning',
            showConfirmButton: false,
            timer: 1800,
            ruta: 'login'
        })
    }
})


app.get('/products/search',async(req,res)=>{

    const value=req.query.name

    try {
        const mongo = new mongoDB(process.env.DB_HOST, process.env.DB_DATABASE)

        await mongo.connect()

        const filter={nombre: { $regex: value , $options: 'i'}}

        const products= await mongo.getCollection('productos', filter, 15)
        


        res.render('lampProduct.ejs', {products})

    } catch (error) {

        res.status(401).json({status:-1, message:'El producto no se encuentra'})
        
    }
})



// autenticar en paginas

app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('home', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('home', {
            login: false,
            name:req.session.name
        })
    }
})

// logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

app.get('*/',(req,res)=>{
    res.render('error')
})

app.listen(3050, () => {
    console.log('Servidor ejecutandose')
})

