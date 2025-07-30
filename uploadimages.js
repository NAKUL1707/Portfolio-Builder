import fs from 'fs'
import path from "path"

import Resume from '../models/resumeModel.js'
import upload from '../middleware/uploadMiddlewares.js'

export const uploadResumeImage = async (req,res)=>{
    try {
        upload.fields([{name:"thumbnail"},{name:"profileImage "}])
        if(!Resume){
            return res.status(400).json({message:"file upload failed",error:error.message})
        }
            const resumeId = req.params.id;
            const resume = await Resume.findOne({_id:resumeId, userId:req.user._id})
            if(!resume){
                return res.status(404).json({message:"resume not found"})
            }
            const uplaodsFolder = path.join(process.cwd(),"uploads")
            const baseURL = `${req.protocol}://${req.get("host")}`;
            const newThumbnail = req.files.thumbnail?.[0]
            const newProfileImage = req.files?.profileImage?.[0]

            if(newThumbnail){
                if(resume.thumbnaiLink){
                    const oldthumbnail = path.join(uplaodsFolder,path.basename(resume.thumbnaiLink))
                    if(fs.existsSync(oldthumbnail))
                    fs.unlinkSync(oldthumbnail)
                }
                resume.thumbnaiLink=`${baseURL}/uploads/${newThumbnail.filename}`;
                
            }
            
            if(newProfileImage){
                if(resume.profileInfo?.profilePreviewURL){
                    const oldProfile = path.join(uplaodsFolder,path.basename(resume.profileInfo.profilePreviewURL))
                    if(fs.existsSync(oldProfile))
                    fs.unlinkSync(oldProfile)
                }
                resume.profileInfo.profilePreviewURL=`${baseURL}/uploads/${newProfileImage.filename}`;
            }
            await resume.save();
            res.status(200).json({
                message:"image uploaded successfully",
                thumbnaiLink:resume.thumbnaiLink,
                profilePreviewURL:resume.profileInfo.profilePreviewURL
            })
        
        }
        catch (error) {
        console.log("error uploading image",error)
        res.status(500).json({
            message:"failed to upload images",
            error:error.message
        })
    }
}