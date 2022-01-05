export const clearTextFromComas = (text) => {
  if(text.substring(0, 2)===', '){
    return text.substring(2)
  }
  else return text
}