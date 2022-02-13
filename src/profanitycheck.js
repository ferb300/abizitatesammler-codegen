import { de } from "naughty-words"

export default function containsProfanity(string) {
    de.concat(["Dildo", "Vergewaltig", "Rekt", "Fetisch"])
    let profanities = de.filter(v => string.toLowerCase().includes(v.toLowerCase()))
    // debug
    if (profanities.length != 0) {
        console.log(`filtered profanities: ${profanities} from text ${string}`)
    }
    return profanities.length != 0
}