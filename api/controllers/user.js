'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../model/user');

var jwt = require('../services/jwt');

var mongoosePaginate = require('mongoose-pagination');

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
                            user.password = undefined;
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

function login(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    // Uso de operador and (Se separan las condiciones con comas)
    User.findOne({ email: email },// Este tercer parametro es lo mismo que usar .exec()
        (err, user) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error en la petición'
                });
            }
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        if (params.gettoken) {
                            //generar y devolver token
                            return res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            user.password = undefined;
                            return res.status(200).send({
                                user
                            });
                        }
                    } else {
                        return res.status(404).send({
                            message: 'El usuario no ha podido identificar, password incorrecta'
                        });
                    }
                });
            } else {
                return res.status(404).send({
                    message: 'El usuario no ha podido identificar,email incorrecto'
                });
            }
        });
}

function getUser(req, res) {
    //Cuando nos llegan datos por post o put utilizamos res.body
    //Cuando nos llegan datos por url utilizamos res.params
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err)
            return res.status(500).send({ message: 'error en la peticion' });

        if (!user)
            return res.status(404).send({ message: 'el usuario no existe' });

        user.password = undefined;
        return res.status(200).send({
            user
        });

    });

}

function getUsers(req, res) {
    //var identity_user_id = req.user.sub; //?

    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    var itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        if (err)
            return res.status(500).send({ message: 'error en la peticion' });

        if (!users)
            return res.status(404).send({ message: 'No hay usuarios disponibles' });

        return res.status(200).send({ users, total, pages: Math.ceil(total / itemsPerPage) });
    });

}

module.exports = {
    home,
    about,
    save,
    login,
    getUser,
    getUsers
}