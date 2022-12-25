import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastosEditar, eliminarGasto}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length > 0 ? 'Gastos:' : 'No hay gastos aún'}</h2>

        {gastos.map(gasto => (
          <Gasto
            gasto={gasto}
            key={gasto.id}
            setGastosEditar={setGastosEditar}
            eliminarGasto={eliminarGasto}
          />
        ))}
    </div>
  )
}

export default ListadoGastos