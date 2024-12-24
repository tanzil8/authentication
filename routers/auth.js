import express from "express";
import User from "../models/user.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const joiSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    password: Joi.string().min(3),

  fullName: Joi.string().alphanum().min(3).max(30).required(),


});

const loginSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    password: Joi.string().min(3),




});

const router = express.Router();

router.post("/register", async function (req, res) {
  const { error, value } = joiSchema.validate(req.body);
  console.log(error);
  
  if (error) {
    return res.status(404).json({ message: "invalid credintial" });
  }
console.log(value);

const existUser = await User.findOne({email: value.email})
if (existUser) {
    return res.status(402).json({ message: "user already exist" });
}

const hashPassword = await bcrypt.hash(value.password, 10)
console.log("hashPassword", hashPassword);
value.password = hashPassword

let newUer = new User({...value})
newUer = await newUer.save()

res.status(202).json({ message: "user register successFull" , newUer: newUer})
  res.send('yes');
});



router.post("/login", async function (req, res) {
  const { error, value } = loginSchema.validate(req.body);
  console.log(error);
  
  if (error) {
    return res.status(404).json({ message: "invalid credintial" });
  }
console.log(value);

const existUser = await User.findOne({email: value.email}).lean()
if (!existUser) {
    return res.status(402).json({ message: "user is not register" });
}

var token = jwt.sign(existUser,  process.env.JWT_SECRET);
console.log("token",token);




return res.status(202).json({ message: "user register successFull" , token: token, User: existUser})

});





export default router;
