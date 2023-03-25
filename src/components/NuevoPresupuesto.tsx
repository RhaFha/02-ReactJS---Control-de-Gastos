import { ChangeEvent, useState, useEffect } from "react"
import Swal from 'sweetalert2';

const NuevoPesupuesto: React.FC<IPropsNuevoPresupuesto> = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto}) => {

    const [formPresupuesto, setFormPresupuesto] = useState<string>('');

    useEffect(() => {

        if(presupuesto > 0){
            setFormPresupuesto(String(presupuesto))
        }
    
    }, [presupuesto])

    const handleChangePresupuesto = (e: ChangeEvent<HTMLInputElement>):void => {
        setFormPresupuesto(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()

        if(!Number(formPresupuesto) || Number(formPresupuesto) < 0){
            Swal.fire({
                icon: 'error',
                title: 'Ingresa un numero valido',
              });
              return;
        }

        setIsValidPresupuesto(true);
        setPresupuesto(Number(formPresupuesto));

    }
    return ( 
        <div className="contenedor-presupuesto contenedor sombra">
            
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Definir Presupuesto</label>
                    <input 
                        className="nuevo-presupuesto"
                        type='number'
                        placeholder="Añade tu presupuesto"
                        value={formPresupuesto}
                        onChange={e => handleChangePresupuesto(e)}
                    />
                </div>
                <input type="submit" value="Añadir" />
            </form>
        </div>
     );
}
 
export default NuevoPesupuesto;

interface IPropsNuevoPresupuesto{
    presupuesto: number
    setPresupuesto: React.Dispatch<React.SetStateAction<number>>
    isValidPresupuesto: boolean
    setIsValidPresupuesto: React.Dispatch<React.SetStateAction<boolean>>
}