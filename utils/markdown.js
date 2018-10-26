var fs = require('fs')
var showdown = require('showdown')
var Converter = new showdown.Converter()
var {compile} = require('vash')

module.exports = (opts) => {
    return (req, res, next) => {
        var html
        var md 
        res.renderMD = (mdFile, data) => {
            md = fs.readFileSync(opts.markdownFolder + '/' + mdFile).toString()
            md = Converter.makeHtml(md)
            html = fs.readFileSync(opts.layoutsFolder + '/' + data.layout).toString()
            html = compile(html)
            html = html({
                ...data,
                ...opts.globalData,
                content: md
                // TODO: add useful things here
            })

            console.log(html)
            res.send(html)
        }
        next('hi')
    }
}