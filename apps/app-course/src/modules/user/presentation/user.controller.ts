import { RedisBootstrap } from "@bootstrap/redis.bootstrap";
import { cypher, generateRefreshToken } from "@core/services";
import { type UserApplication } from "@user/application";
import { User, UserPropsUpdate } from "@user/domain";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { UserResponseDto } from "./dtos";
import { env } from '../../../env';


export class UserController {
    constructor(private readonly application: UserApplication) { }

    async insert(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, password, age, sex, roles } = request.body;
            const passwordCypher = await cypher(password);
            const refreshToken = generateRefreshToken()

            const user = new User({ name, email, password: passwordCypher, age, sex, refreshToken, roles });
            const userCreated = await this.application.create(user);

            const userResponse = plainToInstance(UserResponseDto, userCreated.properties)
            response.status(201).json(userResponse);
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { userId } = request.params;
            let { name, password, age, sex, roles } = request.body;

            if (password) {
                password = await cypher(password);
            }
          
            const props: UserPropsUpdate = { name, password, age, sex, roles };
            const userUpdated = await this.application.update(+userId, props); 
            
            const userResponse = plainToInstance(UserResponseDto, userUpdated.properties)
            response.status(201).json(userResponse);
        } catch (error) {
            next(error)
        }
   }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { userId } = request.params;
            const userDeleted = await this.application.delete(+userId);

            const userResponse = plainToInstance(UserResponseDto, userDeleted.properties)
            response.status(201).json(userResponse);
        } catch (error) {
            next(error)
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const { userId } = request.params;   
            console.log("userId", userId)
            const user = await this.application.findById(+userId);

            const userResponse = plainToInstance(UserResponseDto, user.properties)
            response.status(201).json(userResponse);
        } catch (error) {
            next(error)
        }
    }

    async getAll(_request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.application.getAll()
            const userResponse = users.map(user => plainToInstance(UserResponseDto, user.properties))

            const cacheKey = response.locals.cacheKey;
            RedisBootstrap.client.set(cacheKey, JSON.stringify(userResponse), "PX", 1000 * 60 * env.REDIS_TTL); // 24 hours

            response.status(200).json(userResponse);              
        } catch (error) {
            console.log("error", error)
            next(error)
        }
    }

    async getByPage(request: Request, response: Response, next: NextFunction) {
        try {
            const { page, limit } = request.validatedQuery || request.query;
            const responsePage = await this.application.getByPage(
                Number(page),
                Number(limit),
            );

            const userResponse = {
                total: responsePage.total,
                page: responsePage.page,
                limit: responsePage.limit,
                data: responsePage.data.map(user => plainToInstance(UserResponseDto, user.properties))
            }

            response.status(200).json(userResponse);   
        } catch (error) {
            next(error)
        }
    }
}