import { Request, Response } from "express";
import sequelize from "../models/connection";
import Product from '../models/product';
import { QueryTypes } from "sequelize";

const repository = sequelize.getRepository(Product);

export const getProducts = async (_req: Request, res: Response) => {
    const product = await repository.findAll();
    return res.status(201).json(product);
}

export const getProduct = async (req: Request, res: Response) => {
    const product = await repository.findOne({where: {idproducto: req.params.id}});
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

export const mostSell = async (_req: Request, res: Response) => {
    const mostsell = await sequelize.query("SELECT `id_producto` as id, SUM(`cantidad`) as total From `nevera` group by `id_producto` Order by total desc;", { type: QueryTypes.SELECT });
    const products = await getData(mostsell);
    return res.status(201).json(products);
}

const getData = async (mostsell) =>{
    let products: any = [];
    for( const element of mostsell){
        products.push(await repository.findOne({where: {idproducto: element.id}}));
    }
    return products;
}