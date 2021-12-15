const fs = require("fs");
const path = require("path");
const config = fs.readFileSync(path.join(__dirname, './webpack.config.js'), 'utf-8');

const babel = require("@babel/core");
const parser = require("@babel/parser");
const traverse = require('@babel/traverse').default;

class WebpackDemo {
  importMap = {};
  config = {};
  constructor(config) {
    this.config = config
  }

  getAST = (filename) => {
    const source = fs.readFileSync(filename, 'utf-8');
    return parser.parse(source, {
      sourceType: 'module',
    })
  }
  
  getDependencies = (ast, file) => {
    const { filename, newFile } = file;
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        const dirname = path.dirname(newFile);
        const newcFile = path.join(dirname, node.source.value);
        dependencies.push({ filename: node.source.value, newFile: newcFile });
      },
    })
    return dependencies;
  };
  
  transformES5 = (ast) => {
    const { code } = babel.transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    })
    return code;
  };
  
  buildModule = (file) => {
    const { filename, newFile } = file;
    const ast = this.getAST(newFile);
    const dependencies = this.getDependencies(ast, file);
    const code = this.transformES5(ast);
    return {
      code, dependencies,
    };
  };

  getGraph = (file) => {
    const { filename, newFile } = file;
    const currentModule = this.buildModule(file);
    this.importMap[filename] = currentModule;
    currentModule.dependencies.forEach(dependence => {
      if (!this.importMap[dependence.filename]) {
        this.getGraph(dependence);
      }
    });
  };

  getBundle = (entry) => {

    return `(function(graph) {
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
      require('${entry}');
    })(${JSON.stringify(this.importMap)})`;
  };

  make = () => {
    const filename = '../src/index.js';
    const entry = path.join(__dirname, '../src/index.js');
    this.getGraph({ filename, newFile: entry }); // 获取依赖图
    const bundle = this.getBundle(filename);
    fs.writeFileSync(path.join(__dirname, '../dist.js'), bundle, "utf-8");
  }
}

const demo = new WebpackDemo(config);