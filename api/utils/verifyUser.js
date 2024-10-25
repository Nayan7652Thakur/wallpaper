import { errorHandler } from "./error.js";
import Jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {

   const token = req.cookie.access_token;

   if (!token) {
        return next(errorHandler(401, 'Unauthorized'))
   }

   Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
        return next(errorHandler(403, 'Foridden'))
    }

  req.user = user;

  next()

   })

}