const collegeModel=require('../model/collegeModel')
const mongoose=require('mongoose')

const createCollege=async(req,res)=>{
try {
    let data=req.body
    if(!Object.keys(data).length)res.status(400).send({status:false,msg:'data is empty'})

    let {name,fullName,logoLink}=data

    if(!name)return res.status(400).send({status:false,msg:'enter name'})
    

    let checkName=await collegeModel.findOne({name})
    if(checkName) res.status(400).send({status:false,msg:'Name is already in use'})

    if(!fullName)res.status(400).send({status:false,msg:'enter fullName'})
    if(!logoLink)res.status(400).send({status:false,msg:'enter logoLink'})


    let createdData=await collegeModel.create(data)

    res.status(201).send({status:true,collegeData:createdData})

} catch (error) {
    res.status(500).send({status:false,msg:error.msg})
}
}


const getCollegeDetails=async(req,res)=>{
try {
    let id=req.params.id
    let getData=await collegeModel.findById(id)
    res.send({msg:getData})
    
} catch (error) {
    res.status(500).send({status:false,msg:error.msg})
}



}





module.exports={createCollege,getCollegeDetails}

    









