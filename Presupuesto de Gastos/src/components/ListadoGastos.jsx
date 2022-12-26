import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastosEditar, eliminarGasto, filtro, gastosFiltrados}) => {

  const gastosMostrar = filtro ? gastosFiltrados : gastos //Decido que gastos son los que se muestran

  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastosMostrar.length > 0 ? 'Gastos:' : 'No hay gastos aún'}</h2>
        
        {
          gastosMostrar.map(gasto => (
            <Gasto
              gasto={gasto}
              key={gasto.id}
              setGastosEditar={setGastosEditar}
              eliminarGasto={eliminarGasto}
          />))
        }
    </div>
  )
}

export default ListadoGastos