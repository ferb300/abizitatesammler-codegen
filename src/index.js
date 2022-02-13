import "dotenv/config"
import { parse } from "csv-parse/sync"
import * as fs from "fs"
import rndWord from "random-noun-generator-german"
import containsProfanity from "./profanitycheck.js"
import sendSMS from "./sms.js"

// configure sandbox
let sandbox = true
if (process.argv.includes("--no-sandbox")) {
    sandbox = false
}

// parse people
let input = fs.readFileSync("./data/people.csv")
let people = parse(input, {
    delimiter: ["\n",";"],
    skipEmptyLines: true,
    columns: true,
    group_columns_by_name: true,
    skipEmptyLines: true
});

// code generation + sending
let codes = []
people.forEach(p => {
    let code = ""
    while (code == "" || codes.includes(code) || containsProfanity(code)) {
        code = rndWord() + rndWord() + rndWord()
    }
    p.code = code
    codes.push(code)
    sendSMS(p.number, `Hi ${p.name.split(" ")[0]}, dein Abizeitungs-Abgabe-Code lautet "${p.code}". Gib ihn an Freunde weiter, von denen du möchtest, dass sie deine Charakteristik erstellen. Diese können ihn nutzen, um sie auf https://abizeitungfag.de zur Veröffentlichung abzugeben. Weitere Informationen findest du in der Oberstufen-WhatsApp-Gruppe.`, sandbox)
});

// export people with codes as json
let data = JSON.stringify(people)
fs.writeFile('./data/people.json', data, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("JSON data is saved.");
});