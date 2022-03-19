import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import config from './config.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import orderRoute from './routes/orderRoute.js';
import uploadRoute from './routes/uploadRoute.js';

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log("Error coming",error.reason));

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/orders', orderRoute);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
/*app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});*/

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:5000');
});
