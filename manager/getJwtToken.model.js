/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
'use strict';
const fs = require('fs');
var privateKEY = fs.readFileSync('./config/private.key', 'utf8');
var publicKEY = fs.readFileSync('./config/public.key', 'utf8');
const jwt = require('jsonwebtoken');

var signOptions = {
    issuer: 'POCAVAL',
    subject: 'SessionToken',
    audience: 'AVAL',
    expiresIn: '60min',
    algorithm: 'RS256'
};

exports.getTokenJWT = clientId => {
    return new Promise(function (resolve, reject) {
        var time = new Date().getTime();
        var payload = {
            jwtId: clientId.toString().substring(0, 4) + time
        };
        var token = jwt.sign(payload, privateKEY, signOptions);
        if (token !== null) {
            resolve(token);
        } else {
            reject(null);
        }

    })

};

exports.verifyToken = (clientId, token) => {
    return new Promise(function (resolve, reject) {
        try {
            var ver = jwt.verify(token, publicKEY, signOptions);
            console.log("jwtID:", ver.jwtId.substring(0, 4));
            console.log("clientID:", clientId.toString().substring(0, 4));
            if (ver) {
                resolve(true);
            } else {
                console.log();
                reject(false);
                console.error("erro en validacion")
            }
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}