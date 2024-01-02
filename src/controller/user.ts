import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

import sequelize from "../models/connection"
import User from "../models/user"

import StatusError from "../utils/StatusError"

const repository = sequelize.getRepository(User)

export const getProduct = (_req: Request, res: Response) => {
    return res.status(201).json({
        ok: true,
        menssage: "si llego"
    });
}

export const register = async (req: Request, res: Response) => {
    let { nombre, correo, contraseña, id_rol } = req.body

    try {
        const missingData = !nombre || !correo || !contraseña || !id_rol
        if (missingData) throw new StatusError(400)

        const emailExists = await repository.findOne({ where: { correo } })
        if (emailExists) throw new StatusError(409)

        const hashPwd = await bcrypt.hash(contraseña, 10)
        req.body.contraseña = hashPwd

        await repository.create(req.body)
        res.sendStatus(201)

    } catch (error) {

        if (error instanceof StatusError) {
            let message = '';

            if (error.code === 400) message = 'Missing nombre, correo, contraseña or rol'
            if (error.code === 409) message = 'Email exists'

            res.status(error.code).json({ error: message })
        } else {
            res.sendStatus(500)
        }
    }
}

export const login = async (req: Request, res: Response) => {
    let { correo, contraseña } = req.body

    try {
        const missingData = !correo || !contraseña
        if (missingData) throw new StatusError(400)

        const user = await repository.findOne({ where: { correo } })
        if (!user) throw new StatusError(401)

        const match = await bcrypt.compare(contraseña, String(user.contraseña))
        if (!match) throw new StatusError(401)

        const userForToken = {
            id: user.id,
            id_rol: user.id_rol,
            correo: user.correo
        }

        const accessToken = jwt.sign(
            userForToken,
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '1m' }
        )

        res.json({ accessToken })

    } catch (error) {
        if (error instanceof StatusError) {
            let message = '';

            if (error.code === 400) message = 'Missing correo or contraseña'
            if (error.code === 401) message = 'Unauthorized'

            res.status(error.code).json({ error: message })
        } else {
            console.log(error)
            res.sendStatus(500)
        }
    }
}