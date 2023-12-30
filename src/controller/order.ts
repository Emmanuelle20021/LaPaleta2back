import { Request, Response } from "express";
import sequelize from "../models/connection";
import Order from "../models/order";

const repository = sequelize.getRepository(Order);

export const getOrders = async (_req: Request, res: Response) => {
    const order = await repository.findAll();
    return res.status(201).json(order);
}

export const getOrder = async (req: Request, res: Response) => {
    const order = await repository.findOne({where: {idpedido: req.params.id}});
    return res.status(201).json(order);
}

export const addOrder = async (req: Request, res: Response) => {
    const order = await repository.create(req.body).catch((error) => {
        return res.status(500).json({error : error.name})
    });
    return res.status(201).json(order);
}

export const removeOrder = async (req: Request, res: Response) => {
    const order = await repository.update({ habilitado: false},{where: {idpedido: req.params.id}});
    return res.status(201).json({ afectados: order[0] , message: "Exitoso"});
}

export const updateOrder = async (req: Request, res: Response) => {
    const order = await repository.update(req.body,{where: {idpedido: req.params.id}});
    return res.status(201).json({ afectados: order[0] , message: "Exitoso"});
}