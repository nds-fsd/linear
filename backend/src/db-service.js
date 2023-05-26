// Basic CRUD Operations from Database

/*
{
    model,
    populationFields,
    entity
}
*/

//getAll

const getAll = (req,{model,populationFields = [], entity}) =>{

    if(!model || !entity){
        throw new Error('Missing Model or Entity')
    }

    const query = req.query || {}

    let operation = model.find(query)
    if(populationFields.length > 0){
        populationFields.forEach((popField)=>{
            operation = operation.populate(popField)
        })
    }
    return operation
}
//getOne
//Update
//create
//Delete


module.exports = {getAll}