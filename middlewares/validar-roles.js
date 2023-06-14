const {response, request} = require('express')


const esAdminRole = (req = request , res = response  ,next  )=>{

    

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es ADMIN y no puede borrar otros usuarios`
        })
        
    }

    



    next();

}

const tieneRol = (...roles) => {
    return (req = request , res = response  ,next  ) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `${req.usuario.nombre} no tiene uno de estos roles ${roles}, tiene ${req.usuario.rol}`
            })
        }





        next()
    }


}


module.exports = {
    esAdminRole,
    tieneRol
}