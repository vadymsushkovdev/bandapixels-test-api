import express from 'express';
declare class Middleware {
    static configure(app: express.Application): void;
    static initErrorHandler(app: express.Application): void;
}
export default Middleware;
