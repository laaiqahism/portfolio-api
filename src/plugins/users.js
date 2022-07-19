//@ts-check
'use strict';
const Joi = require('@hapi/joi');
const userController = require('../controllers/users');

exports.UsersPlugin = {

    name: 'Users',
    version: '1.0.0',
    register: async function (server, options){
        server.route({
            path: '/users/healthcheck',
            method: 'GET',
            options: {
                handler: userController.healthcheck,
                description: 'API health check to see if working',
                notes: 'health check',
                tags: ['api', 'Users']
            }
        });
    },
}

