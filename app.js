

// invocamos a express
const express = require('express')
const app = express()

//invocamos a express-ejs-layouts
const expressLayouts = require('express-ejs-layouts')

// seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config();


// Directirio public
app.use(express.static('public'))
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + 'public'));

// establecer el motor de plantillas ejs - 
app.set('view engine', 'ejs')
app.use(expressLayouts)

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

// app.get('*/',(req,res)=>{
//     res.render('error')
// })

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

app.get('/designer', (req, res) => {
    res.render('designer')
})

app.get('/carrito',(req,res)=>{
    const user = req.session.name
    connection.query('SELECT carrito.idCliente, carrito.idProducto, carrito.cantidad, productos.precio, productos.imagen, productos.nombre, productos.autor FROM carrito inner join productos WHERE productos.idProducto = carrito.idProducto and carrito.idCliente=?',[user], (error, results) => {
        if (error) throw error;
        res.render('carrito', { productos: results });
      });
    //res.render('carrito')
})

app.get('/shop',(req,res)=>{
    //res.render('shop')
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) throw error;
        res.render('shop', { productos: results });
      });
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

// autenticar en paginas

app.get('/',(req,res)=>{
    if(req.session.loggedin){
        // busca en el carrito
        const user = req.session.name        
        connection.query('SELECT COUNT(*) as cantidad FROM carrito WHERE idCliente = ?',[user], async (error,results)=>{            
            if(results[0].cantidad!=0){
                res.render('home',{
                    carrito:true,
                    cantidad:results[0].cantidad,
                    login:true,
                    name:req.session.name
                });
            }else{
                res.render('home',{
                    carrito: false,
                    login:true,
                    name:req.session.name
                });
            }
        });
    }else{
        res.render('home',{
            login:false,
            name:'Debe iniciar session'
        
        })
    }
})

// logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

// - Agregar al carrito

app.get('/agregar/:id', (req,res)=>{      
    console.log(req.params.id) 
    //console.log(req.params.cant) 

    if (req.session.name){

    connection.query('INSERT INTO carrito SET ?',{idProducto:req.params.id, idCliente:req.session.name},async(error,results)=>{
        if(error){
            console.log(error);
        }else{
            //res.send('ALTA EXITOSA')
            
            res.render('carrito',{
                alert:true,
                alertTitle: "Carrito",
                alertMessage: "Producto agregado",
                alertIcon: 'success',
                showConfirmButton:false,
                timer:1600,
                ruta:'shop'
            })
        }
    })
/*
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error){
             throw error}
        else{
            res.redirect('../shop', { productos: results, 
                alert:true,
                alertTitle: "Comprar",
                alertMessage: "Producto añadido",
                alertIcon: 'success',
                showConfirmButton:false,
                timer:1800,
                ruta:'../shop'
            });
        }
      });

    if(!producto){
        res.render('shop',{
                    alert:true,
                    alertTitle: "Comprar",
                    alertMessage: "Producto añadido",
                    alertIcon: 'success',
                    showConfirmButton:false,
                    timer:1800,
                    ruta:'shop'
                })
            
    }else{
        res.render('shop',{
            alert:true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese un usuario y/o contraseña",
            alertIcon: 'warning',
            showConfirmButton:false,
            timer:1800,
            ruta:'shop'
        })
    }*/
}else{
    res.render('login',{
        alert:true,
        alertTitle: "Advertencia",
        alertMessage: "Debe iniciar session",
        alertIcon: 'warning',
        showConfirmButton:false,
        timer:1800,
        ruta:'login'
    })
}
})

// comprar - Agregar a pedido y eliminar de carrito

app.post('/comprar/:id1/:id2/:id3', (req,res)=>{  
var fecha='2023-06-23'
  connection.query('INSERT INTO pedidos SET ?',{idCliente:req.session.id, fechaPedido:fecha, importe:req.params.id1, metodoPago:req.params.id2, metodoEnvio:req.params.id3},async(error,results)=>{
    if(error){
        console.log(error.message);
    }else{
        //res.send('ALTA EXITOSA')        
        res.redirect('shop',{
            alert:true,
            alertTitle: "Muchas gracias por tu compra",
            alertMessage: "Tu orden esta en preparacion",
            alertIcon: 'success',
            showConfirmButton:false,
            timer:1600,
            ruta:'shop'
        })
    }
    })    
})

// traer productos
/*
app.get('/productos', (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
      if (error) throw error;
      res.render('shop', { productos: results });
    });
  });
*/
app.listen(3050, ()=>{
    console.log('Servidor ejecutandose')
})