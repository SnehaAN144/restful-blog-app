const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const postController =
    require("../controllers/postController");

router.get(
    "/dashboard",
    verifyToken,
    (req, res) => {
        res.send("Welcome to Dashboard");
    }
);

router.get(
    "/posts/create",
    verifyToken,
    postController.showCreatePost
);

router.post(
    "/posts/create",
    verifyToken,
    postController.createPost
);
router.get(
    "/posts",
    postController.getAllPosts
);
router.get(
   "/posts/:id",
   postController.getSinglePost
);
router.get(
   "/posts/edit/:id",
   verifyToken,
   postController.showEditPost
);

router.post(
   "/posts/edit/:id",
   verifyToken,
   postController.updatePost
);
router.post(
   "/posts/delete/:id",
   verifyToken,
   postController.deletePost
);
module.exports = router;