import { useState, useEffect } from 'react';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import { generarId } from './helpers';

function App() {
  
  const[presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const[isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const[modal, setModal] = useState(false);
  const[animarModal, setAnimarModal] = useState(false);

  const[gastos, setGastos] = useState([]);

  const[gastosEditar, setGastosEditar] = useState({})

  // const[]

  const handleNuevoGasto = ()=>{
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  }

  const guardarGasto = gasto =>{
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
    setGastos(gastosActualizados)
  }

  useEffect(()=>{
    if(Object.keys(gastosEditar).length > 0){
      handleNuevoGasto();
    }
  }, [gastosEditar])

  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

useEffect(() => {
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
  presupuestoLS > 0 && setIsValidPresupuesto(true);
}, [])


  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />

      {isValidPresupuesto &&
        <>

          <main>
            <ListadoGastos
              gastos={gastos}
              setGastosEditar={setGastosEditar}
              eliminarGasto={eliminarGasto}
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
