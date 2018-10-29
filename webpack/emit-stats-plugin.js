const path = require('path');
const RawSource = require("webpack-sources/lib/RawSource");

module.exports = EmitStatsPlugin;

function EmitStatsPlugin(opts) {
    this.opts = opts || {};
}

EmitStatsPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
        const css = [], js = [], img = [], json = [], jsChunks = {}, preload = {};
        const imgRegExp = (/\.(gif|jpg|jpeg|png|webp|svg)$/i);
        Object.keys(compilation.assets).map(function(a) {
            const ext = path.extname(a);
            switch (true) {
                case (ext === '.js' && /^f[0-9].*/.test(a)):
                    js.push(a); break;
                case ext === '.json':
                    json.push(a); break;
                case ext === '.css':
                    css.push(a); break;
                case imgRegExp.test(ext):
                    img.push(a); break;
            }
        });
        js.sort();

        compilation.chunks.map(function(chunk) {
            var ext = path.extname(chunk.files[0]);
            switch (true) {
                case ext === '.js':
                    jsChunks[chunk.name] = chunk.files[0];
                    break;
            }
        });

        const current = {
            css: css,
            js: js,
            json: json,
            jsChunks: jsChunks,
            img: img,
            preload: preload
        };
        const out = this.opts.filename || 'versions.json';
        compilation.assets[out] = new RawSource(JSON.stringify(current));
        callback();
    }.bind(this));
};
