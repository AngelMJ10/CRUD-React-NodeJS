import './App.css';
import { useState,useEffect  } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';

function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState("");
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState("");
  const [id,setID] = useState("");

  const [editar,setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  // Función para registrar
  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() =>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: '<strong>¡Empleado registrado!</strong>',
        html: '<i>El empleado <strong>'+nombre+'</strong> fue registrado con exito</i>',
        icon: 'success',
        timer: 5000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  const editarEmpleado = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setID(val.id);
  }

  // Función para editar datos
  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
      id: id
    }).then(() =>{
      getEmpleados();
      Swal.fire({
        title: '<strong>¡Empleado actualizado!</strong>',
        html: '<i>El empleado <strong>'+nombre+'</strong> fue actualizado con exito</i>',
        icon: 'success',
        timer: 5000
      })
      limpiarCampos();
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  // Función para eliminar registro
  const eliminar = (val)=>{

    Swal.fire({
      title: '¿Desea eliminar?',
      html: '<i>Realmente desea eliminar a <strong>'+val.nombre+'</strong>?</i>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, deseo eliminarlo!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then((res) =>{
          getEmpleados();
          limpiarCampos();
          Swal.fire({
            icon: 'success',
            title: 'El empleado <strong>'+val.nombre+'</strong> fue eliminado.',
            showConfirmButton: false,
            timer: 3000
          });
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }

  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setEditar(false);
  }

  useEffect(() => {
    getEmpleados();
  }, []);

  // Función para listar
  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados").then((response) =>{
      setEmpleados(response.data);
    })
  }

  return (
    <div className='container'>
      <div className="card text-center">

        <div className="card-header">
          Gestión de Empleados
        </div>
        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text" value={nombre}
              onChange={(event)=>{
                  setNombre(event.target.value);
              }}
              className="form-control" placeholder="Ingrese Nombre" aria-label="nombre" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input type="number" value={edad}
              onChange={(event)=>{
                setEdad(event.target.value);
              }}
              className="form-control" placeholder="Ingrese Edad" aria-label="edad" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País</span>
            <input type="text" value={pais}
              onChange={(event)=>{
                setPais(event.target.value);
              }}
              className="form-control" placeholder="Ingrese su País" aria-label="pais" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo</span>
            <input type="text" value={cargo}
              onChange={(event)=>{
                setCargo(event.target.value);
              }}
              className="form-control" placeholder="Ingrese su Cargo" aria-label="cargo" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de Experiencia</span>
            <input type="number" value={anios}
              onChange={(event)=>{
                setAnios(event.target.value);
              }}
              className="form-control" placeholder="Ingrese sus años experiencia" aria-label="años" aria-describedby="basic-addon1"/>
          </div>
            
        </div>
        <div className="card-footer text-muted">
          {
            editar?
            <div className='btn-group'>
            <button className='btn btn-outline-warning' onClick={update}>Actualizar</button>
            <button className='btn btn-outline-secondary' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :
            <button className='btn btn-outline-success' onClick={add}>Registrar</button>
          }
        </div>

      </div>

      <div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">País</th>
              <th scope="col">Cargo</th>
              <th scope="col">Experiencia</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
                
          {
            empleadosList.map((val, key) =>{
              return <tr key={val.id}>
                      <td>{val.id}</td>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.anios}</td>
                      <td>{val.estado}</td>
                      <td>
                        <div className='btn-group' role='group' aria-label=''>
                          <button type='button' 
                            onClick={() =>{
                              editarEmpleado(val);
                            }}
                            className='btn btn-sm btn-outline-info'>Editar</button>
                          <button type='button' onClick={()=>{
                            eliminar(val);
                            }} className='btn btn-sm btn-outline-danger'>Eliminar</button>
                        </div>
                      </td>
                    </tr>
            })
          }
          
          </tbody>
        </table>
        
      </div>

    </div>
  );
}

export default App;
