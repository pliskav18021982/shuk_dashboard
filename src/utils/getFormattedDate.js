const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day<10 ? `0${day}`: day}-${(month + 1)<10? `0${month + 1}` : month + 1}-${year}`;
}

export default formatDate;