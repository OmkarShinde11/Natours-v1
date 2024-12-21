const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});  //read a config.env
const mongoose=require('mongoose');
const app=require('./app');

// Connect DB 
mongoose.connect(process.env.DATABASECONNECTIONSTRING,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false}).then(con=>{console.log(' DB Connection successfully.')}).catch(err=>console.log('error', err));

let server=app.listen(process.env.PORT,()=>{
    console.log(`server is listen on port ${process.env.PORT}`);
});

// handle unhandlerejection globally (In your whole app if in case there is promise rejection is not handle then it is handle here);

process.on('unhandledRejection',(err)=>{
    console.log(err.name,err.message);
    // process.exit(1)  //here app is directly exit so in background id some request is in progress it will also exit
    server.close(()=>{
        process.exit(1);  // here first server is close then app is exit 
    })
});


// handle unCaught exception means in your sync code if there is any issue then it will handle here globally

process.on('uncaughtException',(err)=>{
    console.log(err.name,err.message);
    process.exit(1);
})