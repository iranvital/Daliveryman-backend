import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute ({ username, password }: IAuthenticateDeliveryman) {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        });

        if(!deliveryman) {
            throw new Error("Username or password invalid!");
        };

        const passwordtMatch = await compare(password, deliveryman.password);

        if(!passwordtMatch) {
            throw new Error("Username or password invalid!");
        };

        // MD5 site generator: https://www.md5hashgenerator.com
        const token = sign({username}, "fdfedc01c66e9ea2817507ca1097df2f", {
            subject: deliveryman.id,
            expiresIn: "1d",
        });

        return token;


    };
};