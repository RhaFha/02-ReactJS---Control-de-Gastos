import NuevoPesupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";
import { GastoType } from "../class/Gasto";

const Header: React.FC<IPropsHeader> = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos}) => {
    return ( 
        <header>
            <h1>Planificador de Gastos</h1>

            {
                isValidPresupuesto ? (
                    <ControlPresupuesto 
                        presupuesto={presupuesto}
                        gastos={gastos}
                    />
                ):(
                    <NuevoPesupuesto 
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        isValidPresupuesto={isValidPresupuesto}
                        setIsValidPresupuesto={setIsValidPresupuesto}
                    />
                )
            }

        </header>
     );
}
 
export default Header;

interface IPropsHeader{
    presupuesto: number
    setPresupuesto: React.Dispatch<React.SetStateAction<number>>
    isValidPresupuesto: boolean
    setIsValidPresupuesto: React.Dispatch<React.SetStateAction<boolean>>
    gastos: GastoType[]
}