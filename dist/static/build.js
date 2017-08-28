const fs = require('fs')
const path = require('path')

let spiderHtml = {
  content: '',
  title: ''
}

function copy(_from, _to, _path = '') {
  const from = path.join(_from, _path)
  const to = path.join(_to, _path)

  if (!fs.existsSync(from)) {
    return
  }
  let stat = fs.statSync(from)
  if (stat.isFile()) {
    // copy file from -> to
    const readStream = fs.createReadStream(from);
    const writeStream = fs.createWriteStream(to);
    readStream.pipe(writeStream);

    if (_path.endsWith('.md')) {
      spiderHtml.title += _path
      spiderHtml.content += _path + fs.readFileSync(from)
      return {
        isFile: true,
        filename: path.basename(_path),
        mtime: stat.mtime
      }
    } else {
      return null
    }
  } else {
    // create folder
    fs.existsSync(to) || fs.mkdirSync(to)

    const dir = fs.readdirSync(from)
    const children = dir
      .filter(f => !f.startsWith('.'))
      .map(f => {
        const tp = path.join(_path, f)
        return copy(_from, _to, tp)
      })
      .filter(x => x)
    return {
      isFile: false,
      dirname: path.basename(to),
      mtime: stat.mtime,
      children
    }
  }
}

function clear(_dst, _path = '') {
  const dst = path.join(_dst, _path)
  if (!fs.existsSync(dst)) {
    return
  }
  if (fs.statSync(dst).isFile()) {
    fs.unlinkSync(dst)
  } else {
    const dir = fs.readdirSync(dst)
    dir.forEach(f => {
      const tp = path.join(_path, f)
      clear(_dst, tp)
    })
    fs.rmdirSync(dst)
  }
}

function printTree(tree, tab = '', last=false) {
  if (tree.isFile) {
    // file
    console.log((tab + (last ? '└── ' : '├── ') + tree.filename).slice(4).padEnd(40) + tree.mtime)
  } else {
    // folder
    console.log((tab + (last ? '└── ' : '├── ') + tree.dirname).slice(4).padEnd(40) + tree.mtime)
    tree.children.forEach((tc, i) => {
      const clast = tree.children.length === i + 1
      printTree(tc, tab + (last ? '    ' : '│   '), clast)
    })
  }
}

let tree
const src = './md'
dsts = ['./markdown']

console.log(`Moving file from ${src} to ${dsts}...`)

dsts.forEach(dst => {
  clear(dst)
  tree = copy(src, dst)

  if (fs.existsSync(dst)) {
    const treePath = path.join(dst, 'tree.json')
    fs.writeFileSync(treePath, JSON.stringify(tree))
    // printTree(tree)
  }
})

console.log(`Files moved below:`)
printTree(tree)



for (let i in spiderHtml) {
  const font = `songke-${i}`
  const html = `
    <html>
    <head>
      <style>
      html, body {
        font-family: songke;
      }
    
      @font-face {
        font-family: songke;
        font-style: normal;
        font-weight: 500;
        src: url(./${font}.ttf);
      }
    </style>
    </head>
    <body>
    ${spiderHtml[i]}
    </body>
    </html>
  `
  fs.writeFileSync(path.join(__dirname, `../font-spider/temp-${i}.html`), html)
}
