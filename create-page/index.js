import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs'
import template from './template.js'
const __dirname = path.resolve();

const { mainTemplate,vueTemplate, routerTemplate } = template;


const errorLog =(errmsg)=> console.log(chalk.red(errmsg))
const log = message => console.log(chalk.green(`${message}`));

const resolve = (...file) => path.resolve(__dirname, ...file);
// 1. 运行npm run create的时候提示输入项目名称，是否使用路由，是否用ts等关键信息开始构建

// 生成目录
const mkdir = (dirname)=>{
  return new Promise((resolve)=>{
    if(fs.existsSync(dirname)){
      resolve()
    }else{
      fs.mkdirSync(dirname);
      log(`正在生成${dirname}目录`)
      resolve()
    } 
  })
}

const mkdirTools =async (pagePath)=>{
  const toolsDir = ['assets', 'components', 'composables', 'utils', 'views'];
  for(const dir of toolsDir) {
    const tooldir = `${pagePath}/${dir}`
    await mkdir(tooldir)
  }
}

const generateFile = (filepath, fileContent)=>{
  return new Promise((resolve, reject)=>{
    fs.writeFile(filepath, fileContent, 'utf8', err=>{
      if(err){
        errorLog(err.message);
        reject(err)
      }else{
        log(`正在生成${filepath}文件`)
        resolve(true)
      }
    })
  })
}
// 从这里开始运行
inquirer
  .prompt([
    {
      type: 'input',
      message:'请输入项目名称' ,
      name: 'pageName',
      validate: (pageName)=>{
        if(!pageName){
          errorLog('\n请输入页面文件夹名');
          return false
        }
        return true
      }
    },
    {
      type: 'confirm',
      message: '是否使用 router',
      name: 'isUseRouter',
    }
  ])
  .then(async(answers) => {
    // Use user feedback for... whatever!!
    const {pageName='demo', isUseRouter} = answers;
    // 在page文件夹下生成一个名为pageName的目录，里边包含需要的模板
    // 项目的目录名
    const pagePath = resolve(`src/pages/${pageName}`)
    const mainPath = resolve(pagePath, 'main.js')
    const vuePath = resolve(pagePath, 'App.vue')


    // 判断项目是否存在
    const isPageExisted = fs.existsSync(pagePath);
    if(isPageExisted){
      errorLog('项目已经存在！')
    }

    // 不存在则创建目录
    await mkdir(pagePath)

    // 生成main.js
    await generateFile(mainPath, mainTemplate(isUseRouter))

    // vue文件
    await generateFile(vuePath, vueTemplate(pageName, isUseRouter))

    // 生成其他目录
    mkdirTools(pagePath)
    // router文件
    if(isUseRouter){
      const routerPath = resolve(pagePath, 'router')
      await generateFile(routerPath, routerTemplate(pageName, isUseRouter))

      // views/index.vue
      const viewsPath = resolve(pagePath,'views/Index.vue')
      await generateFile(viewsPath, vueTemplate(pageName, false))
    }


    log('项目生成成功，运行npm run dev 开始吧')
    

  })
  .catch((error) => {
    console.log(error)

    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });