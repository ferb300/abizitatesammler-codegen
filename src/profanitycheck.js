import { de } from "naughty-words"

export default function containsProfanity(string) {
    let prof = de.concat(["Dildo", "Vergewaltig", "Rekt", "Fetisch", "Hämorrhoid", "Abtreib", "Hetero", "Homo", "Sex", "Kot", "Zy", "Brust", "Tumor", "Ödem"])
    let profanities = prof.filter(v => string.toLowerCase().includes(v.toLowerCase()))

    // debug
    if (profanities.length != 0) {
        console.log(`filtered profanities: ${profanities} from text ${string}`)
    }
    return profanities.length != 0
}