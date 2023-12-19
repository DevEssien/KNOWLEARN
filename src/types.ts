export interface IMail {
    email: string;
    templateContent: string;
    subject?: string;
    data?: Record<string, any>;
}

export interface ITemplateEngine {
    templates: string[];
    templatePath: string;
    render(mail: IMail): void;
    compile(sources: string): string;
}

export interface ISender<T>{
    send(mail: IMail): Promise<T>;
}

export declare type TMailerOptions = {
    sender: ISender<any>;
    templateEngine?: ITemplateEngine;
    templatePath: string;
}

export enum ResponseStatus {
    SUCCESS = 'success',
    FAILED = 'failed',
}

export type TServiceSuccessResponse = {
    status: ResponseStatus,
    message: string,
    data: object,
}