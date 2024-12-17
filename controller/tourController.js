const fs=require('fs');
// let tourData=fs.readFileSync('./dev-data/data/tours.json');
// tourData=JSON.parse(tourData);
const Tour=require('../model/TourModel');
const ApiFeature=require('../utilities/apiFeature');

const getTours=async (req,res)=>{
    try{
        const features=new ApiFeature(Tour.find(),req.query).filter().selectFields().sort().pageination();
        const tourData=await features.query;
        res.status(200).json({
            status:'Sucesss',
            result:tourData.length,
            data:tourData,
        })
    }catch (err){
        console.log(err);
        res.status(400).json({
            status:'Fail',
            message:err,
        })
    }
}
const getSingleTour=async (req,res)=>{
    try{
        let id=req.params.id;
        console.log(id);
        let singleTourData=await Tour.findById(id);
        res.status(200).json({
            status:'sucesss',
            data:singleTourData,
        })
    }
    catch(err){
        res.status(400).json({
            status:'Fail',
            message:err,
        })
    }
}

const updateTour=async (req,res)=>{
    try{
        console.log(res.body);
        const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.status(201).json({
            status:'success',
            data:tour,
            message:'Tour Update Successfully',
        })      
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}

const deleteTour=async (req,res)=>{
    try{
        await Tour.deleteById(req.params.id);
        res.status(204).json({
            status:'success',
            message:'Tour Deleted Successfully',
        })
    }catch(err){
        res.status(400).json({
            status:'Fail',
            message:err,
        })
    }
}

const createTour=async (req,res)=>{
    try{
        const data=await Tour.create(req.body);
        res.status(201).json({
            status:'Success',
            data,
        })
    }catch(err){
        res.status(400).json({
            status:'Fail',
            message:err,
        })
    }
}

const getTopTours = (req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-price,ratingsAverage';
    req.query.fields='name,price,ratingsAverage';
    next();
}

const tourStats=async (req,res)=>{
    try{
        const stats = await Tour.aggregate([
            {
              $match: {
                ratingsAverage: { $gte: 4.5 },
              }
            },
            {
                $group:{
                    _id:'$difficulty',
                    numTours:{$sum:1},
                    avgPrice:{$avg:'$price'},
                    avgRating:{$avg:'$ratingsQuantity'},
                }
            }
          ]);          
        res.status(201).json({
            status:'Success',
            stats,
        })
    } catch(err){
        res.status(400).json({
            status:'Fail',
            message:err,
        })
    }
}

const monthlyPlan=async (req,res)=>{
    try{
        let year=req.params.year;
        console.log(year);
        let tourPlan=await Tour.aggregate([
            {
                $unwind:'$startDates'
            },
            {
                $match:{
                    startDates:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`),
                    }
                }
            },
            {
                $group:{
                    _id:{$month:'$startDates'},
                    numTours:{$sum:1},
                    tourName:{$push:'$name'},
                }
            },
            {
                $addFields:{
                    month:'$_id',
                }
            },
            {
                $project:{
                    _id:0,
                }
            }
        ])
        res.status(200).json({
            status:'Success',
            tourPlan,
        })
    }catch(err){
        res.status(400).json({
            status:'Fail',
            message:err,
        })
    }
}


module.exports={
    getTours,getSingleTour,createTour,updateTour,deleteTour,getTopTours,tourStats,monthlyPlan
}