const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    
    this.argument("appname", { type: String, required: false });
  }
  initializing() {

  }
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the name of this project?',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'server',
        message: 'Do you need an Express web server with this project?'
      },
      {
        type: 'confirm',
        name: 'lint',
        message: 'Wanna lint?'
      }
    ]);
  }
  configuring() {
    
  }
  writing() {
    // Package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.answers.name,
        server: this.answers.server,
        lint: this.answers.lint
      }
    );
    
    // Webpack
    this.fs.copyTpl(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        server: this.answers.server,
        lint: this.answers.lint
      }
    );
    
    //Eslint
    if (this.answers.lint) {
      this.fs.copy(
        this.templatePath('.eslintrc.js'), 
        this.destinationPath('.eslintrc.js')
      );
    }
    
    if (this.answers.server) {
      this.fs.copy(
        this.templatePath('src/client/**'),
        this.destinationPath('src/client')
      );
      this.fs.copy(
        this.templatePath('src/server/**'),
        this.destinationPath('src/server')
      );
    } else {
      this.fs.copy(
        this.templatePath('src/client/**'),
        this.destinationPath('src')
      );
    }
    
  }
  conflicts() {
    
  }
  install() {
    this.npmInstall();
  }
  end() {
    
  }
};