export enum CodeResponseEnum {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

export default class ResponseModel<T> {
    constructor(
        public error: boolean,
        public code: CodeResponseEnum,
        public message: string,
        public data: T
    ) {}
}