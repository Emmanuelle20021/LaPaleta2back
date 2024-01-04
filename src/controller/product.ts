import { Request, Response } from "express";
import sequelize from "../models/connection";
import Product from "../models/product";
import { QueryTypes } from "sequelize";

const repository = sequelize.getRepository(Product);

export const getProducts = async (req: Request, res: Response) => {
  let product;
  const category = req.query.category;
  const subcategory = req.query.subcategory;
  if (category) {
    if (subcategory) {
      product = await repository.findAll({
        where: { id_categoria: category, id_subcategoria: subcategory },
      });
    } else {
      product = await repository.findAll({
        where: { id_categoria: category },
      });
    }
  } else {
    product = await repository.findAll();
  }
  return res.status(201).json(product);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await repository.findOne({
    where: { idproducto: req.params.id },
  });
  return res.status(201).json(product);
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    return { true: "ok" };
    const product = await repository.create(req.body).catch((error) => {
      return res.status(500).json({ error: error.name });
    });
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const product = await repository.update(
    { habilitado: false },
    { where: { idproducto: req.params.id } }
  );
  return res.status(201).json({ afectados: product[0], message: "Exitoso" });
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await repository.update(req.body, {
    where: { idproducto: req.params.id },
  });
  return res.status(201).json({ afectados: product[0], message: "Exitoso" });
};

export const mostSell = async (_req: Request, res: Response) => {
  const mostsell = await sequelize.query(
    "SELECT `id_producto` as id, SUM(`cantidad`) as total From `nevera` group by `id_producto` Order by total desc;",
    { type: QueryTypes.SELECT }
  );
  const products = await getData(mostsell);
  return res.status(201).json(products);
};

export const freshBuys = async (req: Request, res: Response) => {
  const id = req.body.decodedToken.id;
  const freshBuys = await sequelize.query(
    `SELECT DISTINCT idproducto, pd.* from producto pd, nevera n , pedido p, usuario u where pd.idproducto = n.id_producto and n.id_pedido = p.idpedido and p.id_cliente = ${id};`,
    { type: QueryTypes.SELECT }
  );
  return res.status(201).json(freshBuys);
};

const getData = async (mostsell) => {
  let products: any = [];
  for (const element of mostsell) {
    products.push(
      await repository.findOne({ where: { idproducto: element.id } })
    );
  }
  return products;
};
