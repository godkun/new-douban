import { resolve } from 'path'
import KoaRouter from 'koa-router'
import glob from 'glob'
import R from 'ramda'

// Symbol 类型 独一无二
const pathPrefix = Symbol('pathPrefix')

const routeMap = []
let logTimes = 0

const resolvePath = R.unless(
  R.startsWith('/'),
  R.curryN(2, R.concat)('/')
)

const changeToArr = R.unless(
  R.is(Array),
  R.of
)

export class Route {

}



