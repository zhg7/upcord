import { MailService } from '@sendgrid/mail'; // Reemplazable por nodemailer
import type { MailDataRequired } from '@sendgrid/mail'

const sgMail = new MailService();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendEmail(recipient: string, subject: string, text: string) {
    const message: MailDataRequired = {
        to: recipient,
        from: process.env.SENDGRID_SENDER as string,
        subject: `[Upcord] ${subject}`,
        html: text,
    }

    sgMail
        .send(message)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

