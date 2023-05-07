var {marked} = require('marked');
const loaderUtils = require('loader-utils');

module.exports = function (source) {
    const transferSource = marked.parse(source);

    const options = this.getOptions();
    console.log('options: ', options);

    this.cacheable(options.cacheable);
    
    const url = loaderUtils.interpolateName(this, '[name].[hash:5].html', transferSource);
    console.log(url);
    this.emitFile(url, transferSource);
    
    
    const code = `export default ${JSON.stringify(transferSource)}`;
    
    const callback = this.async();
    setTimeout(() => {
        callback(null, code)
    }, 1000)
    // return code; // 同步
};
