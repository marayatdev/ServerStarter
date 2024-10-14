import express, { Application } from "express";
import dotenv from "dotenv";
import { logError, logInfo } from "./utils/logger";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";

dotenv.config();

class App {
    private app: Application;
    private port: number = Number(process.env.PORT) || 8000;

    constructor() {
        this.app = express();
        this.setup();
        this.initializeRoutes();
        this.startServer();
    }

    private setup(): void {
        this.configureMiddleware();

    }

    private configureMiddleware(): void {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    private async initializeRoutes(): Promise<void> {
        const routePath = path.resolve(__dirname, "routes");
        const routeFiles = fs
            .readdirSync(routePath)
            .filter((file) => file.endsWith(".ts"));

        for (const file of routeFiles) {
            try {
                const routeModule = await import(path.resolve(routePath, file));
                if (routeModule.default) {
                    this.app.use("/api", routeModule.default);
                }
            } catch (error) {
                logError(`Error loading route module ${file}: ${error}`);
            }
        }
    }

    private startServer(): void {
        this.app.listen(this.port, () => {
            logInfo(`🚀 Server is running on http://localhost:${this.port}`);
        });
    }
}

new App();