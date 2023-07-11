// invocamos a express
const {Producto} = require('../models/producto');
const {Categoria} = require('../models/categoria');
const express = require('express');
const router= express.Router();
const mongoose = require('mongoose');

// EJEMPLO
//http://localhost:3000/productos?categorias=64aab34506801491d9e95857
router.get(`/`, async (req,res)=>{
    let filter ={};
    if (req.query.categorias){
        filter = {categoria: req.query.categorias.split(',')}
    }
    const productoLista= await Producto.find(filter);
    //const productoLista= await Producto.find().select('nombre precio');
    if (!productoLista){
        res.status(500).json({success:false})
    }
    res.send(productoLista);
})


router.get(`/:id`, async (req,res)=>{
    // busca y trae detalles de la categoria da error 
    //const producto= await Producto.findById(req.params.id).populate('categoria');
    // busco con id 
    const producto= await Producto.findById(req.params.id);
    if (!producto){
        res.status(500).json({success:false})
    }
    res.send(producto);
})

router.post(`/`,async(req,res)=>{
    const categoria = await Categoria.findById(req.body.categoria);
    if (!categoria) return res.status(400).send('Categoria invalida')

    const producto = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        autor: req.body.autor,
        precio: req.body.precio,
        precioLista: req.body.precioLista,
        stock: req.body.stock,
        imagen: req.body.imagen,
        activo: req.body.activo,
        medida: req.body.medida
    })
    
    /*
    producto =  await producto.save();

    if (!producto)
    return res.status(500).send('Producto no ingresado')

    res.send(producto)       

    */
    await producto.save().then((crearProducto=>{
        res.status(201).json(crearProducto)
    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success: false
        })
    }) 
})

router.put(`/:id`,async(req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Producto invalido')
    }
    const categoria = await Categoria.findById(req.body.categoria);
    if (!categoria) return res.status(400).send('Categoria invalida')

    const producto= await Producto.findByIdAndUpdate(
        req.params.id,
        {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            autor: req.body.autor,
            precio: req.body.precio,
            precioLista: req.body.precioLista,
            stock: req.body.stock,
            imagen: req.body.imagen,
            activo: req.body.activo,
            medida: req.body.medida
        },
        {new:true}
    )
    if (!producto)
    return res.status(500).send('No pudo modificarse el producto')
    
    res.send(producto)
})


router.delete(`/:id`,async(req,res)=>{
    Producto.findByIdAndRemove(req.params.id).then(producto=>{
        if (producto){
            return res.status(200).json({success:true,message:'producto eliminado'})
        }else{
            return res.status(404).json({success:false,message:'producto inexistente'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err}) 
    })
})

/* funcion para contar cantidad de productos pero no funciona
error -> MongooseError('Model.countDocuments() no longer accepts a callback')

router.get(`/get/count`, async (req,res)=>{
    const productoCount = await Producto.countDocuments((count) => count)

    if (!productoCount)
    res.status(500).json({success:false})
    
    res.send({
        productoCount: productoCount
    });
})
*/

// busca todos los productos activos

router.get(`/get/activos`, async (req,res)=>{
    const productos = await Producto.find({activo:'S'})

    if (!productos)
    res.status(500).json({success:false})
    
    res.send(productos);
})

// busca todos los productos categorias

router.get(`/get/prodPorCat`, async (req,res)=>{
    //const productos = await Producto.find({categoria:'64aab3d312ccb10f217bd876'})
    const productos = await Producto.find({categoria:["64aab3d312ccb10f217bd876","64aab34506801491d9e95857"]})

    if (!productos)
    res.status(500).json({success:false})
    
    res.send(productos);
})

module.exports=router;