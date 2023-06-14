const {response} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response  ) =>{

    const{correo, password} = req.body;

    try {


        //Verificar si correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }

        //Verificar si usuario esta activo
        if(usuario.estado === false){
            return res.status(400).json({
                msg: 'Usuario / password esta en estado false'
            })
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / password . PasswordIncorrecto'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login ok',
            usuario, token
        })


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador que algo salio mal'
        })
        
    }






}

const googleSingIn = async(req, res = response) => {

    const {id_token} = req.body;

    res.json({
        msg: 'Todo bien!',
        id_token
    })

}

module.exports = {
    login,
    googleSingIn
}