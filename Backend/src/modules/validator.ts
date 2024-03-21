import {body, validationResult, ValidationChain} from "express-validator";
import { Request, Response, NextFunction } from "express";

const userValidations = [
    body('username').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body('password').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body('userImage').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body().custom(body => {
        const keys = ['username', 'password', 'userImage'];
        return Object.keys(body).every(key => keys.includes(key));
    })
];

const postValidations = [
    body('category').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body('title').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body('body').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body('username').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body('userImage').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body().custom(body => {
        const keys = ['category', 'title', 'body', 'username', 'userImage'];
        return Object.keys(body).every(key => keys.includes(key));
    })
];

const commentValidations = [
    body('body').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body('username').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body('userImage').exists().isString().notEmpty().custom(value => value.trim() !== ''),
    body().custom(body => {
        const keys = ['body', 'username', 'userImage'];
        return Object.keys(body).every(key => keys.includes(key));
    })
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