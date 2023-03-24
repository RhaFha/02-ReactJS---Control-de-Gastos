import { useState } from 'react'
import { GastoType, InitGasto } from '../class/Gasto'
import Mensaje from './Mensaje'

import CerraBtm from '../img/cerrar.svg'

const Modal: React.FC<IPropsModal> = ({setModal, animarModal, setAnimarModal, guardarGasto}) => {

    const [mensaje, setMensaje] = useState<string>('')

    const [formGasto, setFormGasto] = useState<GastoType>(InitGasto)
    const {nombre, cantidad, categoria} = formGasto;

    const handleSubmit = (e: React.FormEvent):void => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Los campos no pueden ir vacios');

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }

        guardarGasto(formGasto);
    }

    const handleOcultarModal = ():void =>{
        
        setAnimarModal(false)

        setTimeout( () => {
            setModal(false);
        }, 500)
    }
    return ( 
        <div className="modal">
            <div className="cerrar-modal" >
                <img 
                    src={CerraBtm}
                    alt='CerrarBtn'
                    onClick={handleOcultarModal}
                />
            </div>
            <form className={`formulario ${animarModal ? 'animar': 'cerrar'}`} onSubmit={handleSubmit}>
                <legend>Nuevo Gasto</legend>

                {
                    mensaje && (<Mensaje tipo='error'>{mensaje}</Mensaje>)
                }
                <div className='campo'>
                    <label htmlFor='nombre'>Nombre del gasto</label>
                    <input
                        id='nombre'
                        type='text'
                        placeholder='Añade el Nombre del Gasto'
                        value={formGasto.nombre}
                        onChange={e => setFormGasto({...formGasto, nombre: e.target.value})}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>
                    <input
                        id='cantidad'
                        type='number'
                        placeholder='Añade la cantidad del gasto; ej. 300'
                        value={formGasto.cantidad}
                        onChange={e => setFormGasto({...formGasto, cantidad: e.target.value})}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='categoria'>Cantidad</label>
                    <select 
                        id='categoria'
                        value={formGasto.categoria}
                        onChange={e => setFormGasto({...formGasto, categoria: e.target.value})}
                    >
                        <option value=''>----- Seleccione ------</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='casa'>Casa</option>
                        <option value='gastos'>Gastos varios</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>
                </div>

                <input type='submit' value='Añadir gasto' />
            </form>
        </div>
     );
}
 
export default Modal;

interface IPropsModal{
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    animarModal: boolean
    setAnimarModal: React.Dispatch<React.SetStateAction<boolean>>
    guardarGasto: (gasto: GastoType) => void
}