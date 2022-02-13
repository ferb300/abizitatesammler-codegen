import "dotenv/config"
import { parse } from "csv-parse/sync"
import * as fs from "fs"
import rndWord from "random-noun-generator-german"
import sendSMS from "./sms.js"

// configure sandbox
let sandbox = true
if (process.argv.includes("--no-sandbox")) {
    sandbox = false
}

// parse numbers
let input = fs.readFileSync("./data/numbers.csv")
let numbers = parse(input, {
    delimiter: "\n"
});

// code generation + sending
let codes = []
numbers.forEach(number => {
    let code = ""
    while (code == "" || codes.includes(code)) {
        code = rndWord() + rndWord() + rndWord()
    }
    codes.push(code)
    sendSMS(number, `Hi, dein Abizeitungs-Abgabe-Code lautet "${code}". Gib ihn an Freunde weiter, von denen du möchtest, dass sie deine Charakteristik erstellen. Diese können ihn nutzen, um sie auf https://abizeitungfag.de zur Veröffentlichung abzugeben. Weitere Informationen findest du in der Oberstufen-WhatsApp-Gruppe.`, sandbox)
});

// export codes and numbers
let people = []
for(let i = 0; i < numbers.length; i++) {
    console.log(i)
    people.push({
        number: numbers[i],
        code: codes[i]
    })
}
let data = JSON.stringify(people)
fs.writeFile('./data/people.json', data, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("JSON data is saved.");
});