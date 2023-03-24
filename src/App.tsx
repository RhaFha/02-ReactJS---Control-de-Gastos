import { useState } from 'react'
import { GastoType } from './class/Gasto';

import Header from './components/Header';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import IconoNuevo from './img/nuevo-gasto.svg'

import { generarId } from './helpers';


function App() {

  const [presupuesto, setPresupuesto] = useState<number>(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [animarModal, setAnimarModal] = useState<boolean>(false);
  const [gastos, setGastos] = useState<GastoType[]>([])

  const handleNuevoGasto = ():void => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500)
  }

  const guardarGasto = (gasto: GastoType) => {
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto])

    setAnimarModal(false)

        setTimeout( () => {
            setModal(false);
        }, 500)
  }

  return (
   <div className={modal ? 'fijar' : ''}>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />

      {
        isValidPresupuesto && (
          <>
            <main>
              <ListadoGastos 
                gastos={gastos}
              />
            </main>
            <div className='nuevo-gasto'>
              <img 
                src={IconoNuevo}
                alt='Nuevo gasto'
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )
      }

      {
        modal && (
          <Modal 
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
          />
        )
      }

      

      
   </div>
  )
}

export default App
