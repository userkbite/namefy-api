import { Request, Response } from "express";
import fs from "fs/promises";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile("data.json", "utf8");
    const jsonData = JSON.parse(data);
    res.json({
      users: jsonData.first_names.map(
        (firstName: any, index: string | number) => ({
          first_name: firstName,
          last_name: jsonData.last_names[index],
          end_name: jsonData.end_names[index],
        })
      ),
    });
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
    res.status(500).json({ error: "Erro ao processar a solicitação" });
  }
};

export const generateRandomName = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile("data.json", "utf8");
    const jsonData = JSON.parse(data);
    const firstNames = jsonData.first_names;
    const lastNames = jsonData.last_names;
    const endNames = jsonData.end_names;

    const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
    const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
    const randomEndNameIndex = Math.floor(Math.random() * endNames.length);

    const randomFirstName = firstNames[randomFirstNameIndex];
    const randomLastName = lastNames[randomLastNameIndex];
    const randomEndName = endNames[randomEndNameIndex];

    const fullName = `${randomFirstName} ${randomLastName} ${randomEndName}`;

    res.json({ full_name: fullName });
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
    res.status(500).json({ error: "Erro ao processar a solicitação" });
  }
};
