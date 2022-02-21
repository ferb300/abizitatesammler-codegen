import Vonage from "@vonage/server-sdk"

const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
})

export default function sendSMS(number, text, sandbox) {
    console.log(`${sandbox ? "[SANDBOX] " : ""} Sent SMS to ${number}: \"${text}\"`)
    if (sandbox) { return }
    vonage.message.sendSms("Abibot", number, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}