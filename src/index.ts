import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { getUser } from "./handler/user/getUserHandler";
import { asyncHandler, errorHandler } from "./exception/exceptionHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", asyncHandler(async (req: Request, res: Response) => {
    const user = await getUser(1);
    res.json(user);
}));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});