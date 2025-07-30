import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema ({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required :true
    },
    title:{
        type:String,
        required:true
    },
    thumbnaiLink:{
        type:String
    },
    temmplate:{
        type:String,
        colorPalette : [String]
    },
    About_Yourself:{
        type:String,
    },
    
    profileInfo:{
        profilePreviewURL:String,
        fullName:String,
        designation:String,
        summary:String
    },
    contactInfo:{
        email:String,
        phone:String,
        location:String,
        linkedin:String,
        github:String,
        website:String,
    },
    WorkExperience:[
        {
            company:String,
            role:String,
            startDate:String,
            endDate:String,
            description:String
        },
    ],
    education:[{
        degree:String,
        inistitution:String,
        startDate:String,
        endDate:String
    },],
     skiills:[{
        name:String,
        progress:String,
     },],
     projects:[{
        title:String,
        description:String,
        github:String,
        livedemo:String,
     },],
     certification:[{
        title:String,
        issuer:String,
        year:String,
     },],
     languages:[{
        name:String,
        progress:Number
     },],
     interests:[String],
},
{
    timestamps:{createdAt:"created at",updatedAt:"updated at"}
}
);

export default mongoose.model("resume",resumeSchema)


