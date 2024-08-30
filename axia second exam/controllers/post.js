const postModel = require('../models/postSchema');


const makePost = async (req, res) => {
   const body = req.body; 
   const newPost = new postModel(body);
   try {
    await newPost.save();
    res.json({message: "Post successfully created"})
   }
   catch (error) {
    res.json({error: "cannot create post"})
    console.log(error);
   }
}

const getAllPost = async (req, res) => {
    try {
      const allPost = await postModel.find();
      res.json(allPost);
    }
    catch (error) {
      res.status(500).json({error: "cannot get posts"});
    }
}



const getPost = async (req, res) => {
    const {id} = req.params;
    try {
      const getPost = await postModel.findById(id);
      res.json(getPost);

    }
    catch (error) {
      res.status(500).json({error: "Cannot get post id"})
    }
}





//add like feature 

const likePost = async (req, res) => {
  const { id, name } = req.body; 

  try {
    const thePost = await postModel.findById(id);

    if (!thePost) {
      return res.json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    const gottenLikes = thePost.likes;
    const checkUserInArray = gottenLikes.includes(name);

    if (!checkUserInArray) {
      gottenLikes.push(name);
    } else {
      const index = gottenLikes.indexOf(name);
      gottenLikes.splice(index, 1); 
    }

    thePost.likes = gottenLikes;
    await thePost.save(); 

    res.json({ message: "Post like status updated", post: thePost }); 

  } catch (error) {
    res.json({ error: "Error processing like/unlike" });
  }
};




module.exports = {makePost, getAllPost, getPost, likePost};
