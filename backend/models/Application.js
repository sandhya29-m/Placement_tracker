const mongoose=require("mongoose");
const applicationSchema=new mongoose.Schema({
    company: String,
    role: String,
    ctc: String,
    status: String,
    appliedDate: String,
    notes: String
});
module.exports=mongoose.model("Application",applicationSchema);