import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function ensureAuthenticateDeliveryman(
    request: Request, 
    response: Response, 
    next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader){
    return response.status(401).json({
      message: "Token missing"
    })
  }

  const [,token] = authHeader.split(" ")

  try {
    const { sub } = verify(
      token, 
      "fdfedc01c66e9ea2817507ca1097df2f"
    ) as IPayload

    request.id_deliveryman = sub

    next()
  } catch (err) {
    return response.status(401).json({
      message: "Invalid token"
    })
  }

}