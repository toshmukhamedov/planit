import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { env } from "@src/config/env.ts";

interface SendEmailContent {
    address: string;
    html?: string;
    text?: string;
    subject?: string;
}

export async function sendEmail(content: SendEmailContent): Promise<void> {
    // TODO: Integrate with Fastify
    // Ex. usage: await fastify.awsSESClient.send(command)
    const client = new SESClient({
        region: env.AWS_SES_REGION,
        credentials: {
            secretAccessKey: env.AWS_SES_SECRET_ACCESS_KEY,
            accessKeyId: env.AWS_SES_ACCESS_KEY_ID,
        },
    });
    try {
        const command = new SendEmailCommand({
            Message: {
                Body: {
                    Text: { Data: content.text },
                    Html: { Data: content.html },
                },
                Subject: {
                    Data: content.subject ?? env.AWS_SES_SUBJECT,
                },
            },
            Destination: {
                ToAddresses: [content.address],
            },
            Source: env.AWS_SES_SOURCE_EMAIL,
        });

        await client.send(command)
    } catch (e) {
        // TODO: Better error handling
        console.error(e);
    } finally {
        client.destroy();
    }
}
