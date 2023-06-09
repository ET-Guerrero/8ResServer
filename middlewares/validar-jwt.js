const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async(req = request, res = response, next)=> {
    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        })
        
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVSTEKEY);

        //
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario que queria borrar no existe en DB'
            })
            
        }
        //Verificar si el uid esta en estado true

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token del quequeria borrar no valido porque estaba con estado false'
            })
            
        }
        
        
        
        req.usuario = usuario;
        

        


        next();
        
    } catch (error) {


        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }

    

    


}

module.exports ={
    validarJWT
}