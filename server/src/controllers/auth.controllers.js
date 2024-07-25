// const User = require("../models/User.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const Blacklist = require("../models/Blacklist.js")
const jwt = require("jsonwebtoken");
const { SECRET_ACCESS_TOKEN } = require('../config/index.js');

exports.registerController = async (req, res) => {
    // get required variables from request body
    // using es6 object destructing
    const { first_name, last_name, email, password } = req.body;
    try {
        console.log({ first_name, last_name, email, password })
        // create an instance of a user
        const newUser = new User({
            first_name,
            last_name,
            email,
            password,
        });
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",
            });
        const savedUser = await newUser.save(); // save new user into the database
        const { role, ...user_data } = savedUser._doc;
        res.status(200).json({
            status: "success",
            data: [user_data],
            message:
                "Thank you for registering with us. Your account has been successfully created.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
    res.end();
}

exports.loginController = async (req, res) => {
    // Get variables for the login process
    const { email } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Account does not exist",
            });
        // if user exists
        // validate password
        const isPasswordValid = await bcrypt.compare(
            `${req.body.password}`,
            user.password
        );
        // if not valid, return unathorized response
        if (!isPasswordValid)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password. Please try again with the correct credentials.",
            });

        let options = {
            maxAge: 20 * 60 * 1000, // would expire in 20minutes
            httpOnly: true, // The cookie is only accessible by the web server
            secure: true,
            sameSite: "None",
        };
        const token = user.generateAccessJWT(); // generate session token for user
        res.cookie("SessionID", token, options); // set the token to response header, so that the client sends it back on each subsequent request
        res.status(200).json({
            status: "success",
            message: "You have successfully logged in.",
        });
        // return user info except password
        // const { password, ...user_data } = user._doc;

        // res.status(200).json({
        //     status: "success",
        //     data: [user_data],
        //     message: "You have successfully logged in.",
        // });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
    res.end();
}

exports.logoutController = async (req, res) => {
    try {
        const authHeader = req.headers['cookie']; // get the session cookie from request header
        if (!authHeader) return res.sendStatus(204); // No content
        const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
        const accessToken = cookie.split(';')[0];
        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
        // if true, send a no content response.
        if (checkIfBlacklisted) return res.sendStatus(204);
        // otherwise blacklist token
        const newBlacklist = new Blacklist({
            token: accessToken,
        });
        await newBlacklist.save();
        // Also clear request cookie on client
        res.setHeader('Clear-Site-Data', '"cookies"');
        res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
}

exports.ProfileUser = async (req, res) => {
    try {
        const user = req.user; // we have access to the user object from the request
        // const { _id } = user; // extract the user role
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            status: "success",
            data: [user],
            message: "Get profile user success"
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
    res.end()
}


exports.UpdateProfile = async (req, res) => {
    const user = req.user;
    const { _id } = user;
    const { email } = req.body;
    try {
        const updateData = req.body;

        if (!user) {
            return res.status(404).json({
                status: "failed",
                data: [],
                message: "User not found",
            });
        }
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    status: "failed",
                    data: [],
                    message: "Email already in use by another account",
                });
            }
        }

        if (req.file) {
            updateData.avatar = req.file.path; // Lưu đường dẫn ảnh đại diện vào updateData
        }

        const updatedUser = await User.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            status: "success",
            code: 200,
            data: [updatedUser],
            message: "Update profile success"
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [user],
            message: "Internal Server Error",
        });
    }
    res.end();
}

