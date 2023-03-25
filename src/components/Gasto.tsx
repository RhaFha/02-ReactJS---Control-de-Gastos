import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from "react-swipeable-list";
  import "react-swipeable-list/dist/styles.css";

import { GastoType } from "../class/Gasto";
import { formatearFecha } from '../helpers';

import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscipciones from '../img/icono_suscripciones.svg';

interface TipoDeObjeto {
    [index: string]: string;
    ahorro: string;
    comida: string;
    casa: string;
    gastos: string;
    ocio: string;
    salud: string;
    suscripciones: string;
  }

const diccionariosIconos: TipoDeObjeto = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscipciones
}

const Gasto: React.FC<IPropsGasto> = ({gasto, setGastoEditar, eliminarGasto}) => {

    const leadingActions = () => (
        <LeadingActions>
          <SwipeAction onClick={() => setGastoEditar(gasto)}>
            Editar
          </SwipeAction>
        </LeadingActions>
      );
      const trailingActions = () => (
        <TrailingActions>
          <SwipeAction 
            onClick={() => gasto.id && eliminarGasto(gasto.id)}
            destructive={true}
          >
            Eliminar
          </SwipeAction>
        </TrailingActions>
      );

    const {id, fecha, nombre, cantidad, categoria} = gasto
    return ( 
        <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img 
                            src={diccionariosIconos[categoria]}
                            alt='Icono Gasto'
                            />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">Agregado el: <span>{fecha && formatearFecha(fecha)} </span></p>
                            
                        </div>

                    </div>
                    <p className="cantidad-gasto">${cantidad}</p>
                </div>
                </SwipeableListItem>
    </SwipeableList>   
     );
}
 
export default Gasto;

interface IPropsGasto{
    gasto: GastoType
    setGastoEditar: React.Dispatch<React.SetStateAction<GastoType>>
    eliminarGasto: (id: string) => void
}