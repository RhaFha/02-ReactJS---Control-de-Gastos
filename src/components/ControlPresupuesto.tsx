import { useEffect, useState } from 'react';
import { GastoType } from '../class/Gasto';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

import {formatearNumeroADinero} from '../helpers';

const ControlPresupuesto: React.FC<IPropsControlPresupuesto> = ({gastos, presupuesto}) => {

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

    return ( 
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
           <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: '#3B82F6',
                        trailColor: '#F5F5F5'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado `}
                />
           </div>
           <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span> {`${formatearNumeroADinero(presupuesto)}`}
                </p>
                <p>
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
}