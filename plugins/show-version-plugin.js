const { validate } = require("schema-utils");
const fs = require("fs");

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The name of the plugin"
    },
  },
  additionalProperties:false,
  require:["wolds"]
}

class ShowVersionPlugin {
  constructor(options) {
    validate(schema,options);

    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.run.tap('ShowVersionPlugin', (compilation) => {
      // console.log('============================compilation: ', compilation.modules);
      fs.readFile('./package.json',  (err, file) => {
        if (!err) {
          const packages = JSON.parse(file.toString());

          console.log(packages.version, '===');

          fs.readFile('./src/index.html', (e, h) => {
            const res = /\<script\>sessionStorage.setItem\("version","/g;
            let hs = h.toString();
            const test = res.test(hs);
            if (test) {
              hs = hs.replace(/\"version\",\"\d+\.\d+\.\d+\"/, '"version","' + packages.version + '"');
              console.log('hs: ', hs);
              fs.writeFile('./src/index.html', hs, (error) => {
                console.log('error: ', error);
                
              })
            } else {
              const script = '<script>sessionStorage.setItem("version","'+ packages.version +'");</script>';
              fs.appendFile('./src/index.html', script, (error) => {
                console.log('error: ', error);
              });
            }
          })

        }
      })
    })
  }
}

module.exports = ShowVersionPlugin;
