import { useState } from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto}) => {

    const[mensaje, setMensaje] = useState('');

    const handlePresupuesto = e =>{
        e.preventDefault();
        
        setMensaje('');
        if(!Number(presupuesto) || presupuesto < 0) setMensaje('No es un prespuesto válido')
        else console.log('Si es un presupuesto válido');

    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label htmlFor='presupuestoUsuario'>Definir Presupuesto</label>
                    <input
                        className='nuevo-presupuesto'
                        type='text'
                        placeholder='Añade tu presupuesto'
                        id='presupuestoUsuario'
                        value={presupuesto}
                        onChange={e => setPresupuesto(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    value='añadir'
                />

                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
            </form>
        </div>
  )
}

export default NuevoPresupuesto