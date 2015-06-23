``` js
server.route({
    method: 'GET',
    path: '/',
    config: {
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        handler: function(request, reply){
            if (request.auth.isAuthenticated){
                return reply.view('index.html', {name: request.auth.credentials.profile.displayName, link: new Handlebars.SafeString('<a href="/profile">Profile</a>')});
            } else {
                return reply.view('index.html', {link: new Handlebars.SafeString('<a href="/login">Login</a>')});
            }
        }
    }
});
```
