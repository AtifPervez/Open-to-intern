const internModel=require('../model/internModel')
const collegeModel=require('../model/collegeModel')
const mongoose=require('mongoose')

const createIntern=async(req,res)=>{

    try {
        let data =req.body
        if(!Object.keys(data).length)return res.status(400).send({status:false,msg:'enter some data'})

        let {name,mobile,email}=data
        

        

        if(!name)return res.status(400).send({status:false,msg:'enter your name'})

        if(!mobile)return res.status(400).send({status:false,msg:'enter mobile number'})
        if(!/[0-9]/.test(data.mobile)){
            return res.status(400).send({status:false,msg:'enter mobile number in numeric value'})
        }
        if(!email)return res.status(400).send({status:false,msg:'enter emailId'})
        let checkMobile=await internModel.findOne({mobile:data.mobile})
        if(checkMobile){
            return res.status(400).send({status:false,msg:'mobile number is alraedy in used'})
        }

        let checkEmail=await internModel.findOne({email:data.email})
        if(checkEmail)return res.status(400).send({status:false,msg:'email id is already in used'}) 

        let createdData=await internModel.create(data)

        res.status(201).send({status:true,internData:createdData})
        
    } catch (error) {
        res.status(500).send({status:false,msg:error.msg})
    }
}

const getCollegeIntern=async(req,res)=>{
 let getData=await internModel.find().populate('college').select({_id:0,name:0,mobile:0,email:0,isDeleted:0,createdAt:0,updatedAt:0,__v:0})
 let interns=await internModel.find().select({deletedAt:0,isDeleted:0,__v:0,createdAt:0,updatedAt:0})
 res.send({data:getData,interns})
}

const getCollegeAllDetails=async(req,res)=>{

    try {
        let clgName = req.query.name
        if(!clgName){
            return res.status(400).send({status:false, message:"Enter the college name first"})
        }
       
        let isValidCollege =await collegeModel.findOne({name:clgName})
        if(!isValidCollege){
            return res.status(400).send({status:false, message:"Invalid college name"})
        }
        let getIntern =await internModel.find({collegeId: isValidCollege._id, isDeleted: false}).select({name: 1, mobile: 1, email: 1})
        if(getIntern.length == 0){
            return res.status(400).send({status:false, message:"No intern found with this college details"})
        }
        const getAllIntern = {
            name: isValidCollege.name,
            fullName: isValidCollege.fullName,
            logoLink: isValidCollege.logoLink,
            interns: getIntern
        }
            res.status(201).send({status: true, msg: getAllIntern})

    } catch (error) {
            res.status(500).send({status:false, msg: error.message})
    }

    
    
    
    
    
}


module.exports={createIntern,getCollegeIntern,getCollegeAllDetails}