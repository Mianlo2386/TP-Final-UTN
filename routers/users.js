// invocamos a express
const {User} = require('../models/user');
const express = require('express');
const router= express.Router();
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');

router.get(`/`, async (req,res)=>{
    const userLista= await User.find().select('-pass');
    if (!userLista){
        res.status(500).json({success:false})
    }
    res.send(userLista);
})


router.get(`/:id`, async (req,res)=>{
    const user= await User.findById(req.params.id);
    if (!user){
        res.status(500).json({message:'usuario inexistente'})
    }
    res.status(200).send(user);
})

router.post(`/`,async (req,res)=>{    
    const user = new User({
        user: req.body.user,
        name: req.body.name,
        rol: req.body.rol,
        pass: bcrypt.hashSync(req.body.pass)
    })
    await user.save().then((crearUser=>{
        res.status(201).json(crearUser)
    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success: false
        })
    })    
})

router.post(`/login`,async (req,res)=>{
    const user = await User.findOne({user:req.body.user})
    if (!user){
        res.status(400).json({message:'usuario inexistente'})
    }
    if (user && bcrypt.compareSync(req.body.pass,user.pass)){
        /*
        const token = jwt.sign(
            {
            userId : user.id
            },
            'secret',
            {expiresIn:'1d'}
        )
        return res.status(200).send({user:user.user, token:token});
        */
        return res.status(200).send(user)
    }else{
        return res.status(400).send('Contraseña incorrecta');
    }
   
})

module.exports=router;