const boom = require('@hapi/boom');

module.exports = {

    async healthcheck(request, reply) {
        var data = {
            message: true
        };
        return data;
    },

    async dbtest(request, h) {
        try {
            var id = request.params.id;

            if(!id){
                return boom.conflict('Values did not pass');
            }
    
            return true;
        } catch (error) {
            return boom.conflict(error);
        }

    }
};