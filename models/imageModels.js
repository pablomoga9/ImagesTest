const pool = require('../utils/elephantSQL');
require('dotenv').config();
const queries = require('./queries');

const getImages = async(id)=>{
    try{
        const data = await pool.query(queries.getImages,[id]);
        const results = data.rows;
        return results;
    }
    catch(error){
        console.log(error.stack)
    }
}

const createImage = async(body)=>{
    try{
        const {url,description,id_user,date} = body;
        const data = await pool.query(queries.createImage,[url,description,id_user,date]);
        const results = data.rows;
        return results;
    }
    catch(error){
        console.log(error);
    }
}

const deleteImage = async(id)=>{
    try{
        const data = await pool.query(queries.deleteImage,[id]);
        const results = data.rows;
        return results;
    }
    catch(error){
        console.log(error)
    }
}

const updateImage = async(body)=>{
    try{
        const {url,description,id} = body;
        const data = await pool.query(queries.updateImage,[url,description,id]);
        const results = data.rows;
        return results;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getImages,
    createImage,
    deleteImage,
    updateImage
}