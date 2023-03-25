import { GastoType } from "../class/Gasto";
import Gasto from "./Gasto";

const ListadoGastos: React.FC<IPropsListadoGastos> = ({gastos, editarGasto, setGastoEditar, eliminarGasto}) => {
    return ( 
        <div className="listado-gastos contenedor">
            <h2>{ gastos.length ? 'Gastos' : 'Aun no hay gastos'}</h2>

            {
                gastos.map(g => (
                    <Gasto 
                        key={g.id} 
                        gasto={g}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                    />
                ))
            }
        </div>
     );
}
 
export default ListadoGastos;

interface IPropsListadoGastos{
    gastos: GastoType[]
    editarGasto: GastoType
    setGastoEditar: React.Dispatch<React.SetStateAction<GastoType>>
    eliminarGasto: (id: string) => void
}