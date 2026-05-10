const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.showRegister = (req,res)=>{
   res.render("auth/register");
};

exports.showLogin = (req,res)=>{
   res.render("auth/login");
};

exports.registerUser = async(req,res)=>{

   const { username,email,password } = req.body;

   try{

      const hashedPassword =
      await bcrypt.hash(password,10);

      User.createUser(
         username,
         email,
         hashedPassword,
         (err,result)=>{

            if(err){
               console.log(err);
               return res.send("Database Error");
            }

            res.redirect("/login");
         }
      );

   } catch(error){

      console.log(error);
      res.send("Error");
   }
};

exports.loginUser = (req,res)=>{

   const { email,password } = req.body;

   User.findUserByEmail(email,
   async(err,result)=>{

      if(err){
         console.log(err);
         return res.send("Database Error");
      }

      if(result.length === 0){
         return res.send("User not found");
      }

      const user = result[0];

      const isMatch =
      await bcrypt.compare(password,user.password);

      if(!isMatch){
         return res.send("Invalid Password");
      }

      const token = jwt.sign(
         {
            id:user.id
         },
         process.env.JWT_SECRET,
         {
            expiresIn:"1d"
         }
      );

      res.cookie("token",token);
      res.redirect("/posts");
      
   });
};
exports.logoutUser = (req,res)=>{

   res.clearCookie("token");

   res.redirect("/login");
};