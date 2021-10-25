const { json } = require('express')
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const Profile = require('../../models/Profile')

// @route       POST api/profiles
// @desc        Register profile
// @access      Public
router.post('/', [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check("email", "Please include email").isEmail(),
    check("password", "Enter password").isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req)                        // Checks request for errors

    if(!errors.isEmpty()){                                      // Checks if there are errors
        return res.status(400).json({ errors: errors.errors })
        // Returns a bad request message alongside errors array
    }

    const {firstName, lastName, email, password} = req.body

    try {
        // See if profile already exists
        let profile = await Profile.findOne({email})
        if(profile){
            res.status(400).json([{msg: "User Already Exists"}])
        }

        // Create Profile
        profile = new Profile({
            firstName,
            lastName,
            email,
            password
        })
        
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        profile.password = await bcrypt.hash(password, salt)
        console.log(profile)
        await profile.save()

        // Return JSON Web Token
    } catch (error) {
        
    }

    res.send(profile)
})

module.exports = router