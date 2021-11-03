export const getDesc = (desc) => {
    let text = '';
    if(desc === undefined || desc === null){
      return text
    }
    if (desc !== '') {
      text = desc
        .split('>')
        .filter((text) => text[0] !== '<' && text !== '')
        .join('')
        .split('<')
        .filter((text) => text[0] !== '/')
        .join('');
    }
    return text;
  };