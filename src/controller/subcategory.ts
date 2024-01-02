import { Request, Response } from "express";
import sequelize from "../models/connection";
import Subcategory from "../models/subcategory";

const repository = sequelize.getRepository(Subcategory);

export const getSubcategories = async (_req: Request, res: Response) => {
    const subcategory = await repository.findAll();
    return res.status(201).json(subcategory);
}

export const getSubcategory = async (req: Request, res: Response) => {
    const subcategory = await repository.findOne({where: {idsubcategoria: req.params.id}});
    return res.status(201).json(subcategory);
}

export const addSubcategory = async (req: Request, res: Response) => {
    const subcategory = await repository.create(req.body).catch((error) => {
        return res.status(500).json({error : error.name})
    });
    return res.status(201).json(subcategory);
}

export const removeSubcategory = async (req: Request, res: Response) => {
    const subcategory = await repository.update({ habilitado: false},{where: {idsubcategoria: req.params.id}});
    return res.status(201).json({ afectados: subcategory[0] , message: "Exitoso"});
}

export const updateSubcategory = async (req: Request, res: Response) => {
    const subcategory = await repository.update(req.body,{where: {idsubcategoria: req.params.id}});
    return res.status(201).json({ afectados: subcategory[0] , message: "Exitoso"});
}