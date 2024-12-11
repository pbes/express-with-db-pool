import { Request, Response, NextFunction } from 'express'
import { NotFoundException } from './NotFoundException'

export const asyncHandler = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err)
    }
    if (err instanceof NotFoundException) {
        res.status(404)
    } else {
        res.status(500)
    }
    res.json({ error: err.message })
}