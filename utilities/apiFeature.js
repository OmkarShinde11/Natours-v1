class ApiFeature{
    constructor(query,queryBody){
        this.query=query,
        this.queryBody=queryBody
    }

    filter(){
        console.log(this.queryBody);
        const queryObj= {...this.queryBody};
        const excludeFields=['sort','page','limit','fields'];
        for(let i in queryObj){
            if(excludeFields.includes(i)) delete queryObj[i];
            if(typeof(queryObj[i])=='object'){
                let val='$'+Object.keys(queryObj[i])[0];
                let value=Object.values(queryObj[i])[0];
                queryObj[i]={[val]:value};
            }
        }
        this.query=this.query.find(queryObj);
        console.log(this.query);
        return this;
    }


    selectFields(){
        if(this.queryBody.fields){
            let fields=this.queryBody.fields.split(',').join(' ');
            this.query=this.query.select(fields);
        }
        return this;
    }
    sort(){
        if(this.queryBody.sort){
            if(Array.isArray(this.queryBody.sort)){
                let fields=this.queryBody.sort.split(',').join(' ');
                this.query=this.query.sort(fields);
            }else{
                this.query=this.query.sort(this.queryBody.sort);
            }
        }
        return this;
    }
    pageination(){
        if(this.queryBody.page || this.queryBody.limit){
            let page=this.queryBody.page || 1;
            let limit=this.queryBody.limit *1 || 100;
            let skip= page==1 ? 0:(page-1)*limit;
            this.query=this.query.skip(skip).limit(limit);
        }
        return this;
    }
}

module.exports=ApiFeature