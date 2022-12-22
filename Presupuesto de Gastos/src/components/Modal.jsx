import React from 'react'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal}) => {

    const handleOcultarModal = ()=>{
        setAnimarModal(false);
    
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img 
                    src={CerrarBtn}
                    alt="cerrar-modal"
                    onClick={handleOcultarModal}
                />
            </div>

            <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                <legend>Nuevo Presupuesto</legend>

                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>

                    <input
                        id='nombre'
                        placeholder='Añade el Nombre del Gasto'
                        type='text'
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>

                    <input
                        id='cantidad'
                        placeholder='Añade la cantidad del gasto: ej. 300'
                        type='text'
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>
                    
                    <select
                        id='categoria'
                    >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                </div>

                <input type="submit" value='Añadir gasto'/>

            </form>
        </div>
    )
}

export default Modal