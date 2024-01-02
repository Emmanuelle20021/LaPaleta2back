import { Request, Response } from "express";
import sequelize from "../models/connection";
import Product from "../models/product";

const repository = sequelize.getRepository(Product);

export const getProducts = async (_req: Request, res: Response) => {
    const product = await repository.findAll();
    return res.status(201).json(product);
}

export const getProduct = async (req: Request, res: Response) => {
    const product = await repository.findOne({where: {id_categoria: req.params.id}});
    return res.status(201).json(product);
}

export const addProduct = async (req: Request, res: Response) => {
    const product = await repository.create(req.body).catch((error) => {
        return res.status(500).json({error : error.name})
    });
    return res.status(201).json(product);
}

export const removeProduct = async (req: Request, res: Response) => {
    const product = await repository.update({ habilitado: false},{where: {idproducto: req.params.id}});
    return res.status(201).json({ afectados: product[0] , message: "Exitoso"});
}

export const updateProduct = async (req: Request, res: Response) => {
    const product = await repository.update(req.body,{where: {idproducto: req.params.id}});
    return res.status(201).json({ afectados: product[0] , message: "Exitoso"});
}