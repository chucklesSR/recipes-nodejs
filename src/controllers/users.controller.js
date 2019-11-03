const User = require('../models/User')

const signup = async ( req, res ) => {
    const { name, email, password, confirm_password } = req.body
    const errors = []
    if(!name){
        errors.push({text: 'Please type a Name'})
    }
    if(!email){
        errors.push({text: 'Please type a Email'})
    }
    if(!password){
        errors.push({text: 'Please type a Password'})
    }
    if(!confirm_password){
        errors.push({text: 'Please type a Confirm Password'})
    }
    if(password !== confirm_password){
        errors.push({text: 'Password do not match'})
    }
    if(password.length < 4){
        errors.push({text: 'Password must be at least 4 characters'})
    }
    const emailUser = await User.findOne({email: email})
    if(emailUser){
        errors.push({text: 'the Email is already in use'})
    }
    if(errors.length > 0){
        res.render('users/signup',{
            errors,
            name,
            email,
            password,
            confirm_password
        })
    }
    else{
        const newUser = new User({name,email,password})
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        req.flash('success_msg', 'You are registered')
        res.redirect('/users/login')
    }
}

module.exports = {
    signup
}