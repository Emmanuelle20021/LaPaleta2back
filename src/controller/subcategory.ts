import { Request, Response } from "express";


export const getProduct = (_req: Request, res: Response) => {
    return res.status(201).json({
        ok: true,
        menssage: "si llego"
    });
}