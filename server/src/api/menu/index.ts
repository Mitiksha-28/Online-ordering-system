import express from "express";
import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "../../constants";
import { MenuItem } from "../../database";
import { InferCreationAttributes } from "sequelize";
import { faker } from "@faker-js/faker";

const app = express();

const menuItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.optional(
    z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
  ),
});

app.post("/create", async (req, res) => {
  const body = req.body;
  const newMenuItem = menuItemSchema.safeParse(body);

  if (newMenuItem.error || !newMenuItem.data) {
    res.status(400).send(newMenuItem.error);
    return;
  }
  console.log(newMenuItem);
  const dbMenuItem = await MenuItem.create({ image: "", ...newMenuItem.data }).catch(console.error);

  res.status(201).send(dbMenuItem);
});

app.get("/create/sample-items", async (req, res) => {
  const sampleItems: InferCreationAttributes<MenuItem>[] = [];

  for (let i = 0; i < 1000; i++) {
    const sampleItem: InferCreationAttributes<MenuItem> = {
      id: undefined,
      name: faker.food.dish(),
      description: faker.food.description(),
      price: faker.helpers.rangeToNumber({ min: 10, max: 1000 }),
      image: "",
    };

    sampleItems.push(sampleItem);
  }
  const newSampleItems = await MenuItem.bulkCreate(sampleItems);

  res.status(201).send(newSampleItems);
  return;
});

app.get("/", async (req, res) => {
  const page = Number(req.query.page);

  if (isNaN(page) || page < 1) {
    res.status(400).send("Invalid page number.");
    return;
  }

  const menuItems = await MenuItem.findAll({
    limit: 10,
    offset: (page - 1) * 10,
  });

  res.send(menuItems);
});

export { app as menuItemRouter };
