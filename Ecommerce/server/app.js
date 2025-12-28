import express from 'express'
const app = express();
import morgan  from 'morgan';
import dbConnection from './src/utils/database.js';
import errorHandler from './src/middleware/errorHandling.js';
import config from './src/utils/config.js';
import notFound from './src/middleware/notFound.js';
import logger from './src/utils/logger.js';
import authRoutes from './src/modules/auth/routes/auth.routes.js';
import categoryRoutes from './src/modules/category/routes/category.routes.js';
import productRoutes from './src/modules/product/routes/product.routes.js';
import cors from 'cors'

dbConnection();


if (config.ENV_MODE === 'development') {
    app.use(morgan('dev'));
    logger.info(`mode : ${config.ENV_MODE}`);
}
app.use(cors())

app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/product",productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;