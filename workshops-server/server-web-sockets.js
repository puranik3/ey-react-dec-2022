// Reference: https://github.com/typicode/json-server#module
// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const axios = require( 'axios' );
var uuidv4 = require('uuid').v4;

const httpServer = require('http').createServer(server);
const io = require('socket.io')( httpServer );

const port = process.env.PORT || 8001;

// baseUrl is used in PUT /sessions/:id/upvote and PUT /sessions/:id/downvote
let baseUrl;
if( process.env.NODE_ENV === 'production' ) {
    baseUrl = `https://workshops-server.herokuapp.com`;
} else {
    baseUrl = `http://localhost:8001`;
}

// **************************************** [Start] Web Socket Support ****************************************
io.on('connection', socket => {
    console.log( 'user connected' );

    socket.on( 'add-session', async ( session, callback ) => {
        console.log( 'received add-session with session = ', JSON.stringify( session, null, 4 ) );

        let response = await axios.post(
            `${baseUrl}/sessions`,
            session,
            { 'Content-Type': 'application/json' }
        );

        if( response.data && response.data.id ) {
            // sending to all clients except sender
            console.log( 'broadcasting new-session event with session = ', JSON.stringify( response.data, null, 4 ) );
            socket.broadcast.emit( 'new-session', response.data );

            // sending to all clients
            // io.emit( 'new-session', response.data );

            return callback({
                status: 'success',
                session: response.data
            });
        } else {
            callback({
                status: 'error',
                error: new Error( 'Problem adding session' ),
                originalData: session
            });
        }
    });
    
    // socket.emit( 'request', /* … */); // emit an event to the socket
    
    socket.on( 'disconnect', () => {
        console.log( 'user disconnected' );
    });
});
// ***************************************** [End] Web Socket Support *****************************************

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add createdDate on POST requests
server.use((req, res, next) => {
    if (req.method === 'POST') {
        var today = new Date();
        req.body.createdDate = today.toString().substr(4, 6) + ',' + today.toString().substr(10, 5);
    }
    // Continue to JSON Server router
    next();
})

server.put('/sessions/:id/upvote', async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(401).json({
            message: `Bad request. Session id must be a number. Received ${id}.`
        });
    }

    // KNOWN BUG: The GET is processed asynchronously, vote count read and update using PATCH - this can lead to race conditions and update to vote may not happen correctly.
    try {
        let response;
        response = await axios.get( `${baseUrl}/sessions/${id}` );
        const upvoteCount = response.data && response.data.upvoteCount;

        if( upvoteCount === undefined ) {
            return res.status(404).json({
                message: `Could not find session with id = ${id}`
            });
        }

        response = await axios.patch(
            `${baseUrl}/sessions/${id}`,
            { upvoteCount: upvoteCount + 1 },
            { 'Content-Type': 'application/json' }
        );

        if( response.data && response.data.upvoteCount ) {
            return res.status(200).json(response.data);
        } else {
            throw new Error( 'Problem updating upvoteCount' );
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error. Something went wrong when processing votes for session with id = ${id}`,
            error: error.message
        });
    }
});

server.put('/sessions/:id/downvote', async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(401).json({
            message: `Bad request. Session id must be a number. Received ${id}.`
        });
    }

    // KNOWN BUG: The GET is processed asynchronously, vote count read and update using PATCH - this can lead to race conditions and update to vote may not happen correctly.
    try {
        let response;
        response = await axios.get( `${baseUrl}/sessions/${id}` );
        const upvoteCount = response.data && response.data.upvoteCount;

        if( upvoteCount === undefined ) {
            return res.status(404).json({
                message: `Could not find session with id = ${id}`
            });
        }

        response = await axios.patch(
            `${baseUrl}/sessions/${id}`,
            { upvoteCount: upvoteCount - 1 },
            { 'Content-Type': 'application/json' }
        );

        if( response.data && response.data.upvoteCount ) {
            return res.status(200).json(response.data);
        } else {
            throw new Error( 'Problem updating upvoteCount' );
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error. Something went wrong when processing votes for session with id = ${id}`,
            error: error.message
        });
    }
});

server.use(router);

httpServer.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});