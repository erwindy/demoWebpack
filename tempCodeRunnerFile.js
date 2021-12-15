(function(graph) {
      const require = (filename) => {
        const module = { exports: {} };
        // const filepath = path.join(__dirname, filename);
        const filepath = filename;
        const code = graph[filepath].code;
        (function (module, exports, require) { 
          eval(code);
         })(module, module.exports, require)
        return module.exports;
      };
      require('../src/index.js');
    })({"../src/index.js":{"code":"\"use strict\";\n\nvar _message = _interopRequireDefault(require(\"./message.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_message[\"default\"]);","dependencies":[{"filename":"../src/index.js","newFile":"e:\\codeProjects\\customWebpack\\src\\message.js"}]}})