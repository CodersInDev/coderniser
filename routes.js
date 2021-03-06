var handlers = require('./handlers.js');
var routes = [
    {
        method: 'GET',
        path: '/',
        config: {
        handler: handlers.main
     }
    },

    {
        method: 'GET',
        path: '/login',
        config: {
            auth: 'github',
            handler: handlers.login
        }
    },

    {
        method: 'GET',
        path: '/home',
        config: {
            auth:{
                mode: 'try',
                strategy: 'session'
            },
            handler: handlers.home
        }
    },

    // {
    //     path: '/repos',
    //     method: 'GET',
    //     handler: handlers.repos
    // },

    {
    	path: '/dashboard',
    	method: 'GET',
    	handler: handlers.dashboard
    },

    {
    	path: '/public/{path*}',
    	method: 'GET',
    	handler: {
            directory: {
                path: './public'
            }
        }
    },

    {
        method: 'POST',
        path: '/create',
        handler: handlers.create
    },

    {
        method: 'GET',
        path: '/dashboard/{repo}',
        handler: handlers.repo
    },

    {
        method: 'GET',
        path: '/issues/{repo}',
        config: {
            auth:{
                mode: 'try',
                strategy: 'session'
            },
            handler: handlers.issue
        }
    },

    {
        method: 'GET',
        path: '/fetchBoard',
        config: {
            auth:{
                mode: 'try',
                strategy: 'session'
            },
            handler: handlers.fetchBoard
        }
    }
];

module.exports = routes;
