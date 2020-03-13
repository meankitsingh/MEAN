
const Joi = require('joi');
const Article = require('../models/article.model');
const mongoose = require('mongoose');
var fs = require('fs');
const articleSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
})


module.exports = {
  insert,
  read,
  update,
  remove,
  list
}


async function insert(req) {
  const URL = req.protocol + "://" + req.get("host");
  if(req.file){
    return await new Article({
      title:req.body.title,
      description:req.body.description,
      imagepath:`${URL}/server/images/${req.file.filename}`
    }).save();
  }else{
    return await new Article({
      title:req.body.title,
      description:req.body.description,
      imagepath:""
    }).save();
  }
  
}

async function read(request) {
    article = await Article.findById(new mongoose.Types.ObjectId(request.params.id))
    return article;
  }

async function update(request) {
    const URL = request.protocol + "://" + request.get("host");
    article = await Article.findById(new mongoose.Types.ObjectId(request.params.id))
    if(request.file ){
      if( article.imagepath != ""){
        fs.unlink("./"+article.imagepath.slice(21),function(err){
          if (err) throw err;
          console.log('File deleted!');
        })
      }
      
      opt={
        title:request.body.title,
        description:request.body.description,
        imagepath:`${URL}/server/images/${request.file.filename}`
      }
    }else{
      opt={
        title:request.body.title,
        description:request.body.description
      }
    }
    
    updated_article = await Article.findOneAndUpdate({_id:new mongoose.Types.ObjectId(request.params.id) }, opt, { new: true })
    return updated_article;
  }

async function remove(request) {
    article = await Article.deleteOne({_id:new mongoose.Types.ObjectId(request.params.id)})
    return article;
  }

async function list(request) {
    article = await Article.find({})
    return article;
  }

