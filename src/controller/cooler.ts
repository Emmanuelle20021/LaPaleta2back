import { Request, Response } from "express";
import sequelize from "../models/connection";
import Cooler from "../models/cooler";

const repository = sequelize.getRepository(Cooler);

export const getCoolers = async (_req: Request, res: Response) => {
    const cooler = await repository.findAll();
    return res.status(201).json(cooler);
}

export const getCooler = async (req: Request, res: Response) => {
    const cooler = await repository.findOne({ where: { idnevera: req.params.id } });
    return res.status(201).json(cooler);
}

export const addCooler = async (req: Request, res: Response) => {

    const { id_pedido, productos } = req.body
    const details: Cooler[] = []

    try {
        for (let pdt of productos) {
            const detail = await repository.create({
                id_pedido, 
                id_producto: pdt.id, 
                cantidad: pdt.amount 
            })
    
            details.push(detail)
        }

        res.status(201).json(details)

    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: error.name })
    }
}

export const removeCooler = async (req: Request, res: Response) => {
    const cooler = await repository.update({ habilitado: false},{where: {idnevera: req.params.id}});
    return res.status(201).json({ afectados: cooler[0] , message: "Exitoso"});
}

export const updateCooler = async (req: Request, res: Response) => {
    const cooler = await repository.update(req.body,{where: {idnevera: req.params.id}});
    return res.status(201).json({ afecatados: cooler[0] , message: "Exitoso"});
}