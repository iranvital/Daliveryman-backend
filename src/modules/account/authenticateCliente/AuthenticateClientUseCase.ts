import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute ({ username, password }: IAuthenticateClient) {
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        });

        if(!client) {
            throw new Error("Username or password invalid!");
        };

        const passwordtMatch = await compare(password, client.password);

        if(!passwordtMatch) {
            throw new Error("Username or password invalid!");
        };

        // MD5 site generator: https://www.md5hashgenerator.com
        const token = sign({username}, "fdfedc01c66e9ea2817508ca1097df2f", {
            subject: client.id,
            expiresIn: "1d",
        });

        return token;


    };
};