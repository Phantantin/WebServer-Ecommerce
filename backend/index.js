const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const authRouter = require("./routes/authRoute");
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute');
const prodcategoryRouter = require('./routes/prodcategoryRoute');
const blogcategoryRouter = require('./routes/blogCatRoute');
const brandRouter = require('./routes/brandRoute');
const couponRouter = require('./routes/couponRoute');
const colorRouter = require('./routes/colorRoute');
const enpRouter = require('./routes/enpRoute');
const uploadRouter = require('./routes/uploadRoute');

const cors = require('cors');


const morgan = require('morgan');

dbConnect();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', prodcategoryRouter);
app.use('/api/blogcategory', blogcategoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/color', colorRouter);
app.use('/api/enquiry', enpRouter);
app.use('/api/upload', uploadRouter);








app.use(notFound)
app.use(errorHandler);



app.listen(PORT, ()=>{
    console.log(`Serve is running at http://localhost:${PORT}`);
})





