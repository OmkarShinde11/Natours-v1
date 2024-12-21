const express=require('express');
const swagger=require('swagger-ui-express');
const swaggerSpec=require('./swagger');
const morgan=require('morgan');
const tourRouter=require('./routes/tourRouter');
const userRouter=require('./routes/userRouter');
const AppError = require('./utilities/AppError');
const globalErrorMiddleware=require('./controller/errorController');
const app=express();

// used to read a req.body.
app.use(express.json());
app.use(morgan('dev')); // to check a log of api hit.
app.use(express.static('./public')) //serve a ststic file e.g. http://localhost:4201/overview.html here a template is seen on ui

app.use('/api-docs',swagger.serve,swagger.setup(swaggerSpec));
app.use('/api/v1/tour',tourRouter);
app.use('/api/v1/user',userRouter);

// handeling unhandleRoutes.
// here we check after our application routes will declare if current request is not found in above path then we get handle in app.all() middleware.
app.all('*',(req,res,next)=>{
    const err=new AppError(404,`Can't find the ${req.originalUrl}`);
    next(err);
});

app.use(globalErrorMiddleware);


module.exports=app;