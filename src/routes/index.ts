import express, { Request, Response } from "express";
import { generateRandomName, getAllUsers } from "../controllers/nameController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send(
    '<a href="/api/users">/api/users</a></br><a href="/api/random">/api/random</a>'
  );
});

router.get("/api/users", getAllUsers);
router.get("/api/random", generateRandomName);

export default router;
