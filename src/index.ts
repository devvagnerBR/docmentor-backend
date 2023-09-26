import express from 'express';
import cors from "cors"
import { teacherRouter } from './router/teacher-router';
import { schoolRouter } from './router/school-router';
import { studentRouter } from './router/student-router';
import { parentRouter } from './router/parent-router';
import { reportRouter } from './router/report-router';


const port = process.env.PORT || 4242;
const app = express();

app.use( cors() );
app.use( express.json() );

const server = app.listen( port, () => {
    if ( server ) console.log( `🚀 The server is running on localhost:${port}` );
    else console.log( 'Error running the server' );
} );

app.use( teacherRouter )
app.use( schoolRouter )
app.use( studentRouter )
app.use( parentRouter )
app.use( reportRouter )
