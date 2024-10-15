import { PrismaClient } from "@prisma/client";
import logger, { logDebug, logError } from "../utils/logger";
import { Register } from "../models";

export class AuthService {
    private prisma = new PrismaClient();

    public async register(username: string, email: string, password: string): Promise<Register> {
        return this.prisma.users.create({
            data: {
                username,
                email,
                password
            }
        })
    }

}