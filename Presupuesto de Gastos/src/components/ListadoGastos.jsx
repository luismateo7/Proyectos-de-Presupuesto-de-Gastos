import React from 'react'

const ListadoGastos = ({gastos}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length > 0 ? 'Gastos:' : 'No hay gastos aún'}</h2>

        
    </div>
  )
}

export default ListadoGastos