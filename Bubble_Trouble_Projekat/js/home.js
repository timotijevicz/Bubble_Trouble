// Custom alert function with red styling
function showAlert(message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert';
  alertDiv.textContent = message;
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '20px';
  alertDiv.style.right = '20px';
  alertDiv.style.zIndex = '9999';
  alertDiv.style.minWidth = '300px';
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Centrirana, persistentna poruka sa OK dugmetom
function showCenteredAlert(message, buttonText, onConfirm) {
  // Ako već postoji overlay — nemoj duplirati
  if (document.getElementById('centered-alert-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'centered-alert-overlay';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.5)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '10000';

  const box = document.createElement('div');
  box.style.background = '#fff';
  box.style.color = '#212529';
  box.style.borderRadius = '12px';
  box.style.boxShadow = '0 12px 28px rgba(0,0,0,0.2)';
  box.style.padding = '20px 24px';
  box.style.width = 'min(420px, 92vw)';
  box.style.textAlign = 'center';

  const msg = document.createElement('div');
  msg.textContent = message;
  msg.style.fontWeight = '600';
  msg.style.marginBottom = '16px';
  msg.style.color = '#dc3545';

  const btn = document.createElement('button');
  btn.textContent = buttonText || 'OK';
  btn.className = 'btn btn-primary';
  btn.style.minWidth = '120px';
  btn.addEventListener('click', () => {
    document.body.removeChild(overlay);
    if (typeof onConfirm === 'function') onConfirm();
  });

  box.appendChild(msg);
  box.appendChild(btn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  //  Provera da li je korisnik ulogovan
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

    // Ako nije ulogovan — blokiraj pristup drugim stranicama
    document.querySelectorAll(".protected-link").forEach(link => {
      link.addEventListener("click", e => {
        if (!loggedIn) {
          e.preventDefault();
          showCenteredAlert("⚠️ MOLIM VAS, MORATE DA SE ULOGUJETE!", "OK", () => {
            window.location.href = "../pages/login.html";
          });
        }
      });
    });

    // Ako jeste ulogovan
    if (loggedIn) {
      loginBtn.classList.add("d-none");
      logoutBtn.classList.remove("d-none");
    }

    // Klik na "Prijava"
    loginBtn.addEventListener("click", () => {
      window.location.href = "../pages/login.html";
    });

    // Klik na "Odjava"
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      showAlert("Odjavljeni ste.");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    });

    // Forma za algoritme — IZMENJENI API POZIV
  // Forma za algoritme — IZMENJENI API POZIV + DEBUG
  document.getElementById("algoritamForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const algoritam = document.getElementById("algoritamInput").value.trim();
    const resultCard = document.getElementById("resultCard");
    const naziv = document.getElementById("algoritamNaziv");
    const opis = document.getElementById("algoritamOpis");
    const kod = document.getElementById("algoritamKod");
  
    if (!algoritam) {
      showAlert("Molimo unesite naziv algoritma!");
      console.warn(" Nije unet naziv algoritma!");
      return;
    }
  
    const API_URL = `https://vebdizajn-4.onrender.com/api/vebdizajn/algoritmi-sortiranja?naziv=${encodeURIComponent(algoritam)}`;
    console.log("📡 Pozivam API sa URL:", API_URL);
  
    try {
      const response = await fetch(API_URL);
      console.log(" Odgovor API-ja:", response);
  
      if (!response.ok) {
        console.error(" Neuspešan zahtev — status:", response.status, response.statusText);
        throw new Error("Greška u mrežnom zahtevu");
      }
  
      const data = await response.json();
      console.log(" Podaci primljeni sa API-ja:", data);
  
      // Ispravljeno prema stvarnom formatu API-ja
      if (data) {
        console.log("🔍 Pronađen algoritam:", data);
        naziv.textContent = algoritam; // jer API ne vraća naziv
        opis.textContent = data.opis || "Nema opisa.";
        kod.textContent = data.pseudoKod || data.kod || "// Kod nije dostupan.";
      } else {
        console.warn("⚠️ Algoritam nije pronađen ili struktura odgovora nije očekivana:", data);
        naziv.textContent = "Nepoznat algoritam";
        opis.textContent =
          "Nema dostupnog opisa za ovaj unos. Pokušajte: Quick Sort, Merge Sort, Bubble Sort, Insertion Sort, Selection Sort.";
        kod.textContent = "// Kod algoritma biće prikazan ovde.";
      }
  
      resultCard.classList.remove("d-none");
    } catch (error) {
      console.error("💥 Greška pri fetch pozivu:", error);
      naziv.textContent = "Greška!";
      opis.textContent = "Došlo je do greške prilikom preuzimanja podataka.";
      kod.textContent = "";
      resultCard.classList.remove("d-none");
    }
  });


}); 

// --- UČITAVANJE I PRIKAZ LISTE ALGORITAMA (opcionalno ako se koristi na drugoj stranici) ---
async function loadAlgorithms(API_URL) {
  const container = document.getElementById("algoritmiContainer");
  if (!container) return;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!data || data.length === 0) {
      container.innerHTML = "<p>Trenutno nema dostupnih algoritama.</p>";
      return;
    }

    const translatedData = [];
    for (const alg of data) {
      const name = cyrillicToLatin(await translateText(alg.naziv));
      const desc = cyrillicToLatin(await translateText(alg.opis));
      translatedData.push({ name, description: desc, code: alg.kod });
    }

    renderAlgorithms(translatedData);
  } catch (err) {
    console.error("Greška pri učitavanju algoritama:", err);
    container.innerHTML =
      "<p class='text-danger'>Došlo je do greške prilikom učitavanja podataka.</p>";
  }
}

function renderAlgorithms(algorithms) {
  const container = document.getElementById("algoritmiContainer");
  if (!container) return;

  container.innerHTML = algorithms
    .map(
      (alg) => `
    <div class="card shadow-sm p-3 mb-4 rounded-4">
      <h3 class="text-primary fw-bold">${alg.name}</h3>
      <p class="text-muted">${alg.description}</p>
      <pre class="bg-dark text-white p-3 rounded-3 overflow-auto">${alg.code}</pre>
    </div>`
    )
    .join("");
}