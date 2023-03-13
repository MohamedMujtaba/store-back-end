import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { Item } from "@prisma/client";
import { uploadImg } from "../utils/uploadImg";

interface ItemReq extends Request {
  body: Item;
}

export const createItem = async (req: ItemReq, res: Response) => {
  const { title, compony, currentPrice, status, images, hot, active } =
    req.body;

  try {
    ///@ts-ignore  FIXME:
    const i: any = await uploadImg(res, images);
    const item = await prisma.item.create({
      data: { title, compony, currentPrice, status, images: i, hot, active },
    });
    res.status(200).json({ success: true, item });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Something went wrong 😴",
    });
  }
};

interface ItemInputReq extends Request {
  body: Item;
  params: {};
  query: {
    compony: string;
    status: string;
    hot: string;
    active: string;
  };
}

export const getItems = async (req: ItemInputReq, res: Response) => {
  const { active, compony, hot, status } = req.query;
  let filters: any = {};

  if (active) filters.active = active === "true" ? true : false;
  if (compony) filters.compony = compony;
  if (hot) filters.hot = hot === "true" ? true : false;
  if (status) filters.status = status;

  try {
    const items = await prisma.item.findMany({
      where: filters,
    });
    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong 😴",
      error: error,
    });
  }
};
