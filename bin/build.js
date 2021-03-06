const fs = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')
const Bundler = require('parcel-bundler')
const copy = promisify(fs.copyFile)
const r = path => resolve(process.cwd(), path)
const assets = r('./server/views/assets')
const public = r('./public')
const dist = r('./public/dist')
const build = r('./server/views/_build')
const { mkdir, cp } = require('shelljs')

mkdir('-p', [r('./public/dist')])
mkdir('-p', r('./server/views/_build'))

cp('-Rf', assets + '/*', public  + '/')

fs.readdirSync(assets)
  .map(async file => {
    const source = public + '/' + file
    const bundler = new Bundler(source, {
      outDir: dist,
      publicUrl: '/dist',
      watch: false
    })

    await bundler.bundle()

    const fname = file.split('.')[0]

    await copy(dist + '/' + fname + '.html', build + '/' + file)
  })


