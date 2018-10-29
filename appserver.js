const express = require('express');
var proxy = require('express-http-proxy');
const path = require('path');
const port = process.env.PORT || 8123
const app = express()

// serve static assets normally
app.use('/public', proxy('localhost:4000' , {
	forwardPath: function forwardPath(req) {
		return req.originalUrl;
	}
}));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)