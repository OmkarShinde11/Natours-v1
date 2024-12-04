const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});  //read a config.env


const app=require('./app');

app.listen(process.env.PORT,()=>{
    console.log(`server is listen on port ${process.env.PORT}`);
});