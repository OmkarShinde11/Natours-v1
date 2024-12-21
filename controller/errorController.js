const { configDotenv } = require("dotenv");
const AppError = require("../utilities/AppError");

module.exports=(err,req,res,next)=>{
    console.log(err.message,err.statusCode,err.name);
    err.statusCode=err.statusCode || 500;
    err.status=err.statusCode ? 'Fail':'error';

    if(process.env.NODE_ENV=='development'){
        res.status(err.statusCode).json({
            status:err.status,
            error:err,
            message:err.message,
            stackTrace:err.stack,
        })
    }
    else if(process.env.NODE_ENV=='production'){
        if(err.name=='CastError'){
            err=new AppError(`Invalid ID`,400);
        }
        else if(err.code==11000){
            const name=err.keyValue.name;
            err=new AppError(400,`The Tour with ${name} is already exist`);
        }
        else if(err.name=='ValidationError'){
            err=new AppError(400,`Invalid Input`);
        }
        if(err.isOperational){
            res.status(err.statusCode).json({
                status:err.status,
                message:err.message,
            })
        }
        else{
            res.status(err.statusCode).json({
                status:'Fail',
                message:'Something Went very wrong',
            })
        }
    }
}