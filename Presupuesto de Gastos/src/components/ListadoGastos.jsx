import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastosEditar}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length > 0 ? 'Gastos:' : 'No hay gastos aún'}</h2>

        {gastos.map(gasto => (
          <Gasto
            gasto={gasto}
            key={gasto.id}
            setGastosEditar={setGastosEditar}
          />
        ))}
    </div>
  )
}

export default ListadoGastos