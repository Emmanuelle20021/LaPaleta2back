import { Request, Response } from "express";
import sequelize from "../models/connection";
import User from "../models/user";

const repository = sequelize.getRepository(User);

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

export const removeUser = async (req: Request, res: Response) => {
    const user = await repository.update({ habilitado: false},{where: {idusuario: req.params.id}});
    return res.status(201).json({ afectados: user[0] , message: "Exitoso"});
}

export const updateUser = async (req: Request, res: Response) => {
    const user = await repository.update(req.body,{where: {idusuario: req.params.id}});
    return res.status(201).json({ afectados: user[0] , message: "Exitoso"});
}