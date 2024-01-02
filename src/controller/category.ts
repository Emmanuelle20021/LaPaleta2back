import { Request, Response } from "express";
import sequelize from "../models/connection";
import Category from "../models/category";

const repository = sequelize.getRepository(Category);

export const getCategories = async (_req: Request, res: Response) => {
    const category = await repository.findAll();
    return res.status(201).json(category);
}

export const getCategory = async (req: Request, res: Response) => {
    const category = await repository.findOne({where: {idcategoria: req.params.id}});
    return res.status(201).json(category);
}

export const addCategory = async (req: Request, res: Response) => {
    const category = await repository.create(req.body).catch((error) => {
        return res.status(500).json({error : error.name})
    });
    return res.status(201).json(category);
}

export const removeCategory = async (req: Request, res: Response) => {
    const category = await repository.update({ habilitado: false},{where: {idcategoria: req.params.id}});
    return res.status(201).json({ afectados: category[0] , message: "Exitoso"});
}

export const updateCategory = async (req: Request, res: Response) => {
    const category = await repository.update(req.body,{where: {idcategoria: req.params.id}});
    return res.status(201).json({ afectados: category[0] , message: "Exitoso"});
}