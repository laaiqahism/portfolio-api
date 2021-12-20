//@ts-check
'use strict';
const Joi = require('@hapi/joi');
const homeController = require('../controllers/home');

exports.HomePlugin = {

    name: 'Home',
    version: '1.0.0',
    register: async function (server, options){

        server.route({
            path: '/',
            method: 'GET',
            options: {
                handler: homeController.healthcheck,
                description: 'API health check to see if working',
                notes: 'health check',
                tags: ['api']
            }
        });

        server.route({
            path: '/value/{id}',
            method: 'GET',
            options:{
                handler: homeController.healthcheck,
                description: 'API health check to see if values passed',
                notes: 'health check for passing values',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.number().required().description('ID')
                    })
                    ,
                    // payload: Joi.object({

                    // });
                    failAction: async (request, h, err) => {
                      if (process.env.NODE_ENV === 'production') {
                        // In prod, log a limited error message and throw the default Bad Request error.
                        //console.error('ValidationError:', err.message);
                        
                      } else {
                        // During development, log and respond with the full error.
                        console.error(err);
                        throw err;
                      }
                    }
                },
            }
        });
    },
}

