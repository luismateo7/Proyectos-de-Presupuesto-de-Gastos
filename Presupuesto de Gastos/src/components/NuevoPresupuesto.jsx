import React from 'react'

const NuevoPresupuesto = () => {
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form className='formulario'>
            <div className='campo'>
                <label htmlFor='presupuestoUsuario'>Definir Presupuesto</label>
                <input
                    className='nuevo-presupuesto'
                    type='text'
                    placeholder='Añade tu presupuesto'
                    id='presupuestoUsuario'
                />
                <input
                    type='submit'
                    value='añadir'
                />
            </div>
        </form>
    </div>
  )
}

export default NuevoPresupuesto