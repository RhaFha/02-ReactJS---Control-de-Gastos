import { useState, useEffect } from 'react'
import { GastoType, InitGasto } from './class/Gasto';

import Header from './components/Header';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import IconoNuevo from './img/nuevo-gasto.svg'

import { generarId } from './helpers';


function App() {

  const [presupuesto, setPresupuesto] = useState<number>( localStorage.getItem('presupuesto') ? parseInt(localStorage.getItem('presupuesto') as string) : 0 ); console.log(presupuesto)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [animarModal, setAnimarModal] = useState<boolean>(false);
  const [gastos, setGastos] = useState<GastoType[]>( localStorage.getItem('gastos') !== null ? JSON.parse( localStorage.getItem('gastos') as string ) : [])
  const [gastoEditar, setGastoEditar] = useState<GastoType>(InitGasto)

  useEffect( () => {
    localStorage.setItem('presupuesto', presupuesto.toString() ?? '0');
  }, [presupuesto])

  useEffect( () => {
    localStorage.setItem('gastos', JSON.stringify( gastos ) ?? JSON.stringify([]));
  }, [gastos])

  useEffect( () => {
    if( gastoEditar.id ){
      handleNuevoGasto();
    }
  }, [gastoEditar])

  useEffect( () => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  },[])

  const handleNuevoGasto = ():void => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500)
  }

  const guardarGasto = (gasto: GastoType) => {

    if(gasto.id){
      const arrayGastos = gastos.map( g => g.id === gasto.id ? gasto : g )
      setGastos(arrayGastos);
    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }
    

    setAnimarModal(false)

        setTimeout( () => {
            setModal(false);
        }, 500)
    
    setGastoEditar(InitGasto);
  }

  const eliminarGasto = (id: string) => {
    const gastosActualizados = gastos.filter(g => g.id !== id && g);
    setGastos(gastosActualizados);
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
                editarGasto={gastoEditar}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
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
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        )
      }

      

      
   </div>
  )
}

export default App
