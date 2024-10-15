import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";
import { Register } from "../models";
import { TypedRequestBody } from "../utils/request";


export class IndexController {

    private authService = new AuthService();

    public register = async (req: TypedRequestBody<{ username: string, email: string, password: string }>, res: Response, next: NextFunction) => {
        try {
            const { username, email, password } = req.body;
            const response = await this.authService.register(username, email, password);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

}
