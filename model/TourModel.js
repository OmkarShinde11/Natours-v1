const mongoose=require('mongoose');
const slugify=require('slugify');
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A Tour name required'],
        unique:true,
        trim:true,
        maxlength:[40,'A tour name must have less or equal to 40 char'],
        minlength:[10,'A tour name must have more or equal to 10 char'],
    },
    duration:{
        type:Number,
        required:[true,'A Tour duration is required'],
    },
    maxGroupSize:{
        type:Number,
        required:[true,'MaxgroupSize is required'],
    },
    difficulty:{
        type:String,
        enum:['medium','easy','difficult'],
    },
    price:{
        type:Number,
        required:[true,'A tour price is required'],
    },
    summary:String,
    description:String,
    imageCover:{
        type:String,
        required:['true','ImageCover is required'],
    },
    images:[String],
    startDates:[Date],
    slug:String,
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    ratingsAverage:{
        type:Number,
        default:4.5,
        min:[1,'Rating must be above 1'],
        max:[5,'Rating must be below 5'],
    },
    ratingsQuantity:{
        type:Number,
        default:0,
    },
    secretTour:{
        type:Boolean,
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});
// add virual properties duarationWeeks 

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7;
}
)

// add Documnet middleWare pre and add slug in doc before save reffer:slugify package.
tourSchema.pre('save',function(next){
    this.slug=slugify(this.name);
    next();
});

// add query middleware pre and find out secretTour not equals to true. use regex /^find/

tourSchema.pre(/^find/,function(next){
    this.find({secretTour:{$ne:true}});
    next();
});


// add aggregate middleware pre and in aggregation according to secretTour aggregate it 

tourSchema.pre('aggregate',function(next){
    this.pipeline().unshift(
        {$match:{secretTour:{$ne:true}}}
    )
    next();
})



const Tour=new mongoose.model('Tour',tourSchema);
module.exports=Tour;