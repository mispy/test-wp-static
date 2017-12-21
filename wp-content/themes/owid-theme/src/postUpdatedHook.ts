import {WordpressBaker} from './WordpressBaker'
import * as parseArgs from 'minimist'
const argv = parseArgs(process.argv.slice(2))

async function main(email: string, name: string) {
    const baker = new WordpressBaker({
        database: "owid_wordpress",
        wordpressUrl: "http://l:8080",
        wordpressDir: "/Users/mispy/ourworldindata.org",
        outDir: "/Users/mispy/wp-static"
    })

    await baker.bakeAll()
    await baker.deploy(email, name)
    baker.end()
}

main(argv._[0], argv._[1])