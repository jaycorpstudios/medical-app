const days = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const getFormatedDate =(timestamp) => {
    if(!timestamp) {
        return '';
    }

    const currentTime = new Date(timestamp),
            month = months[currentTime.getMonth()],
            day = days[currentTime.getDay()],
            date = currentTime.getDate(),
            year = currentTime.getFullYear();

    return `${day} ${date} de ${month} ${year}`;
}

const dateUtils = {
    getFormatedDate: getFormatedDate
}

export default dateUtils;