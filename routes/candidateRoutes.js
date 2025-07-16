const express = require('express');
const router = express.Router();

constCandidate = require('../models/Candidate');
const {jwtAuthenticate, generateToken} = require('../jwt');
const Candidate = require('../models/Candidate');
const User = require('../models/User');


const checkAdminRole = async (userId) =>{
    try {
        const user = await User.findById(userId);
        return  user.role === 'admin';
    } catch (error) {
        console.error('Error checking admin role:', error);
        throw new Error('Internal Server Error');
        
    }
}

router.post('/',jwtAuthenticate, async (req, res) => {
    try{

        if(!await checkAdminRole(req.user.id)){
            return res.status(403).json({error: 'Forbidden: Only admins can create candidates'});
        }
        const data = req.body;
        const newCandidate = new Candidate(data);
        const response = await newCandidate.save();


        console.log("data saved successfully");

        res.status(201).json({
            message: 'Candidate created successfully',
           Candidate: response,
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});






router.put('/:candidateId',jwtAuthenticate, async (req, res) => {
    try {

       
        if(!checkAdminRole(req.user.id)){
            return res.status(403).json({error: 'Forbidden: Only admins can create candidates'});
        }
        const candidateId = req.params.candidateId;
        const data = req.body;

        const response = await Candidate.findByIdAndUpdate(candidateId, data, {new: true});

        if (!response) {
            return res.status(404).json({error: 'Candidate not found'});
        }
        console.log("data updated successfully");

        res.status(201).json({
            message: 'Candidate Updated successfully',
           Candidate: response,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
        
    }
})


router.delete('/:candidateId',jwtAuthenticate, async (req, res) => {
    try {

       
        if(!checkAdminRole(req.user.id)){
            return res.status(403).json({error: 'Forbidden: Only admins can create candidates'});
        }
        const candidateId = req.params.candidateId;

        const response = await Candidate.findByIdAndDelete(candidateId);

        if (!response) {
            return res.status(404).json({error: 'Candidate not found'});
        }
        console.log("data Deleted successfully");

        res.status(201).json({
            message: 'Candidate Deleted successfully',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
        
    }
})


router.post('/vote/:candidateId', jwtAuthenticate, async (req, res) => {
     const candidateId = req.params.candidateId;
    const userId = req.user.id;

    try {
        //no admin can vote
        //only user can vote
       const  candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

       const  user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user has already voted
        if (user.isVoted) {
            return res.status(400).json({ error: 'You have already voted' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ error: 'Admins cannot vote' });
        }

        // Add the user's ID to the candidate's votes array
        candidate.votes.push({user: userId});
        candidate.voteCount++;
        await candidate.save();


        user.isVoted = true;
        await user.save();
        console.log("Vote cast successfully");

        res.status(200).json({
            message: 'Vote cast successfully',
            candidate: candidate,
        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

})

router.get('/vote/count', async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ voteCount: 'desc' });

        const voteRecord = candidates.map((data)=>{
            return{
                party: data.party,
                voteCount: data.voteCount
            }
        });

       return res.status(200).json({
            message: 'Vote counts fetched successfully',
            voteCounts: voteRecord,
        });


    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/', async (req, res) => {
    try {
       const candidate = await Candidate.find();

        if(!candidate || candidate.length === 0) {
            return res.status(404).json({ error: 'No candidates found' });
        }

        console.log("Candidates fetched successfully");
        
        return res.status(200).json({
            message: 'Candidates fetched successfully',
            candidates: candidate,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
       
module.exports = router;