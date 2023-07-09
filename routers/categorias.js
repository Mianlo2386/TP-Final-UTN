const {Categoria} = require('../models/categoria');
const express = require('express');
const router= express.Router();


router.get(`/`, async (req,res)=>{
    const categoriaLista= await Categoria.find();
    if (!categoriaLista){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoriaLista);
})


router.get(`/:id`, async (req,res)=>{
    const categoria= await Categoria.findById(req.params.id);
    if (!categoria){
        res.status(500).json({message:'categoria inexistente'})
    }
    res.status(200).send(categoria);
})

router.post(`/`,async(req,res)=>{
    let categoria = new Categoria({
        nombre: req.body.nombre,
        icono: req.body.icono,
        color: req.body.color        
    })
    categoria = await categoria.save();

    if(!categoria)
    return res.status(404).send('categoria no se pudo ingresar')
    
    res.send(categoria);
})

router.put(`/:id`,async(req,res)=>{
    const categoria= await Categoria.findByIdAndUpdate(
        req.params.id,
        {
            nombre: req.body.nombre,
            icono: req.body.icono,
            color: req.body.color
        },
        {new:true}
    )
    if (!categoria)
    return res.status(500).send('No pudo modificarse la categoria')
    res.send(categoria)

})

router.delete(`/:id`,async(req,res)=>{
    Categoria.findByIdAndRemove(req.params.id).then(categoria=>{
        if (categoria){
            return res.status(200).json({success:true,message:'categoria eliminada'})
        }else{
            return res.status(404).json({success:false,message:'categoria inexistente'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err}) 
    })
})

module.exports=router;