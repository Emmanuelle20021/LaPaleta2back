import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

import sequelize from "../models/connection"
import User from "../models/user"

import StatusError from "../utils/StatusError"

const repository = sequelize.getRepository(User)

export const getUsers = async (_req: Request, res: Response) => {
    const user = await repository.findAll();
    return res.status(201).json(user);
}

export const getUser = async (req: Request, res: Response) => {
    const user = await repository.findOne({where: {idusuario: req.params.id}});
    return res.status(201).json(user);
}

export const addUser = async (req: Request, res: Response) => {
    const user = await repository.create(req.body).catch((error) => {
        return res.status(500).json({error : error.name})
    });
    return res.status(201).json(user);
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

       const response = await repository.create(req.body)
        res.status(201).json(response)
        console.log('ok')
         
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
            id: user.idusuario,
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

export const removeUser = async (req: Request, res: Response) => {
    const user = await repository.update({ habilitado: false},{where: {idusuario: req.params.id}});
    return res.status(201).json({ afectados: user[0] , message: "Exitoso"});
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.body.decodedToken;

    if(req.body.contraseña) {
        const hashPwd = await bcrypt.hash(req.body.contraseña, 10)
        req.body.contraseña = hashPwd
    }

    const user = await repository.update(req.body,{where: {idusuario: id}});
    return res.status(201).json({ afectados: user[0] , message: "Exitoso"});
}

export const verifyPassword = async (req: Request, res: Response) => {
    try {
        if(!req.body.contraseña) throw new StatusError(400) 
        const { id } = req.body.decodedToken;
        const user = await repository.findOne({where: {idusuario: id}});

        if(!user) throw new StatusError(401)

        const match = await bcrypt.compare(req.body.contraseña, String(user.contraseña))
        if (!match) throw new StatusError(401)

        return res.sendStatus(200);            
    } catch (error) {
        if (error instanceof StatusError) {
            let message = '';

            if (error.code === 400) message = 'Missing contraseña'
            if (error.code === 401) message = 'Unauthorized'

            res.status(error.code).json({ error: message })
        } else {
            console.log(error)
            res.sendStatus(500)
        }
    }
}