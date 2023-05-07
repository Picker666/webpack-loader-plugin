const { validate } = require("schema-utils");

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The name of the plugin"
    },
    wolds: {
      type: "string",
      description: "some wolds for timeout finish."
    }
  },
  additionalProperties:false,
  require:["wolds"]
}

class HelloAsyncPlugin {
  constructor(options) {
    validate(schema,options);

    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.run.tapAsync('HelloAsyncPlugin', (compilation, callback) => {
      // console.log('compilation: ', compilation);
      setTimeout(() => {
        console.log(`${this.options.name} have run 3000ms...`);
        callback();
      }, 3000)
    })

    compiler.hooks.emit.tapPromise('HelloAsyncPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout( () => {
          console.log(`${this.options.name} have emitted, and say: ${this.options.wolds}`);
          reject();
        }, 1000)
      })
    })
  }
}

module.exports = HelloAsyncPlugin;
