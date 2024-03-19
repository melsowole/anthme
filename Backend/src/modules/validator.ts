import {body, validationResult, ValidationChain} from "express-validator";
import { Request, Response, NextFunction } from "express";

const userValidations = [
    body('username').exists().isString(),
    body('password').exists().isString(),
    body('userImage').exists().isString(),
    // custom check för extra properties som skickas in, behövs ej egentligen
    body().custom(body => {
        const keys = ['username', 'password', 'userImage'];
        return Object.keys(body).every(key => keys.includes(key));
    })
];

const postValidations = [
    body('category').exists().isString(),
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('userImage').exists().isString(),
    body().custom(body => {
        const keys = ['category', 'title', 'body', 'userImage'];
        return Object.keys(body).every(key => keys.includes(key));
    })
];

const commentValidations = [
    body('content').exists().isString()
];

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) return res.status(400).json({message: 'Validation failed'});
        next();
    }
}

export {userValidations, postValidations, commentValidations, validate}