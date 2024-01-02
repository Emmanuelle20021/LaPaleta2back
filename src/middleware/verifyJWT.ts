import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import 'dotenv/config'
import StatusError from "../utils/StatusError";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers['authorization']
        if (!authHeader) throw new StatusError(401)

        const token = authHeader.split(' ')[1]
        if (!token) throw new StatusError(401)

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
        req.body = {...req.body, decodedToken} 

        next()
    } catch (error) {
        if (error instanceof StatusError) {
            if (error.code === 401) res.status(401).json({ error: 'Missing or invalid token' })
        } else if (error instanceof jwt.JsonWebTokenError || jwt.TokenExpiredError || jwt.NotBeforeError) {
            res.status(401).json({ error: 'Invalid token' })
        } else {
            res.sendStatus(500)
        }
    }
}
