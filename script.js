/* ============================================================
   ACADEMIA DE ASTRONAUTAS — script.js
   ============================================================ */

// ——— Configura aquí tu endpoint de API Gateway ———
const API_URL = 'https://cn5vtxz85l.execute-api.us-east-1.amazonaws.com/dev/register';

/* ---------- Generador de estrellas ---------- */
(function createStars() {
  const container = document.getElementById('stars');
  const COUNT = 180;

  for (let i = 0; i < COUNT; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 2.5 + 0.5;          // 0.5–3 px
    const delay = (Math.random() * 6).toFixed(2);     // 0–6 s
    const duration = (Math.random() * 4 + 2).toFixed(2); // 2–6 s

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --dur: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(star);
  }
})();

/* ---------- Formulario de registro ---------- */
const form       = document.getElementById('registrationForm');
const submitBtn  = document.getElementById('submitBtn');
const btnText    = submitBtn.querySelector('.btn__text');
const btnLoading = submitBtn.querySelector('.btn__loading');
const alertOk    = document.getElementById('alertSuccess');
const alertErr   = document.getElementById('alertError');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name  = form.name.value.trim();
  const email = form.email.value.trim();

  // Validación básica
  if (!name || !email) {
    showAlert(alertErr, '⚠️ Por favor, rellena todos los campos.');
    return;
  }

  // Estado: cargando
  setLoading(true);
  hideAlerts();

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Éxito
    form.reset();
    showAlert(alertOk);
  } catch (err) {
    console.error('Error al enviar:', err);
    showAlert(alertErr, '❌ No se pudo conectar con el servidor. Inténtalo más tarde.');
  } finally {
    setLoading(false);
  }
});

/* ---------- Helpers ---------- */
function setLoading(loading) {
  submitBtn.disabled = loading;
  btnText.hidden     = loading;
  btnLoading.hidden  = !loading;
}

function hideAlerts() {
  alertOk.hidden  = true;
  alertErr.hidden = true;
}

function showAlert(el, customMsg) {
  if (customMsg) el.textContent = customMsg;
  el.hidden = false;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

