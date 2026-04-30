const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config()

const app=express()
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json())
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log("✅ MongoDB CONNECTED");
})
.catch(err => {
    console.error("❌ MongoDB ERROR:");
    console.error(err.message);
});
app.use("/api/applications" , require("./routes/ApplicationRoutes"));
app.listen(process.env.PORT,()=>{console.log("Server Running");
})