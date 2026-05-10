const Post =
    require("../models/postModel");

exports.showCreatePost = (req, res) => {

    res.render("posts/create");
};

exports.createPost = (req, res) => {

    const { title, content } = req.body;

    const user_id = req.user.id;

    Post.createPost(
        title,
        content,
        user_id,
        (err, result) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

             res.redirect("/posts");
        }
    );

};
exports.getAllPosts = (req, res) => {

    Post.getAllPosts((err, results) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("posts/index", {
            posts: results
        });
    });
};
exports.getSinglePost = (req,res)=>{

   const id = req.params.id;

   Post.getPostById(id,(err,results)=>{

      if(err){
         console.log(err);
         return res.send("Database Error");
      }

      if(results.length === 0){
         return res.send("Post Not Found");
      }

      res.render("posts/show",{
         post:results[0]
      });
   });
};
exports.showEditPost = (req,res)=>{

   const id = req.params.id;

   Post.getPostById(id,(err,results)=>{

      if(err){
         console.log(err);
         return res.send("Database Error");
      }

      if(results.length === 0){
         return res.send("Post Not Found");
      }

      const post = results[0];

      // OWNER CHECK
      if(post.user_id !== req.user.id){
         return res.send("Unauthorized");
      }

      res.render("posts/edit",{
         post
      });
   });
};
exports.updatePost = (req,res)=>{

   const id = req.params.id;

   const { title,content } = req.body;

   Post.getPostById(id,(err,results)=>{

      if(err){
         console.log(err);
         return res.send("Database Error");
      }

      const post = results[0];

      // OWNER CHECK
      if(post.user_id !== req.user.id){
         return res.send("Unauthorized");
      }

      Post.updatePost(
         id,
         title,
         content,
         (err,result)=>{

            if(err){
               console.log(err);
               return res.send("Update Error");
            }

            res.redirect("/posts/" + id);
         }
      );
   });
};
exports.deletePost = (req,res)=>{

   const id = req.params.id;

   Post.getPostById(id,(err,results)=>{

      if(err){
         console.log(err);
         return res.send("Database Error");
      }

      if(results.length === 0){
         return res.send("Post Not Found");
      }

      const post = results[0];

      // OWNER CHECK
      if(post.user_id !== req.user.id){
         return res.send("Unauthorized");
      }

      Post.deletePost(id,(err,result)=>{

         if(err){
            console.log(err);
            return res.send("Delete Error");
         }

         res.redirect("/posts");
      });
   });
};