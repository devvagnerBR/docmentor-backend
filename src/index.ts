import express from 'express';
import cors from "cors"
import { userRouter } from './router/user-router';


const port = process.env.PORT || 4242;
const app = express();

app.use( cors() );
app.use( express.json() );

const server = app.listen( port, () => {
    if ( server ) console.log( `🚀 The server is running on localhost:${port}` );
    else console.log( 'Error running the server' );
} );

app.use( userRouter )