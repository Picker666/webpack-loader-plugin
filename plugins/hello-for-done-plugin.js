const { validate } = require("schema-utils");
// const schema = require("./helloForDoneSchema.json");
const schema = {
  "type": "object",
  "properties": {
    "name": {
      "description": "插件名字。",
      "type": "string"
    },
    "someWolds": {
      "description": "say something to all",
      "type": "string"
    }
  },
  "required": ["someWolds"],
  "additionalProperties": false
}

class HelloForDonePlugin {
  constructor (options) {
    validate(schema, options)
    this.options = options;
  }
  apply (compiler) {
    compiler.hooks.done.tap('say hello for done', (state) => {
      console.log(`hello, ${this.options.someWolds}, this is ${this.options.name}`);
      console.log('this.options', this.options);

      // console.log('state: ', state);
    })

    compiler.hooks.compilation.tap('HelloForDonePlugin', (compilation) => {
      // 现在可以通过 compilation 对象绑定各种钩子
      compilation.hooks.optimize.tap('HelloForDonePlugin', () => {
        console.log('资源已经优化完毕。');
      });
    });
  }
}

module.exports = HelloForDonePlugin;
