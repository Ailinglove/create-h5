import glob from 'glob';
import {resolve} from 'path'


export default () => {
  const SEP = '/';
  let entryPage = '';
  entryPage = glob.sync(resolve('./src/pages/*'));
  entryPage = entryPage.map((item) => {
    const itemMatch = item.split(SEP);
    return itemMatch ? itemMatch.pop() : item;
  });
  return entryPage;
};
