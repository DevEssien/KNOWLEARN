import Mailjet from 'node-mailjet';
import config from '../../config';
import { IMail, ISender } from '../../types';

const { secret: apiSecret, key: apiKey } = config.mail

const mailjet = new Mailjet({
    apiKey: apiKey,
    apiSecret: apiSecret,
});

export class Sender implements ISender<Record<string | number, any>> {
  async send(mail: IMail ) {
    const { email, subject, templateContent} = mail;
    const result = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: "essienemma300dev@gmail.com",
                    Name: "school volte",
                },
                To: [
                    {
                        Email: email,
                    },
                ],
                Subject: subject,
                HTMLPart: templateContent,
                CustomerID: "AppGettingStartedTest",
            },
        ],
    });
    console.log('entered');
    // if (result.response.status !== 200) return next(new AppError('An error occured due to poor network', 500));        
    
    // return {
    //     otp: otp ?? null,
    //     mailStatus: result.response.status
    // };
    return result
  }
}

const Mail = new Sender()

export default Mail;

// @Learn-ing1 FOR SCHVOLTE