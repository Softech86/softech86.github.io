const fs = require('fs')
const path = require('path')

let md = fs.readFileSync(path.join(__dirname, 'index.md')).toString()

const r = /#\s*(.+?)\s+##\s*(.+?)\s+```([\s\S]+?)```\s+/g
let res = []
let p
while (p = r.exec(md)) {
    res.push({
        title: p[1],
        author: p[2],
        content: p[3].trim().replace(/\s+/g, ' / ')
    })
}
fs.writeFileSync(path.join(__dirname, 'index.json'), JSON.stringify(res))

