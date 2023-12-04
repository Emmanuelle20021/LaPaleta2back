import { Request, Response } from "express";
import Role from "../models/role";
import sequelize from "../models/connection";

const repository = sequelize.getRepository(Role);

export const getRoles = async (_req: Request, res: Response) => {
    const role = await repository.findAll();
    return res.status(201).json(role);
}

export const getRole = async (req: Request, res: Response) => {
    const role = await repository.findOne({where: {idrol: req.params.id}});
    return res.status(201).json(role);
}

export const addRole = async (req: Request, res: Response) => {
    const role = await repository.create(req.body);
    return res.status(201).json(role);
}

export const removeRole = async (req: Request, res: Response) => {
    const role = await repository.update({ habilitado: false},{where: {idrol: req.params.id}});
    return res.status(201).json({ id: role[0] , message: "Exitoso"});
}

export const updateRole = async (req: Request, res: Response) => {
    const role = await repository.update(req.body,{where: {idrol: req.params.id}});
    return res.status(201).json({ id: role[0] , message: "Exitoso"});
}