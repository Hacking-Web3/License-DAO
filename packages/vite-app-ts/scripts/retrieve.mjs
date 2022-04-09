// retrive.mjs

// STILL NEEDS TO BE MODIFIED

import { Web3Storage, getFilesFromPath } from 'web3.storage'

const token = process.env.API_TOKEN
const client = new Web3Storage({ token })

async function retrieveFiles(cid) {
    const id = 'bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu'

    const res = await client.get(cid)
    const files = await res.files()

    for (const file of files) {
        console.log(`${file.cid}: ${file.name} (${file.size} bytes)`)
    }
}

retrieveFiles()