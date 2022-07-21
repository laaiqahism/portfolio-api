//@ts-check
'use strict';
const Joi = require('@hapi/joi');
const roleidController = require('../controllers/roleid');

exports.RoleIDPlugin = {

    name: 'Role ID',
    version: '1.0.0',
    register: async function (server, options){
        server.route({
            path: '/roleid/healthcheck',
            method: 'GET',
            options: {
                handler: roleidController.healthcheck,
                description: 'API health check to see if working',
                notes: 'health check',
                tags: ['api', 'roleID']
            }
        });

        
        server.route({
            path: '/roleid',
            method: 'POST',
            options:{
                handler: roleidController.createRole,
                description: 'create a new role',
                notes: 'create a new role',
                tags: ['api', 'roleID'],
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    payload: Joi.object({
                        rolename: Joi.string().required(),
                        isactive: Joi.boolean().required()

                    })
                },
            }
        });

        server.route({
            path: '/roleid',
            method: 'GET',
            options:{
                handler: roleidController.getRole,
                description: 'Returns information about all users',
                notes: 'Returns information about all users',
                tags: ['api', 'roleID'],
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    query: Joi.object({
                        roleid: Joi.number(),
                        rolename: Joi.string(),
                        isactive: Joi.boolean(),

                    })
                },
            }
        });

    },
}

