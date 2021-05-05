export declare class HttpError extends Error {
    status: number;
    message: string;
    name: string;
    constructor(status?: number, message?: string);
}
export default HttpError;
