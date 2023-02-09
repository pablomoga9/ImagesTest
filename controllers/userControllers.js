require('dotenv').config();
const userModels = require('../models/userModels');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const signup = async(req,res)=>{
    try{    
        const hashPassword = bcrypt.hashSync(req.body.password,saltRounds);
        let newBody = {
            ...req.body,
            picture:"https://cdn-icons-png.flaticon.com/512/16/16363.png",
            description:""
        }

        newBody.password = hashPassword;
        const newUser = await userModels.createUser(newBody);
        res.status(200).json(newUser);
   
    }
    catch(error){
        res.status(400).json(error);
    }
}


const login = async(req,res)=>{
    try{
        console.log(req.body)
        const userData = await userModels.getUserByEmail(req.body.email);
        if(!userData){
            res.status(400).json({msg:'User not found'})
        }
        else{
            
            const password = userData[0].password;
            const match = await bcrypt.compare(req.body.password,password);
          
            if(match){
               
                const userForToken = {
                    email:userData[0].email,
                    name:userData[0].name,
                    picture:userData[0].picture,
                    description:userData[0].description,
                    id:userData[0].id,
                    check:true
                }
                const token  = await jwt.sign(userForToken,process.env.SECRET_TOKEN,{
                    expiresIn:3000
                })
                console.log("hereherherherherhe")
               res.cookie('token',token,'trust proxy',{
                    httpOnly:true,
                    secureProxy:true
                }).send()
            }
            else{
                res.status(400).json({msg:'password is not correct'})
            }
        }
    }
    catch(error){
        res.status(400).json({msg:'could not find user'})
    }
}


const checkUser = async(req,res)=>{
    try{
        
        res.status(200).json({msg:req.headers.cookie})
    }
    catch(error){
        res.status(400).json({msg:"user not found"})
    }
}

const getUser = async(req,res)=>{
    try{
        res.status(200).json({msg:req.headers.cookie})
    }
    catch(error){
        res.status(400).json({msg:'there is no user logged'})
    }
}

const logout = async(req,res)=>{
    try{
        
        
       res.clearCookie("token").redirect('/login');
    }
    catch(error){
        res.status(400).json({msg:'could not logout user'})
    }
}

module.exports = {
    signup,
    login,
    logout,
    getUser,
    checkUser
}