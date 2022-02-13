import MessenteApi from "messente_api"

const defaultClient = MessenteApi.ApiClient.instance;
const basicAuth = defaultClient.authentications["basicAuth"];
basicAuth.username = process.env.MESSENTE_USERNAME;
basicAuth.password = process.env.MESSENTE_PASSWORD;

const api = new MessenteApi.OmnimessageApi();

export default function sendSMS(number, text, sandbox) {
    console.log(`${sandbox ? "[SANDBOX] ": ""} Sent SMS to ${number}: \"${text}\"`)
    if (sandbox) { return }
    let sms = MessenteApi.SMS.constructFromObject({
        text: text
    });
    let omnimessage = MessenteApi.Omnimessage.constructFromObject({
        messages: [sms],
        to: number,
    });
    api.sendOmnimessage(omnimessage, (error, data) => {
        if (error) {
            console.error(error);
        }
    });
}