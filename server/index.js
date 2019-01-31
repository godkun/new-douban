import { join } from 'path'
import Koa from 'koa'
import R from 'ramda'
import chalk from 'chalk'
import config from '../config'


const MIDDLEWARES = ['database', 'general', 'router', 'parcel']

// 使用 ramda 进行中间件注册
const useMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        e => e(app)
      ),
      require,
      name => join(__dirname, `./middleware/${name}`)
    )
  )(MIDDLEWARES)
}



async function start() {
  const app = new Koa()
  const { port } = config

  await useMiddlewares(app)

  const server = app.listen(port, () => {
    console.log(
      process.env.NODE_ENV === 'development'
        ? `open ${chalk.green('http://localhost:' + port)}`
        : `App listening on port ${port}`
    )

  })
}

start()
