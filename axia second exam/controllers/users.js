const userModel = require('../models/usersSchema')
const bcrypt = require('bcryptjs');

//create user
const register = async (req, res) => {
    try {
        const { userName, password, email, gender, age } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = new userModel({
            userName,
            password: hashPassword,
            email,
            gender,
            age
        });

        const saveUser = await newUser.save();
        res.status(201).json(saveUser);

    } catch (err) {
        res.status(500).json({ error: "Unable to create user" });
    }
}



//login 
const loginUser = async (req, res) => {
    //checking if email matches
    const {email, password} = req.body 
    try {
      const userInfo = await userModel.findOne({email}).select('-_id');
      if(!userInfo) {
        return res.status(500).json({message: "unable to find user"})
      };
    //checking if password matches
    const verify = bcrypt.compareSync(password, userInfo.password);
    console.log(verify);
    if(!verify) {
        return res.status(401).json({ message: "Password does not match" });
    }
    res.status(200).json(userInfo);
    }
    catch (err) {
       res.status(500).json({ error: "Failed to login" });
        console.log(err);
    }
}





module.exports = {register, loginUser};