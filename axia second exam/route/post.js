const express = require('express');
const router = express.Router();
const {makePost, getAllPost, getPost, likePost} = require('../controllers/post')

router.post('/new-post', makePost);
router.get('/allpost', getAllPost);
router.get('/getpost/:id', getPost);
router.post('/postlike', likePost);



module.exports = router;          