const mainButton = document.getElementById("mainButton");
const radial = document.getElementById("radialMenu");
const queueList = document.getElementById("queueList");
const finishBtn = document.getElementById("finishBtn");
const timeInfo = document.getElementById("timeInfo");
const statusText = document.getElementById("statusText");

let selectedSpeed = null;
let selectedService = null;
let currentEndTime = null;

const DURATIONS = {
  corte: 30,
  corteBarba: 45,
  sellado: 60,
  color: 170,
  permanente: 160
};

const SPEED_MOD = {
  rapido: -10,
  normal: 0,
  lento: +10
};

function getLimitHour() {
  const h = new Date().getHours();
  return h < 13 ? 13 : 22;
}

function updateStatus() {
  if (!currentEndTime) return;

  const limit = new Date();
  limit.setHours(getLimitHour(), 0, 0, 0);

  if (currentEndTime <= limit) {
    mainButton.className = "";
    statusText.textContent = "Dentro del horario";
  } else if ((currentEndTime - limit) <= 30 * 60000) {
    mainButton.className = "warn";
    statusText.textContent = "Justo al límite";
  } else {
    mainButton.className = "bad";
    statusText.textContent = "Fuera de horario";
  }
}

mainButton.onclick = () => {
  radial.classList.toggle("hidden");
};

radial.onclick = (e) => {
  const btn = e.target;
  if (btn.dataset.speed) selectedSpeed = btn.dataset.speed;
  if (btn.dataset.service) selectedService = btn.dataset.service;

  if (selectedSpeed && selectedService) {
    const now = new Date();
    const minutes =
      DURATIONS[selectedService] + SPEED_MOD[selectedSpeed];

    currentEndTime = new Date(now.getTime() + minutes * 60000);

    const li = document.createElement("li");
    li.textContent = `${selectedService} (${selectedSpeed}) → termina ${currentEndTime.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
    queueList.appendChild(li);

    timeInfo.textContent = `Finaliza a las ${currentEndTime.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
    updateStatus();

    radial.classList.add("hidden");
    selectedSpeed = null;
    selectedService = null;
  }
};

finishBtn.onclick = () => {
  currentEndTime = null;
  mainButton.className = "";
  statusText.textContent = "Dentro del horario";
  timeInfo.textContent = "Servicio finalizado. Listo para iniciar.";
};
