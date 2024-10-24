import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;

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

    }

}


export const signin = () => {
    
}