const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});  //read a config.env
const mongoose=require('mongoose');
const app=require('./app');

// Connect DB 
mongoose.connect(process.env.DATABASECONNECTIONSTRING,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false}).then(con=>{console.log(' DB Connection successfully.')});

app.listen(process.env.PORT,()=>{
    console.log(`server is listen on port ${process.env.PORT}`);
});