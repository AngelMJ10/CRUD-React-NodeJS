const express = require("express");
const app = express();
// Llamamos a mysql
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

// Creanmos la conexión
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'React'
});

// Insertar
app.post("/create",(req, res)=> {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre, edad,pais, cargo, anios) VALUES (?,?,?,?,?)',[nombre, edad,pais, cargo, anios],
    (err,result) => {
        if(err) {
            console.log(err);
        }else {
            res.send("¡Empleado registrado con éxito!");
        }
    }
    );
});


app.get("/empleados",(req, res)=> {
    db.query('SELECT * FROM empleados',
    (err,result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    }
    );
});


app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
})