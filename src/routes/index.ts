import { Router, Request, Response } from "express";
import { IndexController } from "../controllers";
export class Routes {

    public path: string = "/auth";

    public router: Router = Router();

    public indexController = new IndexController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.indexController.register);
    }

}

export default new Routes().router;