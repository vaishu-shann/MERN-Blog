const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel")
const fs = require('fs');


const getBlog = asyncHandler(async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20)
    );
})

const createBlog = asyncHandler(async (req, res) => {
    const { title, summary, content } = req.body;
    if (!title || !summary) {
        res.status(400);
        throw new Error("Name and Summary fileds are mandatory");
    }
    const postDoc = await Post.create({
        title,
        summary,
        content,
       
    });
    res.status(201).json(postDoc);
}
)

const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.status(200).json(postDoc);
}

)

const editBlog = asyncHandler(async (req, res) => {
    console.log("edit Blog" , req.body)
    const { id,title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    console.log("postDoc" ,postDoc)
    await postDoc.update({
        title,
        summary,
        content,
    });
    res.status(200).json(postDoc);
})


module.exports = {
    createBlog,
    getBlog,
    getBlogById,
    editBlog
};
