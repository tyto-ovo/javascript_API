async function getCoin(moneda) {
  try {
    const res = await fetch(`https://mindicador.cl/api/${moneda}`);
    const data = await res.json();
    return data;
    /*     return data.serie[1].valor; */
  } catch (error) {
    alert(error.message);
  }
}
console.log(getCoin("uf"));

/* async function getUf() {
  try {
    const res = await fetch("https://mindicador.cl/api/uf");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    alert(error.message);
  }
}
 */
/* getCoin(); */

const monedaChilena = document.querySelector(".chilena");

const ejecutar = document.getElementById("calcular");

function calcular() {
  const resultado = document.querySelector("textoDefault");

  const tipoMoneda = document.getElementById("coin-select");
  console.log(tipoMoneda.value);
  const num = monedaChilena.value;
  const tipoCambio = getCoin(tipoMoneda);

  resultado.innerHTML = num * tipoCambio;
}
ejecutar.addEventListener("click", calcular);
// Event listener para el botón de agregar tarea
/* document.getElementById("agregarTarea").addEventListener("click", agregarTarea);

// Función para agregar una nueva tarea
function agregarTarea() {
  const descripcion = document.getElementById("nuevaTarea").value;
  if (descripcion.trim()) {
    const nuevaTarea = {
      id: generarId(), // mi generador de ID para que sea mas corto
      descripcion: descripcion,
      realizada: false,
    };
    tareas.push(nuevaTarea);
    renderTareas();
    document.getElementById("nuevaTarea").value = "";
  }
}
 */
