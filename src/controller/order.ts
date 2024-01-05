import { Request, Response } from "express";
import sequelize from "../models/connection";
import Order from "../models/order";
import { QueryTypes } from "sequelize";

const repository = sequelize.getRepository(Order);

export const getOrders = async (_req: Request, res: Response) => {
  let orders: any[] = [];
  const order = await repository.findAll();
  for( let  element of order){
    const products = await sequelize.query(
      "SELECT producto.*, SUM(nevera.cantidad) as total_cantidad " +
        "FROM producto " +
        "JOIN nevera ON producto.idproducto = nevera.id_producto " +
        `WHERE nevera.id_pedido = ${element.dataValues.idpedido} ` +
        "GROUP BY producto.idproducto, producto.nombre;",
      { type: QueryTypes.SELECT }
    );
    console.log(products);
    orders.push({data: element.dataValues, products});
  };
  return res.status(200).json(orders);
};

export const getOrdersUser = async (req: Request, res: Response) => {
    let orders: any[] = [];
    const order = await repository.findAll({where: {id_cliente: req.params.id}});
    for( let  element of order){
      const products = await sequelize.query(
        "SELECT producto.*, SUM(nevera.cantidad) as total_cantidad " +
          "FROM producto " +
          "JOIN nevera ON producto.idproducto = nevera.id_producto " +
          `WHERE nevera.id_pedido = ${element.dataValues.idpedido} ` +
          "GROUP BY producto.idproducto, producto.nombre;",
        { type: QueryTypes.SELECT }
      );
      console.log(products);
      orders.push({data: element.dataValues, products});
    };
    return res.status(200).json(orders);
  };

export const getOrder = async (req: Request, res: Response) => {
    const order = await repository.findOne({where:{idpedido: req.params.id}})
    const products = await sequelize.query(
        "SELECT producto.*, SUM(nevera.cantidad) as total_cantidad " +
          "FROM producto " +
          "JOIN nevera ON producto.idproducto = nevera.id_producto " +
          `WHERE nevera.id_pedido = ${req.params.id} ` +
          "GROUP BY producto.idproducto, producto.nombre;",
        { type: QueryTypes.SELECT }
      );
  return res.status(201).json({order,products});
};

export const addOrder = async (req: Request, res: Response) => {
  const { id } = req.body.decodedToken;

  const newOrder = {
    id_cliente: id,
    fecha: new Date(),
    estado: "Proceso"
  }

  const order = await repository.create(newOrder).catch((error) => {
    return res.status(500).json({ error: error.name });
  });
  return res.status(201).json(order);
};

export const removeOrder = async (req: Request, res: Response) => {
  const order = await repository.update(
    { habilitado: false },
    { where: { idpedido: req.params.id } }
  );
  return res.status(201).json({ afectados: order[0], message: "Exitoso" });
};

export const updateOrder = async (req: Request, res: Response) => {
  const order = await repository.update(req.body, {
    where: { idpedido: req.params.id },
  });
  return res.status(201).json({ afectados: order[0], message: "Exitoso" });
};
