import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import Jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;

    console.log(username, email, password);

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required.",
            success: false,
        });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({ username, email, password: hashedPassword })

    try {

        await newUser.save()

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
        });
    }

}


export const signin = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const validUser = await User.findOne({ email })

        if (!validUser) return next(errorHandler(404, 'User not found!'))

        const validPassword = bcryptjs.compareSync(password, validUser.password)

        if (!validPassword) return next(errorHandler(401, 'wrong credentials!'))

        const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)

    } catch (error) {
        next(error)
    }

}