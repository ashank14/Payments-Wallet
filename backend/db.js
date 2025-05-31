const mongoose=require('mongoose');//import mongoose

mongoose.connect('mongodb+srv://ashank:Qwerty@cluster0.daydhtz.mongodb.net/paytm?authMechanism=SCRAM-SHA-1')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30

    },    
    password:{
        type: String,
        required: true,
        minLength:6
    },
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    }

})
const User=mongoose.model("User",userschema);
const bankschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const Balance=mongoose.model("Balance",bankschema);



module.exports={
    User,
    Balance
};



