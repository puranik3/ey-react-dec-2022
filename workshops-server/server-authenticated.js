/**
 * Reference: https://github.com/typicode/json-server#module
 */
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const jwt = require('./services/jwt');

const port = process.env.PORT || 8001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

function isAuthorized(req, res) {
    if (req.path === '/login') return true;

    if (!req.headers.authorization) {
        return false;
    }

    let token = req.headers.authorization.split(' ')[1];
    
    let payload;
    try {
        payload = jwt.decode(token, 'shhh...');
    } catch (err) {
        return false;
    }

    if (!payload || !payload.sub) {
        return false;
    }

    res.locals.payload = payload;

    return true
}

// login endpoint
server.post('/login', function (req, res) {
    let body = req.body;
    let email = body.email;
    let password = body.password;

    if( email === 'john.doe@example.com' && password === 'password' ) {
      let payload = {
        iss: req.hostname,
        sub: '' + email
      };

      let token = jwt.encode(payload, 'shhh...');

      res.json({
          email: email,
          authToken: token
      });
    } else {
      res.sendStatus(401);
    }
});

// Check for authorization
server.use((req, res, next) => {
  if (isAuthorized(req, res)) {
    next();
  } else {
    res.sendStatus(401);
  }
});

// Add createdDate on POST requests
server.use((req, res, next) => {
  if (req.method === 'POST') {
    var today = new Date();
    req.body.createdDate = today.toString().substr(4, 6) + ',' + today.toString().substr(10, 5);
  }

  next();
});

server.use(router);
server.listen(port, () => {
  console.log( `JSON Server is running on port ${port}` );
});