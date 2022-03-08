import "dotenv/config"
import { parse } from "csv-parse/sync"
import * as fs from "fs"
import sendSMS from "./sms.js"
import sleep from "./sleep.js"

// configure sandbox
let sandbox = true
if (process.argv.includes("--no-sandbox")) {
    sandbox = false
}

// parse sent messages
let input = fs.readFileSync("./data/sent.csv")
let sent = parse(input, {
    delimiter: ["\n",","],
    skipEmptyLines: true,
    columns: true,
    group_columns_by_name: true,
    skipEmptyLines: true
});

// parse people
let people = JSON.parse(fs.readFileSync("./data/people.json", "utf8"));

let missing = people.filter(p => {
    return !(sent.find(s => s.to == p.number.replace(/\s|\+/g, "")))
});

// send missing codes out
for (let index = 0; index < missing.length; index++) {
    sendSMS(missing[index].number, `Hi ${missing[index].name.split(" ")[0]}, dein Abgabe-Code lautet "${missing[index].code}."`, sandbox)
    await sleep(1000)
}