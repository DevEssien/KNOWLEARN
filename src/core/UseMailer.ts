import { IMail, ISender, ITemplateEngine } from '../types';

declare class Mail implements IMail{
  email: string;
  template: string;
  templateContent: string;
  data?: Record<string, any> | undefined;
  subject?: string | undefined;

  static sender: ISender<any>;
  static templateEngine: ITemplateEngine;

  constructor(email: string, template: string, subject?: string, data?: Record<string, any>);

  static create(options: {
    email: string,
    template: string,
    subject?: string,
    data?: Record<string, any> 
  }): Mail;
}