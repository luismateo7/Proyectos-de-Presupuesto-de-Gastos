import { useState, useEffect } from 'react'
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastosEditar, setGastosEditar}) => {

    const[mensaje, setMensaje] = useState('');
    const[nombre, setNombre] = useState('');
    const[cantidad, setCantidad] = useState('');
    const[categoria, setCategoria] = useState('');
    const[id, setId] = useState('');
    const[fecha, setFecha] = useState('');

    const handleOcultarModal = ()=>{
        setAnimarModal(false);
        setGastosEditar({}); //Si el form se cerró y tenía gastos a editar entonces lo deja vacío almenos que otra vez quiera editar cuyo caso tiene que hacer el SwipeAction
    
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        
        if([nombre, cantidad, categoria].includes('') || cantidad < 1){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('');
            }, 1500);

            return
        }

        setGastosEditar({}); //Limpiar los gastos a editar
        guardarGasto({nombre, cantidad, categoria,id, fecha});
    }

    useEffect(() => {
      if(Object.keys(gastosEditar).length > 0){
        setNombre(gastosEditar.nombre)
        setCantidad(gastosEditar.cantidad)
        setCategoria(gastosEditar.categoria)
        setId(gastosEditar.id)
        setFecha(gastosEditar.fecha)
      }
    }, []) //Si el state gstosEditar que pase por Prop contiene algo es porque hay algo que editar por lo tanto los input del form van a tener sus valores con el gasto de ese state gastosEditar

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img 
                    src={CerrarBtn}
                    alt="cerrar-modal"
                    onClick={handleOcultarModal}
                />
            </div>

            <form
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>{gastosEditar.nombre ? 'Editar Gasto' : 'Nuevo Presupuesto'}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>

                    <input
                        id='nombre'
                        placeholder='Añade el Nombre del Gasto'
                        type='text'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>

                    <input
                        id='cantidad'
                        placeholder='Añade la cantidad del gasto: ej. 300'
                        type='number'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>
                    
                    <select
                        id='categoria'
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
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

                <input type="submit" value={gastosEditar.nombre ? 'Guardar Cambios' : 'Añadir gasto'}/>

            </form>
        </div>
    )
}

export default Modal