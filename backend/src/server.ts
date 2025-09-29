import express, {Express} from 'express';
import cors from 'cors';
const app: Express = express();
import chalk from 'chalk';
const PORT = process.env.PORT || 8000;
import {config} from './config/index';
import { registerRoutes } from './routes/index';

//& Middleware
app.use(express.json());
app.use(cors());

//~ mongodb conn
(async () => {
  await config.mongo.connect();
})();

//* Register routes
registerRoutes(app);



app.listen(PORT, () => {
    console.log(chalk.greenBright.bold(`Server is running on port: ${PORT}`));
});