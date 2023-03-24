import { useEffect, useState } from 'react';
import { GastoType } from '../class/Gasto';

import {formatearNumeroADinero} from '../helpers';

const ControlPresupuesto: React.FC<IPropsControlPresupuesto> = ({gastos, presupuesto}) => {

    const [disponible, setDisponible] = useState<number>(0);
    const [gastado, setGastado] = useState<number>(0);

    useEffect( () => {
        const totalGastado = gastos.map( g => parseInt(g.cantidad)).reduce( (total, g) => total = total + g, 0);console.log(totalGastado);
        setGastado(totalGastado);
        setDisponible(presupuesto - totalGastado);
    }, [gastos])

    return ( 
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
           <div>
                <p>Grafica hjhdhakdjhah hd</p>
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