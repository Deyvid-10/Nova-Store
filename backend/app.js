import express, {json, static as static_} from 'express';
import { createRouter } from './routes/route.js';
import cors from 'cors'
import cookieParser from "cookie-parser";


const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(static_('public'));
app.use(cookieParser());

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:4173",
//   "https://nova-store-10.netlify.app/"
// ];

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}
app.use(cors(corsOptions))

app.use('/', createRouter())


const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})