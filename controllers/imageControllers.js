require('dotenv').config();
const imageModels = require('../models/imageModels');

const getImages = async(req,res)=>{
    try{
        const getImg = await imageModels.getImages(req.params);
        return getImg;
    }
    catch(error){
        res.status(400).json({msg:'images not found'});
    }
}

const createImage = async(req,res)=>{
    try{
        const createImg = await imageModels.createImage(req.body);
    }
    catch(error){
        res.status(400).json({msg:'could not create image'});
    }
}

const deleteImage = async(req,res)=>{
    try{
        const deleteImg = await imageModels.deleteImages(req.params);
    }   
    catch(error){
        res.status(400).json({msg:'could not delete image'});
    }
}

const updateImage = async(req,res)=>{
    try{
        const updateObj = {
            ...req.body,
            id:res.params
        }
        const updateImg = await imageModels.updateImage(updateObj)
        return updateImg;
    }  
    catch(error){
        res.status(400).json({msg:'could not update image'})
    }
}

module.exports = {
    getImages,
    createImage,
    deleteImage,
    updateImage
}