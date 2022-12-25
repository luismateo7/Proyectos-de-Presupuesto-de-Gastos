import { useState, useEffect } from 'react';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import { generarId } from './helpers';

function App() {
  
  const[presupuesto, setPresupuesto] = useState(0);
  const[isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const[modal, setModal] = useState(false);
  const[animarModal, setAnimarModal] = useState(false);

  const[gastos, setGastos] = useState([]);

  const[gastosEditar, setGastosEditar] = useState({})

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

  useEffect(()=>{
    if(Object.keys(gastosEditar).length > 0){
      handleNuevoGasto();
    }
  }, [gastosEditar])

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
