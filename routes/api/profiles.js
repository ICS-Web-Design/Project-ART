const { json } = require('express')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const Profile = require('../../models/Profile')

// @route       POST api/profiles
// @desc        Register profile
// @access      Public
router.post('/', [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check("email", "Please include email").isEmail(),
    check("password", "Enter password").isLength({ min: 6 }),
    check('grade', 'Grade is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req)                        // Checks request for errors

    if(!errors.isEmpty()){                                      // Checks if there are errors
        return res.status(400).json({ errors: errors.errors })
        // Returns a bad request message alongside errors array
    }

    const {firstName, lastName, email, password, grade} = req.body

    try {
        
        // See if profile already exists
        let profile = await Profile.findOne({email})

        if(profile){
            res.status(400).json({errors: [{msg: "User Already Exists"}]})
        }
        
        // Create Profile
        profile = new Profile({
            firstName,
            lastName,
            email,
            password,
            grade
        })
        
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        profile.password = await bcrypt.hash(password, salt)
        await profile.save()                                    // WHY THE FUCK DOESNT THIS WORK?
        console.log("GREAT SUCCESS")

        // Return JSON webtoken
         const payload = {
            profile: {
                id: profile.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000}, (err, token) => {
            if(err){
                throw err
            } else {
                res.json({token})
            }
        })
    } catch (error) {

    }

})

// @route       GET api/profiles
// @desc        Get all profile
// @access      Public

router.get('/', async (req, res) => {
    let profiles = await Profile.find()
    res.json(profiles)
})

// @route       GET api/profiles/:id
// @desc        Get profile
// @access      Public
router.get('/:id', async (req, res) => {
    
    try{

        let profile = await Profile.findById(req.params.id)     // Find profile by id

        if(!profile){
            return res.status(400).json("Profile not found")
        }

        res.json(profile)

    } catch(err){
        if(err.kind = "ObjectId"){
            return res.status(400).json("Profile not found")
        }
    }

})




module.exports = router