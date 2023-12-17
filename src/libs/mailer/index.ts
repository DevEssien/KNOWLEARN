import Mailjet from 'node-mailjet';
import { IMail, ISender } from '../../types';

const mailjet = new Mailjet({
    apiKey: process.env.ESSIEN_MJ_API_KEY,
    apiSecret: process.env.ESSIEN_MJ_API_SECRET,
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
    // if (result.response.status !== 200) return next(new AppError('An error occured due to poor network', 500));        
    
    // return {
    //     otp: otp ?? null,
    //     mailStatus: result.response.status
    // };
    return result
  }
}

// @Learn-ing1 FOR SCHVOLTE