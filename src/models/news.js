const mongoose = require("mongoose");
 
 
const newsScehma = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },

  discription: {
    type: String,
    trim: true,
    required: true,
  },
  avatar:{
    type:Buffer
},
 
 
//   owner:{
//     type:mongoose.Schema.Types.ObjectId,
//     required:true,
//     ref:'Report'
// },
});
// newsScehma.virtual('reporters',{
//   ref:'Report',
//   localField:'_id',
//   foreignField:'owner'
// })
 
const News = mongoose.model("News", newsScehma);
module.exports = News;
