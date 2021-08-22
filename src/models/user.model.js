const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    phone:String,
    is_active: {type:Boolean,default:false},
    is_verified:{type:Boolean,default:false},
    is_deleted:{Type:Boolean,default:false}
    
},{
    timestamps:true,
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);