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
    })({"../src/index.js":{"code":"\"use strict\";\n\nvar _message = _interopRequireDefault(require(\"./message.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_message[\"default\"]);","dependencies":[{"filename":"./message.js","newFile":"e:\\codeProjects\\customWebpack\\src\\message.js"}]},"./message.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _word = require(\"./word.js\");\n\nvar message = \"say \".concat(_word.word);\nvar _default = message;\nexports[\"default\"] = _default;","dependencies":[{"filename":"./word.js","newFile":"e:\\codeProjects\\customWebpack\\src\\word.js"}]},"./word.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.word = void 0;\nvar word = 'hello';\nexports.word = word;","dependencies":[]}})