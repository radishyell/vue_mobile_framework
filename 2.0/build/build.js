'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        let nb =
            `* ......................我佛慈悲......................
*                       _oo0oo_
*                      o8888888o
*                      88" . "88
*                      (| -_- |)
*                      0\\  =  /0
*                    ___/\`---'\\___
*                  .' \\\\|     |// '.
*                 / \\\\|||  :  |||// \\
*                / _||||| -卍-|||||- \\
*               |   | \\\\\\  -  /// |   |
*               | \\_|  ''\\---/''  |_/ |
*               \\  .-\\__  '-'  ___/-. /
*             ___'. .'  /--.--\\  \`. .'___
*          ."" '<  \`.___\\_<|>_/___.' >' "".
*         | | :  \`- \\\`.;\`\\ _ /\`;.\`/ - \` : | |
*         \\  \\ \`_.   \\_ __\\ /__ _/   .-\` /  /
*     =====\`-.____\`.___ \\_____/___.-\`___.-'=====
*                       \`=---='
*
*..................佛祖开光 ,永无BUG...................`
        console.log(chalk.yellow(nb));
    })
})