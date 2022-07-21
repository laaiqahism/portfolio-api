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

        server.route({
            path: '/users',
            method: 'POST',
            options:{
                handler: userController.createUser,
                description: 'API health check to see if values passed',
                notes: 'health check for passing values',
                tags: ['api', 'Users'],
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    payload: Joi.object({
                        firstname: Joi.string().required(),
                        surname: Joi.string().required(),
                        phonenumber: Joi.string().required(),
                        email: Joi.string().required(),
                        gender: Joi.string().required(),
                        isactive: Joi.boolean().required()

                    })
                },
            }
        });

        server.route({
            path: '/users',
            method: 'GET',
            options:{
                handler: userController.getUsers,
                description: 'Returns information about all users',
                notes: 'Returns information about all users',
                tags: ['api', 'Users'],
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    query: Joi.object({
                        userid: Joi.string(),
                        firstname: Joi.string(),
                        surname: Joi.string(),
                        phonenumber: Joi.string(),
                        email: Joi.string(),
                        gender: Joi.string(),
                        isactive: Joi.boolean()

                    })
                },
            }
        });

        server.route({
            path: '/users/{userid}',
            method: 'PUT',
            options:{
                handler: userController.putUsers,
                description: 'Update users firstname or surname only',
                notes: 'Update users firstname or surname only',
                tags: ['api', 'Users'],
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    params: Joi.object({
                        userid: Joi.string().required()
                    }),
                    payload: Joi.object({
                        firstname: Joi.string(),
                        surname: Joi.string(),
                        phonenumber: Joi.string(),
                        email: Joi.string(),
                        gender: Joi.string(),
                        isactive: Joi.boolean()

                    })
                },
            }
        });

        server.route({
            path: '/users/{userid}',
            method: 'DELETE',
            options:{
                handler: userController.delUsers,
                description: 'Update is active flag to false ',
                notes: 'Update is active flag to false ',
                tags: ['api', 'Users'],
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    params: Joi.object({
                        userid: Joi.string().required()
                    }),
                },
            }
        });


      
    },
}

