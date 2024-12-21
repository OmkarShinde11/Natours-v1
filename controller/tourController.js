const fs=require('fs');
// let tourData=fs.readFileSync('./dev-data/data/tours.json');
// tourData=JSON.parse(tourData);
const Tour=require('../model/TourModel');
const ApiFeature=require('../utilities/apiFeature');
const AppError = require('../utilities/AppError');
const catchAsync = require('../utilities/catchAsync');

const getTours=catchAsync(async (req,res,next)=>{
        const features=new ApiFeature(Tour.find(),req.query).filter().selectFields().sort().pageination();
        const tourData=await features.query;
        res.status(200).json({
            status:'Sucesss',
            result:tourData.length,
            data:tourData,
        })
});
const getSingleTour=catchAsync(async (req,res,next)=>{
        let id=req.params.id;
        console.log(id);
        let singleTourData=await Tour.findById(id);
        if(!singleTourData) return next(new AppError(404,`There is no data found for id: ${req.params.id}`));
        res.status(200).json({
            status:'sucesss',
            data:singleTourData,
        })
});

const updateTour=catchAsync(async (req,res,next)=>{
        console.log(res.body);
        const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!tour) return next(new AppError(404,`There is no such id: ${req.params.id} present in database`));
        res.status(201).json({
            status:'success',
            data:tour,
            message:'Tour Update Successfully',
        })
});

const deleteTour=catchAsync(async (req,res,next)=>{
        await Tour.deleteById(req.params.id);
        if(!tour) return next(new AppError(404,`There is no such id: ${req.params.id} present in database`));
        res.status(204).json({
            status:'success',
            message:'Tour Deleted Successfully',
        })
});

const createTour=catchAsync(async(req,res,next)=>{
        const data=await Tour.create(req.body);
        res.status(201).json({
            status:'Success',
            data,
        });
})

const getTopTours = (req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-price,ratingsAverage';
    req.query.fields='name,price,ratingsAverage';
    next();
}

const tourStats=catchAsync(async (req,res,next)=>{
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
});

const monthlyPlan=catchAsync(async (req,res,next)=>{
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
});


module.exports={
    getTours,getSingleTour,createTour,updateTour,deleteTour,getTopTours,tourStats,monthlyPlan
}