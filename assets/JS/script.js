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
/* try {

} catch (error) {
  console.error("Error:", error);
} */
async function getPagina(moneda) {
  try {
    const res = await fetch(`https://mindicador.cl/api/${moneda}/`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
// ------------ //

async function obtDatosGrafica(moneda) {
  try {
    const data = await getPagina(moneda);
    const valuesT = [];
    const xValues = [];
    const yValues = [];
    for (let i = 0; i < 10; i++) {
      xValues.unshift(data.serie[i].fecha);
      yValues.unshift(data.serie[i].valor);
    }
    valuesT.push(xValues);
    valuesT.push(yValues);
    return valuesT;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function renderGrafica(moneda) {
  const data = await obtDatosGrafica(moneda);
  const config = {
    type: "line",
    data: {
      labels: data[0],
      datasets: [
        {
          label: "Historial de los últimos 10 días",
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: data[1],
        },
      ],
    },
  };

  const divGrafica = document.querySelector(".grafica");
  divGrafica.innerHTML = "";
  const myChart = document.createElement("canvas");
  myChart.id = "myChart";
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
  divGrafica.appendChild(myChart);
}

// ------------ //
// FUNCION QUE APLICA PROMESA  //
async function obtUf() {
  try {
    const y = await getCoin();
    return y["uf"]["valor"];
  } catch (error) {
    console.error("Error:", error);
  }
}

async function obtDolar() {
  try {
    const y = await getCoin();
    return y["dolar"]["valor"];
  } catch (error) {
    console.error("Error:", error);
  }
}

async function obtEuro() {
  try {
    const y = await getCoin();
    return y["euro"]["valor"];
  } catch (error) {
    console.error("Error:", error);
  }
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
  try {
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
    renderGrafica(tipoMoneda);
  } catch (error) {
    console.error("Error:", error);
  }
}

ejecutar.addEventListener("click", calcular);

blancoInicial();
