let auxilioTransporte = 0;
let alta = 0;
let baja = 999_999_999;
let total = 0;
let prima = 0;
let nombreMayor = "";
let nombreMenor = "";
let promedio = 0;
let contador = 0;

const SALARIOMINIMO = 828_116;

// ***********************************
const FORM = document.getElementById("formulario");
const INFORMACION = document.getElementById("opciones");
const LISTADO = document.getElementById("listado");
//***********Eventos**********/
INFORMACION.addEventListener("click", getInformacion);
FORM.addEventListener("submit", guardarEmpleado);
LISTADO.addEventListener("click", getEmpleado);
//*******Funciones********/
function guardarEmpleado(e) {
    e.preventDefault();

    const NOMBRE = document.getElementById("nombre");
    let nombre = NOMBRE.value;
    let cedula = document.getElementById("numeroDocumento").value;
    let salario = document.getElementById("salario").value;
    let diasTrabajados = document.getElementById("diasTrabajo").value;
    //**************************************************/

    if (salario < parseInt(SALARIOMINIMO * 2)) {
        auxilioTransporte = 97_032;
        salario = parseInt(salario) + parseInt(auxilioTransporte);
    }
    else {
        auxilioTransporte = 0.0;
        salario = parseInt(salario) + parseInt(auxilioTransporte);
    }

    if (diasTrabajados <= 179) {
        prima = parseInt((salario * diasTrabajados) / 360);
    } else if (diasTrabajados == 180) {
        prima = parseInt(salario / 2);
    } else {
        alert("Supera los dias del semestre")
    }

    let empleado = {
        nombre,
        cedula,
        salario,
        auxilioTransporte,
        prima,
        diasTrabajados
    };

    if (empleado.nombre != "" && empleado.cedula != "" && empleado.salario != "" ) {
        if (localStorage.getItem("empleados") === null) {
            let empleados = [];
            empleados.push(empleado);
            localStorage.setItem("empleados", JSON.stringify(empleados));
        }
        else {
            let empleados = JSON.parse(localStorage.getItem("empleados"));
            empleados.push(empleado);
            localStorage.setItem("empleados", JSON.stringify(empleados));
        }
    } else {
        alert("Verifique bien la información");
    }
    // **************************
    // console.log(empleado);
    FORM.reset();
    getEmpleado();
}
//***************************************************** */
function getEmpleado() {
    let empleados = JSON.parse(localStorage.getItem("empleados"));

    const empleadosView = document.getElementById("empleados");
    empleadosView.innerHTML = "";

    if (empleados != null) {
        for (let i = 0; i < empleados.length; i++) {
            let nombre = empleados[i].nombre;
            let cedula = empleados[i].cedula;
            let salario = empleados[i].salario;
            let auxilioTransporte = empleados[i].auxilioTransporte;
            let prima = empleados[i].prima;
            let diasTrabajados = empleados[i].diasTrabajados;


            empleadosView.innerHTML += `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">N°</th>
                        <th scope="col">Nombre empleado</th>
                        <th scope="col">Cedula</th>
                        <th scope="col">Salario</th>
                        <th scope="col">Auxilio transporte</th>
                        <th scope="col">Prima de servicios</th>
                        <th scope="col">Dias trabajados</th>
                        <th scope="col">ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${nombre}</td>
                        <td>${cedula}</td>
                        <td>${salario}</td>
                        <td>${auxilioTransporte}</td>
                        <td>${prima}</td>
                        <td>${diasTrabajados}</td>
                        <td> <a class="btn btn-danger float-end" onclick="deleteEmpleado('${nombre}')">Eliminar</a></td>
                    </tr>
                </tbody>
            </table>`;
        }
    }
}
function deleteEmpleado(nombre) {
    let empleados = JSON.parse(localStorage.getItem("empleados"))

    for (let i = 0; i < empleados.length; i++) {
        let nombreEmpleado = empleados[i].nombre;
        if (nombre == nombreEmpleado) {
            empleados.splice(i, 1);
        }
    }
    localStorage.setItem("empleados", JSON.stringify(empleados));
    getEmpleado();
}
function getInformacion(e) {
    let empleados = JSON.parse(localStorage.getItem("empleados"));

    const empleadosView = document.getElementById("empleados");
    empleadosView.innerHTML = "";

    if (empleados != null) {
        for (let i = 0; i < empleados.length; i++) {
            let nombre = empleados[i].nombre;
            // let cedula = empleados[i].cedula;
            // let salario = empleados[i].salario;
            // let auxilioTransporte = empleados[i].auxilioTransporte;
            let prima = empleados[i].prima;
            // let diasTrabajados = empleados[i].diasTrabajados;
            contador++;

            if (prima > alta) {
                alta = prima;
                nombreMayor = nombre;
            }
            if (prima < baja) {
                baja = prima;
                nombreMenor = nombre;
            }
            total = parseInt(total) + parseInt(prima);
            promedio = parseInt(total) / parseInt(contador);

        }
        empleadosView.innerHTML += `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Promedio</th>
                        <th scope="col">Total</th>
                        <th scope="col">Mayor</th>
                        <th scope="col">Menor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${promedio}</td>
                        <td>${total}</td>
                        <td>${nombreMayor}</td>
                        <td>${nombreMenor}</td>
                    </tr>
                </tbody>
            </table>`;
    }
}