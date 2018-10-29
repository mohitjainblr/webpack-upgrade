const { RawSource } = require('webpack-sources');
const path = require('path');

/**
 * This plugin emits the list of assets as a version file to be read and
 * uploaded to the config service.
 * 
 * Params:
 *  fileName            string      Name of the output file
 *  appendPublicPath    boolean     When true, the plugin will append the public path to all files
 *                                  The public path is the one that is specified in webpack config.
 *  preloadConfig       object      The configuration required to tell app-richviews-server which chunks 
 *                                  need to be preloaded for which routes.
 */
class FkEmitAssetsPlugin {
    constructor (options) {
        this.options = Object.assign({}, {
            fileName: 'assets.json',
            appendPublicPath: true,
            preloadConfig: {}
        }, options || {});
    }

    apply (compiler) {
        compiler.hooks.emit.tap('FkEmitAssetsPlugin', (compilation, callback) => {
            const output = {
                js: [],
                css: [],
                img: [],
                json: [],
                chunks: {},
                preload: this.options.preloadConfig
            };

            const publicPath = this.options.appendPublicPath ? compilation.options.output.publicPath : '';

            /**
             * Build a list of all JS and CSS assets.
             * Assets which need to be loaded with the initial page load are kept separate from
             * assets belonging to other chunks.
             */
            compilation.namedChunks && compilation.namedChunks.forEach(item => {
                const name = item.name;
                const isInitial = item.isOnlyInitial();

                if (isInitial) {
                    item.files.forEach(item => {
                        const extension = path.extname(item);
                        const fileUrl = `${publicPath}${item}`;
                        switch (extension) {
                            case '.js':
                                output.js.push(fileUrl);
                                break;
                            case '.css':
                                output.css.push(fileUrl);
                                break;
                        }
                    });
                } else {
                    output.chunks[name] = {
                        'js': [],
                        'css': []
                    };
                    item.files.forEach(item => {
                        const extension = path.extname(item);
                        const fileUrl = `${publicPath}${item}`;
                        
                        switch (extension) {
                            case '.js':
                                output.chunks[name]['js'].push(fileUrl);
                                break;
                            case '.css':
                                output.chunks[name]['css'].push(fileUrl);
                                break;
                        }
                    });
                }
            });

            output.js.sort();

            /**
             * Build a list of all other assets
             */
            compilation.assets && Object.keys(compilation.assets).map(fileName => {
                const extension = path.extname(fileName);
                const fileUrl = `${publicPath}${fileName}`;
                switch (extension) {
                    case '.json':
                        output.json.push(fileUrl);
                        break;
                    case '.gif':
                    case '.jpg':
                    case '.png':
                    case '.svg':
                    case '.jpeg':
                    case '.webp':
                        output.img.push(fileUrl);
                        break;
                }
            });

            /**
             * Emit the list of assets as a file
             */
            compilation.assets[this.options.fileName] = new RawSource(JSON.stringify(output));

            /**
             * Emit the generated list to console, for developer convenience while reviewing Jenkins logs
             */
            console.log('FkEmitAssetsPlugin :: Start output');
            console.log(output);
            console.log('FkEmitAssetsPlugin :: End output');

            callback && callback();
        });
    }
}

module.exports = FkEmitAssetsPlugin;
