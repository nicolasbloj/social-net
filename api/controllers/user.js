'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../model/user');

function home(req, res) {
    res.status(200).send({
        message: 'Hello HOME'
    });
};

function about(req, res) {
    console.log(req.body);
    res.status(200).send({
        message: 'SOCIAL NETWORK ...'
    });
};

function save(req, res) {
    var params = req.body;
    var user = new User();

    if (params.name && params.surname &&
        params.nick && params.email &&
        params.password) {
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        // Controlar usuarios duplicados . 

        //Si encontramos un usuario con mismo nick o mismo email:
        //Uso de operador OR
        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { nick: user.nick.toLowerCase() },
            ]
        }).exec((err, users) => {
            if (err) {
                //uso clausula de guarda
                return res.status(500).send({
                    message: 'Error en la peticion de usuarios'
                });
            }
            if (users.length > 0) {
                //salgo de todo, no entro a bcrypt.hash
                return res.status(200).send({
                    message: 'El usuario ya existe'
                });
            } else {
                // Cifrar pass y guardar datos
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if (err) {
                            //clausula de guarda, return.
                            return res.status(500).send({
                                message: 'Error al guardar el usuario'
                            });
                        }
                        if (userStored) {
                            res.status(200).send({
                                user: userStored
                            });
                        } else {
                            res.status(404).send({
                                message: 'No se ha registrado el usuario'
                            });
                        }
                    });
                });

            }
        });

    } else {
        res.status(200).send({
            message: 'Envia todos los campos necesarios!'
        });
        //podriamos usar return
    }

}

module.exports = {
    home,
    about,
    save
}