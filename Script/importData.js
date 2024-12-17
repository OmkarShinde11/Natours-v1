const fs=require('fs');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const Tour=require('../model/TourModel');
TourData=fs.readFileSync('./dev-data/data/tours.json','utf-8');
TourData=JSON.parse(TourData);
const db=process.env.DATABASECONNECTIONSTRING


mongoose.connect(db,
    {useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false}
).then(con=>{console.log('connection Successfully')});

const inserData=async ()=>{
    try{
        await Tour.create(TourData);
        console.log('Data inserted Successfully');
    }
    catch(err){
        console.log(err);
    }
};

const deletedData=async ()=>{
    try{
        await Tour.deleteMany();
        console.log('data deleted successfully');
    }
    catch(err){
        console.log(err);
    }
};


console.log(process.argv);

if(process.argv[2]=='--import'){
    inserData();
}
else if(process.argv[2]=='--delete'){
    deletedData();
}