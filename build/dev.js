import inquirer from "inquirer";
import shelljs from  'shelljs'
import getPagesName from './getPages.js';

inquirer.prompt([{
  type:'list',
  message:'请选择要运行的页面',
  name: 'devPage',
  choices: getPagesName()
}]).then(res=>{
  const {devPage} = res;
  console.log(devPage, getPagesName())
  shelljs.exec(`ENTRY_PATH=${devPage} vite`);
})