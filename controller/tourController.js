const fs=require('fs');
let tourData=fs.readFileSync('./dev-data/data/tours.json');
tourData=JSON.parse(tourData);

const getTours=(req,res)=>{
    return res.status(200).json({
        status:'Sucesss',
        result:tourData.length,
        data:tourData,
    })
}
const getSingleTour=(req,res)=>{
    let id=req.params.id;
    console.log(id);
    let singleTourData=tourData.find(el=>el.id==id);
    return res.status(200).json({
        status:'sucesss',
        data:singleTourData,
    })
}

const updateTour=(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'Tour Update Successfully',
    })
}

const deleteTour=(req,res)=>{
    res.status(204).json({
        status:'success',
        message:'Tour Deleted Successfully',
    })
}

const createTour=(req,res)=>{
    console.log(req.body)
    let data=Object.assign({id:Math.random()},req.body);
    tourData.push(data);
    fs.writeFile('./dev-data/data/tours.json',JSON.stringify(tourData),'utf-8',(err)=>{
        res.status(201).json({
            status:'success',
            data,
        })
    })
}


module.exports={
    getTours,getSingleTour,createTour,updateTour,deleteTour
}