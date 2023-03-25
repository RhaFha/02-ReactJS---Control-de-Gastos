import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { GastoType } from '../class/Gasto';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

import {formatearNumeroADinero} from '../helpers';

const ControlPresupuesto: React.FC<IPropsControlPresupuesto> = ({gastos, presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState<number>(0);
    const [gastado, setGastado] = useState<number>(0);
    const [porcentaje, setPorcentaje] = useState<number>(0)

    useEffect( () => {
        const totalGastado = gastos.map( g => parseInt(g.cantidad)).reduce( (total, g) => total = total + g, 0);
        const disponible = presupuesto - totalGastado;

        //Calcular porcentaje
        const nuevoPorcentaje = parseFloat(((  (presupuesto - disponible) / presupuesto ) * 100).toFixed(2))

        setGastado(totalGastado);
        setDisponible(disponible);
        
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);
    }, [gastos])

    const handleClickReset = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Se borraran todos tus datos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Registros eliminados!',
                'Se borraron todos los registros almacenados',
                'success'
              )
              setGastos([]);
              setPresupuesto(0);
              setIsValidPresupuesto(false)
            }
          })
        
    }

    return ( 
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
           <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado `}
                />
           </div>
           <div className="contenido-presupuesto">
                <button 
                    className='reset-app'
                    onClick={handleClickReset}
                >
                        Resetear APP
                </button>
                <p>
                    <span>Presupuesto: </span> {`${formatearNumeroADinero(presupuesto)}`}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {`${formatearNumeroADinero(disponible)}`}
                </p>
                <p>
                    <span>Gastado: </span> {`${formatearNumeroADinero(gastado)}`}
                </p>
           </div>
        </div>
     );
}
 
export default ControlPresupuesto;

interface IPropsControlPresupuesto{
    presupuesto: number
    gastos: GastoType[]
    setGastos: React.Dispatch<React.SetStateAction<GastoType[]>>
    setPresupuesto: React.Dispatch<React.SetStateAction<number>>
    setIsValidPresupuesto: React.Dispatch<React.SetStateAction<boolean>>
}