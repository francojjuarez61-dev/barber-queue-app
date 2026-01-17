const mainButton = document.getElementById("mainButton");
const finishButton = document.getElementById("finishButton");
const radialMenu = document.getElementById("radialMenu");
const queueDiv = document.getElementById("queue");

let selectedSpeed = null;
let working = false;

const speeds = {
  rapido: 0.8,
  normal: 1,
  lento: 1.3
};

const services = {
  corte: 25,
  corte_barba: 40,
  corte_barba_sellado: 55,
  permanente: 162
};

mainButton.addEventListener("click", () => {
  if (!working) {
    radialMenu.classList.toggle("hidden");
  }
});

radialMenu.addEventListener("click", (e) => {
  if (e.target.dataset.speed) {
    selectedSpeed = e.target.dataset.speed;
  }

  if (e.target.dataset.service && selectedSpeed) {
    startService(e.target.dataset.service);
    radialMenu.classList.add("hidden");
  }
});

function startService(service) {
  const baseTime = services[service];
  const multiplier = speeds[selectedSpeed];
  const totalTime = Math.round(baseTime * multiplier);

  const endTime = new Date(Date.now() + totalTime * 60000);

  queueDiv.innerHTML = `
    <p><strong>Servicio:</strong> ${service.replaceAll("_", " ")}</p>
    <p><strong>Velocidad:</strong> ${selectedSpeed}</p>
    <p><strong>Finaliza aprox:</strong> ${endTime.toLocaleTimeString()}</p>
  `;

  working = true;
  finishButton.disabled = false;
}

finishButton.addEventListener("click", () => {
  working = false;
  finishButton.disabled = true;
  queueDiv.innerHTML = "<p>Servicio finalizado. Listo para iniciar otro.</p>";
  selectedSpeed = null;
});
