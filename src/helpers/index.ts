export const generarId = () => {
    const random    = Math.random().toString(36).substring(2);
    const fecha     = Date.now().toString(36);

    return random + fecha;
}

export const formatearNumeroADinero = (cantidad: number): string => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency:'MXN'
    })
}

export const formatearFecha = (fecha: number): string =>{
    const fechaNueva = new Date(fecha);
    return fechaNueva.toLocaleDateString('es-Es', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    })
}