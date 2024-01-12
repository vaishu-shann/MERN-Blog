const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel")
// const multer = require('multer');
// const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path')


const assetsFolder = path.join(__dirname, '..', 'assets');


const uploadImage = asyncHandler(async (req, res) => {
    console.log("req.file", req.files)
    console.log("path", path)
    console.log("assetsFolder", assetsFolder)
    const { avatar } = req.files;
    try {
        console.log("Full path:", path.join(assetsFolder, avatar.name));
        avatar.mv(path.join(assetsFolder, avatar.name));
        res.status(200).json({avatar })
    } catch (e) {
        res.status(500).json({ message: e })
    }
}
)


const getBlog = asyncHandler(async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20)
    );
})



const createBlog = asyncHandler(async (req, res) => {
    console.log("createblog", req.body)
    const { title, summary, content, cover} = req.body;
    try{
        if (!title || !summary) {
            res.status(400);
            throw new Error("Title and Summary fileds are mandatory");
        }
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover,
        });
        console.log("postDoc" ,postDoc)
        res.status(201).json(postDoc);
    }catch(e){
        console.log("error in create Blog", e)
        res.status(500).json({ message: e })
    }

}
)

const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.status(200).json(postDoc);
}

)

const editBlog = asyncHandler(async (req, res) => {
    console.log("edit Blog", req.body)
    try{
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        console.log("postDoc", postDoc)
        await postDoc.update({
            title,
            summary,
            content,
        });
        res.status(200).json(postDoc);
    }catch(e){
        console.log("error in edit Blog", e)
        res.status(500).json({ message: e })
    }
 
})


module.exports = {
    createBlog,
    getBlog,
    getBlogById,
    editBlog,
    uploadImage
};
