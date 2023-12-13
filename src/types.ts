export enum ResponseStatus {
    SUCCESS = 'success',
    FAILED = 'failed',
}

export type TServiceSuccessResponse = {
    status: ResponseStatus,
    message: string,
    data: object,
}

