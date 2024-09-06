// dateUtils.js

export const formatDate = (dateString) => {
  const formattedDate = new Date(dateString);
  
  // Ajustar la hora en función de la diferencia de 5 horas
  formattedDate.setHours(formattedDate.getHours() + 5);

  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getDate().toString().padStart(2, "0");

  const hours = formattedDate.getHours().toString().padStart(2, "0");
  const minutes = formattedDate.getMinutes().toString().padStart(2, "0");
  const seconds = formattedDate.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
