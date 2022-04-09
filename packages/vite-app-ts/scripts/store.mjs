// store.mjs

// takes the plain text string as an imput, parses it to create
// a file and then send the file to the storeFiles function to
// be sent to web3.storage

import { Web3Storage, getFilesFromPath } from 'web3.storage'

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcwMkVhOGE1YUNBOTQ5OEU5NzgxMTZmNjM4MUMwNzNjMjQwZDA2ZTMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk1NDExNTk0NzMsIm5hbWUiOiJsaWNlbnNlZGFvIn0.J_0ePLj6pPwj-CJnqgeFGZkRBawXI6_HRNw1u4QbiLo'
const token = process.env.API_TOKEN
const client = new Web3Storage({ token })

function saveDynamicDataToFile(string) {

    var coverLetter = document.getElementById(string).value;

    var blob = new Blob([coverLetter], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "coverLetter.txt");
}

async function storeFiles(string) {
    saveDynamicDataToFile(string)
    const files = await getFilesFromPath('/path/to/file')
    const cid = await client.put(files)
    console.log(cid)
}