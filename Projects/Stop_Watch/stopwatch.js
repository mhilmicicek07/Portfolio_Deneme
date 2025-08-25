// Button selectors
const startBtn = document.querySelector("#start"),
      stopBtn = document.querySelector("#stop"),
      resetBtn = document.querySelector("#reset"),
      lapBtn = document.querySelector("#lap");

// Display selectors
const hourEl = document.querySelector(".hour"),
      minuteEl = document.querySelector(".minute"),
      secondEl = document.querySelector(".second"),
      millisecondEl = document.querySelector(".millisecond"),
      lapsList = document.querySelector("#laps-list");

// Time variables
let hr = 0, min = 0, sec = 0, ms = 0;
let interval;
let running = false; // Kronometre durumu

// Update display
function updateDisplay() {
    hourEl.innerText = String(hr).padStart(2,'0');
    minuteEl.innerText = String(min).padStart(2,'0');
    secondEl.innerText = String(sec).padStart(2,'0');
    millisecondEl.innerText = String(ms).padStart(2,'0');
}

// Update button states
function updateButtons() {
    startBtn.disabled = running;             // Start kronometre çalışıyorsa pasif
    stopBtn.disabled = !running;             // Stop kronometre çalışıyorsa aktif
    lapBtn.disabled = !running;              // Lap kronometre çalışıyorsa aktif
    resetBtn.disabled = running ? true : false; // Kronometre çalışıyorsa reset pasif, durduğunda aktif
}

// Start kronometre
function start() {
    if(running) return;
    running = true;
    updateButtons();

    interval = setInterval(() => {
        ms += 1;
        if(ms === 100){ ms = 0; sec += 1; }
        if(sec === 60){ sec = 0; min += 1; }
        if(min === 60){ min = 0; hr += 1; }
        updateDisplay();
    }, 10);
}

// Stop kronometre
function stop() {
    if(!running) return;
    running = false;
    clearInterval(interval);
    updateButtons();
}

// Reset kronometre
function reset() {
    if(running) return; // start çalışıyorsa reset pasif
    hr = 0; min = 0; sec = 0; ms = 0;
    updateDisplay();
    lapsList.innerHTML = "";
}

// Add lap
function addLap() {
    if(!running) return; // start pasifse lap çalışmasın
    const lapTime = `${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}:${String(ms).padStart(2,'0')}`;
    const li = document.createElement("li");
    li.innerText = lapTime;
    lapsList.prepend(li);  // En üstte olacak şekilde ekleme
}

// Event listeners
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);

// Sayfa yüklenince buton durumunu başlat
running = false;        // Kronometre başlangıçta duruyor
startBtn.disabled = false;   // Start aktif
stopBtn.disabled = true;     // Stop pasif
lapBtn.disabled = true;      // Lap pasif
resetBtn.disabled = true;    // Reset pasif

// ternory operator
// koşul ? doğruysa ne yapılacak : yanlışsa ne yapılacak ; (ternory operatörü react)