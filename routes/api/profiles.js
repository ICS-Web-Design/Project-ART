const { json } = require('express')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const Profile = require('../../models/ProfileSchema')
const auth = require('../../middleware/auth')

// @route       GET api/profiles/auth
// @desc        Returns authentication status
// @access      Private
router.post("/auth", auth, async (req, res) => {
    try{
        res.json(req.profile)
    } catch(err){
        res.json(err)
        console.log(err)
    }
})

// @route       POST api/profiles/me
// @desc        Get current users profile
// @access      Private
router.post("/me", auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({email: req.body.email})
        if(!profile){
            return res.status(400).json({ msg: "There is no profile for this user"})
        }

        res.json(profile)
    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route       POST api/profiles
// @desc        Register profile
// @access      Public
router.post('/', [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check("email", "Please include email").isEmail(),
    check("password", "Enter password").isLength({ min: 6 }),
    check('classOf', 'Graduation year is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req)                        // Checks request for errors

    if(!errors.isEmpty()){                                      // Checks if there are errors
        return res.status(400).json({ errors: errors.errors })
        // Returns a bad request message alongside errors array
    }

    const {firstName, lastName, email, password, classOf} = req.body

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
            classOf
        })
        
        // Encrypt password
        const salt = await bcrypt.genSalt(8);
        profile.password = await bcrypt.hash(password, salt)
        profile.markModified('password')
        await profile.save()

        // Encode profile ID into JSON Web Token
         const payload = {
            profile: {
                id: profile.id
            }
        }

        // Return JWT
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 1800}, (err, token) => {
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
// @desc        Get all profiles
// @access      Public

router.get('/', async (req, res) => {
    let profiles = await Profile.find()

    // Remove email and encrypted password before returning profiles
    let profileList = []

    profiles.map((prof) => {                // Loop through each profile in the array

        profileList.push({                  // Append desired fields to the profileList object
            firstName : prof.firstName,
            lastName : prof.lastName,
            id: prof.id,
            classOf : prof.classOf,
            journals : prof.journals,
            artworks : prof.artworks,
            collections : prof.collections
        })

    })
    res.json(profileList)                   // Return profiles after excluding email and password
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

// @route       POST api/profiles/login
// @desc        Login user
// @access      Public
router.post("/login", [
    check("email", "Please include email").isEmail(),
    check("password", "Enter password").exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    if(req.body == null){
        res.status(400).json({ error: "Bad Request"})
    }

    try{
        if(req.body != null){
            const {email, password } = req.body
        
        // See if user exists
            let profile = await Profile.findOne({email})

            if(!profile){
                res.status(400).json({ errors: [{msg: "Invalid Credentials - Please Try Again"}]})
            }


            const isMatch = await bcrypt.compare(password, profile.password)
            if(!isMatch){
                res.status(400).json({ errors: [{msg: "Invalid Credentials"}]})
            }

        // Return JSON webtoken
            const payload = {
                profile: {
                    id: profile.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 1800}, (err, token) => {
                if(err){
                    throw err
                } else {
                    res.json({token})
                }
            })
        }
    } catch(err){
        console.log(err.message)
        // res.status(500).send('Server Error...wddwwd')
    }

})

// @route       GET api/profiles/stats/all
// @desc        Get profiles stats
// @access      Public

router.get("/stats/all", async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        let profiles = await Profile.find()

        let profileStats = [["Name", "Class", "Artworks", "Journals", "Collections"]]

        profiles.forEach((profile) => {
            profileStats.push([profile.firstName + " " + profile.lastName, profile.classOf, profile.artworks.length, profile.journals.length, profile.collections.length])
        })

        profiles = ""

        res.json(profileStats)

    } catch (error) {
        
    }

    

})


module.exports = router

