import { useState, useEffect } from 'react';

import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import Filtros from './components/Filtros';

import IconoNuevoGasto from './img/nuevo-gasto.svg';
import { generarId } from './helpers';

function App() {
  
  const[presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const[isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const[modal, setModal] = useState(false);
  const[animarModal, setAnimarModal] = useState(false);

  const[gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const[gastosEditar, setGastosEditar] = useState({})

  const[filtro, setFiltro] = useState('');
  const[gastosFiltrados, setGastosFiltrados] = useState([]);

  const handleNuevoGasto = ()=>{
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  }

  const guardarGasto = gasto =>{
  //Si cuenta con un id entonces ya existe ese gasto y solo se lo edita, sino es un gasto nuevo
  
  if(gasto.id){
      //Editar Gasto
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    }
    else{
      //Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados) //Devuelve todos los datos menos el que tiene el id que quiero eliminar
  }

  useEffect(()=>{
    if(Object.keys(gastosEditar).length > 0){
      handleNuevoGasto();
    }
  }, [gastosEditar]) //Cuando se hace el leadingActions(Editar) del compontente Gasto, se dispara el modal para editar el gasto

  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]) //Guardar el presupuesto en LS

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    presupuestoLS > 0 && setIsValidPresupuesto(true);
  }, []) //Si ya hay presupuesto guardado en LS entonces lo redirijo directamente para que vea el componente del Listado de Gastos

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos]) //Guardar todos los gastos en LS cuando cambia

  useEffect(()=>{
    if(filtro.length > 0){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]) //Cuando filtro cambia lo pongo en su state y luego si hay algo muestro esos gastos filtrados en el componente Listado de Gastos 

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto &&
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastosEditar={setGastosEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}/>
          </div>
        </>
      }

      {modal &&
                <Modal 
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastosEditar={gastosEditar}
                  setGastosEditar={setGastosEditar}
                />
      }
      
    </div>
  )
}

export default App
