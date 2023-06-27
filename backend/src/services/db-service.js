// Basic CRUD Operations from Database

/*

*/

//getAll

const findAll = ({query={},model,populationFields = [], entity}) =>{

    if(!model || !entity){
        throw new Error('Missing Model or Entity')
    }

    let operation = model.find(query)
    if(populationFields.length > 0){
        populationFields.forEach((popField)=>{
            operation = operation.populate(popField)
        })
    }
    return operation
}
//findOne
const findOne = ({id,model,populationFields = [], entity}) =>{

    if(!model || !entity){
        throw new Error('Missing Model or Entity')
    }


    let operation = model.findById(id)
    if(populationFields.length > 0){
        populationFields.forEach((popField)=>{
            operation = operation.populate(popField)
        })
    }
    return operation
}
//create
const create = (model,data)=>{
    if(!model || !data){
        throw new Error('Missing Model or data')
    }

    const newEntity = new model(data)
    return newEntity.save()
}
//Update
const updateOne = ({model, id, data, populationFields = []})=>{
    if(!model || !data || !id){
        throw new Error('Missing Model or data or id')
    }
    let operation = model.findByIdAndUpdate(id,data,{new:true})
    if(populationFields.length > 0){
        populationFields.forEach((popField)=>{
            operation = operation.populate(popField)
        })
    }
    return operation

}
//Delete
const deleteOne = (model,id)=>{
    if(!model || !id){
        throw new Error('Missing Model or id')
    }
    return model.findByIdAndDelete(id)
}

module.exports = { findAll,findOne,create,deleteOne,updateOne}