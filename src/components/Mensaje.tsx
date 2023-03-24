const Mensaje: React.FC<IPropsMensaje> = ({children, tipo}) => {
    return ( 
        <div className={`alerta ${tipo}`}>
            {children}
        </div>
    );
}
 
export default Mensaje;

interface IPropsMensaje{
    children: string
    tipo: string
}