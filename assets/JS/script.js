// ------------ //
// REQUEST DEL API //
async function getCoin() {
  try {
    const res = await fetch("https://mindicador.cl/api");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
// ------------ //

async function obtDatosGrafica(moneda) {
  const data = await getCoin();
  console.log(moneda);
}
obtDatosGrafica("uf");
// ------------ //
// FUNCION QUE APLICA PROMESA  //
async function obtUf() {
  const y = await getCoin();
  /*   console.log(y["dolar"]["valor"]); */
  return y["uf"]["valor"];
}

async function obtDolar() {
  const y = await getCoin();
  /*   console.log(y["dolar"]["valor"]); */
  return y["dolar"]["valor"];
}

async function obtEuro() {
  const y = await getCoin();
  /*   console.log(y["euro"]["valor"]); */
  return y["euro"]["valor"];
}

// ------------ //

function blancoInicial() {
  let nume = document.querySelector(".chilena");
  let valor = document.getElementById("coin-select");

  nume.value = "";
  valor.value = "";
}

const formatClp = new Intl.NumberFormat("de-DE");
const formatUsd = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});
const formatEu = new Intl.NumberFormat("en-EU", {
  currency: "EUR",
  style: "currency",
});
// ------------ //

const ejecutar = document.getElementById("calcular");

async function calcular() {
  const resultado = document.querySelector(".resultado");
  const monedaChilena = document.querySelector(".chilena");
  const tipoMoneda = document.getElementById("coin-select").value;
  const num = monedaChilena.value;
  let tipoCambio;

  if (tipoMoneda == "uf") {
    tipoCambio = await obtUf();
    d = formatClp.format((num / tipoCambio).toFixed(2));
    resultado.innerHTML = `Resultado: ${d} UF `;
  } else if (tipoMoneda == "dolar") {
    tipoCambio = await obtDolar();
    d = formatUsd.format((num / tipoCambio).toFixed(2));
    resultado.innerHTML = `Resultado: ${d} `;
  } else if (tipoMoneda == "euro") {
    tipoCambio = await obtEuro();
    d = formatEu.format((num / tipoCambio).toFixed(2));
    resultado.innerHTML = `Resultado: ${d}`;
  }
  /*   resultado.innerHTML = `Resultado: $${num / tipoCambio}`; */
}

ejecutar.addEventListener("click", calcular);

blancoInicial();
