export const formatDate = (inputDate) => {
  const dateToConvert = new Date(inputDate).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const parts = dateToConvert.split("/");
  const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
  return formattedDate;
};


export const capitalizeStr = (str)=>{
  if(!str){return}
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1)
  return capitalizedStr
}