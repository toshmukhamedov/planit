import {
    SESv2Client,
    SendEmailCommand,
    GetEmailTemplateCommand,
    CreateEmailTemplateCommand,
    type SendEmailCommandInput,
} from "@aws-sdk/client-sesv2";
import { env } from "@src/config/env.ts";
import { EmailSubject, EmailTemplate } from "@src/utils/enums.ts";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

interface SendEmailContent {
    address: string;
    html?: string;
    text?: string;
    subject?: string;
    template?: EmailTemplate;
    templateData?: Record<string, unknown>;
}
class EmailService {
    private readonly client = new SESv2Client({
        region: env.AWS_SES_REGION,
        credentials: {
            secretAccessKey: env.AWS_SES_SECRET_ACCESS_KEY,
            accessKeyId: env.AWS_SES_ACCESS_KEY_ID,
        },
    });

    constructor() {
        void this.init();
    }

    private async init() {
        await this.createTemplate(EmailTemplate.VerificationCode, EmailSubject.VerificationCode);
    }

    async sendEmail(content: SendEmailContent): Promise<void> {
        try {
            const commanInput = {
                Destination: {
                    ToAddresses: [content.address],
                },
                FromEmailAddress: env.AWS_SES_FROM_EMAIL_ADDRESS,
            } as SendEmailCommandInput;

            if (content.template) {
                commanInput.Content = {
                    Template: {
                        TemplateName: content.template,
                        TemplateData: JSON.stringify(content.templateData),
                    },
                };
            } else {
                commanInput.Content = {
                    Simple: {
                        Body: {
                            Text: { Data: content.text },
                            Html: { Data: content.html },
                        },
                        Subject: {
                            Data: content.subject,
                        },
                    },
                };
            }
            const command = new SendEmailCommand(commanInput);

            await this.client.send(command);
        } catch (e) {
            // TODO: Better error handling
            console.error(e);
        }
    }

    async createTemplate(name: EmailTemplate, subject: EmailSubject): Promise<void> {
        try {
            const command = new GetEmailTemplateCommand({
                TemplateName: name,
            });

            await this.client.send(command);
        } catch (e) {
            const html = await readFile(resolve(import.meta.dirname, "templates", `${name}.html`), "utf8");
            const command = new CreateEmailTemplateCommand({
                TemplateName: name,
                TemplateContent: {
                    Subject: subject,
                    Html: html,
                },
            });

            await this.client.send(command);
        }
    }
}

export const emailService = new EmailService();
