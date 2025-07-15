const express = require('express');
const router = express.Router();

const User = require('../models/User');
const {jwtAuthenticate, generateToken} = require('../jwt');

router.post('/signup', async (req, res) => {
    try{
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();


        console.log("data saved successfully", response);

        const payload = {
            id: response._id
        };

        const token = generateToken(payload);
        console.log("Token is :", token);


        res.status(201).json({
            message: 'User created successfully',
            User: response,
            token: token
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});


router.post('/login', async (req, res) => {
    try {
        // Extract username and password from request body
        const { adharCardNumber, password } = req.body;

        // Find the User by username
        const user = await User.findOne({ adharCardNumber: adharCardNumber });
       

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        //generate JWT token

        const payload = {
            id: user._id
        };

        const token = generateToken(payload);

        res.status(200).json({
            message: 'Login successful',
            User: user,
            token: token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
    
})


router.get('/profile', jwtAuthenticate, async (req, res) => {
    try {
        const userData = req.user;
        const userId = userData.id;

        const user = await User.findById(userId);

        res.status(200).json({
            message: 'User profile fetched successfully',
            user: user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/',jwtAuthenticate, async (req, res) =>{
    try{
        const data = await User.find();
        res.status(200).json({
            message: 'All Users fetched successfully',
            Users: data
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }   
})


router.put('/:profile/password', async (req, res) => {
    try {
        const UserId = req.user;
        const {currentPassword, newPassword} = req.body;
        const user = await User.findById(UserId.id);


        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }
        user.password = newPassword;
        const updatedUser = await user.save();  
        console.log('Password updated successfully', updatedUser);
        
        res.status(200).json({
            message: 'Password updated successfully',
        }) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
        
    }
})




module.exports = router;