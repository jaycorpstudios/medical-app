const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const getFormatedDate = (timestamp) => {
  if (!timestamp) {
    return '';
  }

  const currentTime = new Date(timestamp);
  const month = months[currentTime.getMonth()];
  const day = days[currentTime.getDay()];
  const date = currentTime.getDate();
  const year = currentTime.getFullYear();

  return `${day} ${date} de ${month} ${year}`;
};

const dateUtils = {
  getFormatedDate,
};

export default dateUtils;
