const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
 const bcryptjs = require('bcryptjs')
const reportScehma = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
//   avatar:{
//     type:Buffer
// },
  phone: {
    type: String,
    trim: true,
    required: true,

    validate(value) {
    //   // const regex = new RegExp ('^01[0125][0-9]{8}$')
      const regex = new RegExp(/^(\+201|01|00201])[0-2,5]{1}[0-9]{8}/);
    //   // const regex = new RegExp ('^(\+\d{1,3}[- ]?)?\d{10}$')
      if (!regex.test(value) || !validator.isMobilePhone(value)) {
        throw new Error("Please enter number starts with 01 ");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter valid email");
      }
    },
  },
  password:{
    type:String,
    required:true,
    minlength:6,
    trim:true,
    validate(value){
    let passwordReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
    if(!passwordReg.test(value)){
        throw new Error('Password must include A,a,$,1')
    }
    }
},
//   avatar:{
//     type:Buffer
// },
// owner:{
//   type:mongoose.Schema.Types.ObjectId,
//   required:true,
//   ref:'News'
// },
 
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
    //   news:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'News'
    //     }
    // ]

});
reportScehma.virtual('news',{
  ref:'News',
  localField:'_id',
  foreignField:'owner'
})
 

reportScehma.pre('save',async function(){
 const reporters = this 
 if(reporters.isModified('password'))
 reporters.password = await bcryptjs.hash(reporters.password,8)
})


reportScehma.methods.tokenCode = async function () {
  const reporters = this;
  const token = jwt.sign({ _id: reporters._id.toString() }, "Reportes");
  reporters.tokens = reporters.tokens.concat(token);
  await reporters.save();
  return token;
};

reportScehma.statics.findData = async (email,password) => {
  const logIn = await Report.findOne({ email });
  console.log(logIn);
  if (!logIn) {
    throw new Error("Please Check Your Email");
  }
  const isMatch = await bcryptjs.compare(password,logIn.password)

  if(!isMatch){
      throw new Error ('Unable to login please check email or password')
  }
  return logIn;
};


const Report = mongoose.model("Report", reportScehma);
module.exports = Report;
