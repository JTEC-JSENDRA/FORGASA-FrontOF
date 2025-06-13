import './App.css'
import {useState,useEffect} from 'react' 
import OFLiberadas from './Components/container-OF/container-OF_Liberadas.jsx'
import OFLanzadas from './Components/container-OF/container-OF_Lanzadas.jsx'

//import OrdenesFabricacion from './Moks/OF.json'

function App() {

  const [OF_Lanzadas, setOF_Lanzadas] = useState({});
  const [OF_Liberadas, setOF_Liberadas] = useState({});
  const [Lanzar, setLanzar] = useState(false);
  const [Refrescar, setRefrescar] = useState(false);

  setTimeout(() => {
    setRefrescar(!Refrescar);
  }, 55555000);

  // Función para lanzar OF
  const LanzarOF = async (Datos) => {
    try {
      const response = await fetch("http://localhost:7248/api/Liberadas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Datos),
      });

      if (!response.ok) {
        throw new Error("Error en la petición POST");
      } else {
        setLanzar(!Lanzar);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch para obtener OF liberadas
  useEffect(() => {
    fetch("http://localhost:7248/api/Liberadas/FO01")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        let OrdenesFabricacion = data;
        setOF_Liberadas(
          OrdenesFabricacion["soap-env:Envelope"]["soap-env:Body"]["n0:ZMES_GET_OFSResponse"].ET_OFS.item
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [Lanzar]);

  // Fetch para obtener OF lanzadas
  useEffect(() => {
    fetch("http://localhost:7248/api/Lanzadas")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setOF_Lanzadas(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [Lanzar, Refrescar]);

  return (
    
    <div className='container'>
      <header className='header'>
      </header>

      <main className='main'>
      <section className='sub-main'>
          <section className='sub-container'>
            <OFLiberadas OF_Liberadas={OF_Liberadas} OF_Lanzadas={OF_Lanzadas} LanzarOF={LanzarOF}/>
          </section>
        </section>

        <section className='sub-main'>
          <section className='sub-container'>
            <OFLanzadas OF_Lanzadas={OF_Lanzadas}/>
          </section>
        </section>
      </main>

    </div>
  )
}

export default App
