'use strict'

var User = require('../model/user');

function home(req,res){
    res.status(200).send({
        message: 'Hello HOME'
    });
};

function about(req,res){
    console.log(req.body);
    res.status(200).send({
        message: 'SOCIAL NETWORK ...'
    });
};

module.exports = {
    home,
    about
}