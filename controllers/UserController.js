const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
var jwt = require('jsonwebtoken');

class UserController {

    static register = async(req,res) => {
        try {
            // console.log(req.body);
            const { name, email, password } = req.body

            if (name == '' || email == '' || password == '') {
                res.status(401).json({ 'status': 'failed', 'message': 'All Fields are Required' })
            } else {
                const isUserExist = await UserModel.findOne({ email: email })

                if (isUserExist) {
                    res.status(401).json({ 'status': 'failed', 'message': 'User Already Exist with this Email' })
                } else {     
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt)
        
                    const data = new UserModel({
                        name: name,
                        email: email,
                        password: hashPassword,
                    })
        
                    const dataSaved = await data.save()
        
                    if (dataSaved) {
                        res.status(201).json({ 'status': 'success', 'message': 'Registration Successful!' })
                    } else {
                        res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
                    }
                } 
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static login = async(req,res) => {
        try {
            // console.log(req.body);
            const { email, password } = req.body

            if (email && password) {
                const user = await UserModel.findOne({ email: email })

                if (user != null) {
                    const isPasswordMatched = await bcrypt.compare(password, user.password)

                    if ((user.email === email) && isPasswordMatched) {
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)
                        // console.log(token);
                        res.cookie('token', token)

                        res.status(201).json({ 'status': 'success', 'message': 'Login Successfully with Web Token!', token, user })
                    } else {
                        res.status(401).json({ 'status': 'failed', 'message': 'User not Found!' })
                    }
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Email not Found!' })
                }
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'All Fields are required!' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static logout = async(req,res) => {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now())
            })

            res.status(201).json({ success: true, message: 'Logged Out' })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

}
module.exports = UserController