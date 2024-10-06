import express from 'express'
import { dbConnection } from './config/db.js';
import { userRouter } from './routes/user_route.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { skillsRouter } from './routes/skills_route.js';
import { achievementRouter } from './routes/achievement_route.js';

const app = express();


dbConnection();

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
      resave: false,
     saveUninitialized: true,
     //cookie: { secure: true }
     store:MongoStore.create({
        mongoUrl: process.env.MONGO_URL
     })
}));
app.use('/api/v1', userRouter)
app.use('/api/v1', skillsRouter)
app.use('/api/v1', achievementRouter)

const PORT = 1500

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`)
})