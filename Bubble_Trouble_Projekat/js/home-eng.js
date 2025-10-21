

// Centrirana poruka sa OK dugmetom
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


document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === '../pages/home-eng.html')) {
      link.classList.add('active');
    }
  });
});



const loggedIn = localStorage.getItem("loggedIn") === "true";
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");


document.querySelectorAll(".protected-link").forEach(link => {
  link.addEventListener("click", e => {
    if (!loggedIn) {
      e.preventDefault();
      showCenteredAlert("⚠️ PLEASE LOG IN FIRST!", "OK", () => {
        window.location.href = "../pages/login-eng.html";
      });
    }
  });
});


if (loggedIn) {
  loginBtn.classList.add("d-none");
  logoutBtn.classList.remove("d-none");
}


loginBtn.addEventListener("click", () => {
  window.location.href = "../pages/login-eng.html";
});


logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  alert("You have been logged out.");
  setTimeout(() => {
    window.location.reload();
  }, 800);
});

async function translateText(text, targetLang = "en") {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0][0][0];
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}


function cyrillicToLatin(text) {
  const map = {
    "А":"A","Б":"B","В":"V","Г":"G","Д":"D","Ђ":"Đ","Е":"E","Ж":"Ž","З":"Z","И":"I",
    "Ј":"J","К":"K","Л":"L","Љ":"Lj","М":"M","Н":"N","Њ":"Nj","О":"O","П":"P","Р":"R",
    "С":"S","Т":"T","Ћ":"Ć","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Č","Џ":"Dž","Ш":"Š",
    "а":"a","б":"b","в":"v","г":"g","д":"d","ђ":"đ","е":"e","ж":"ž","з":"z","и":"i",
    "ј":"j","к":"k","л":"l","љ":"lj","м":"m","н":"n","њ":"nj","о":"o","п":"p","р":"r",
    "с":"s","т":"t","ћ":"ć","у":"u","ф":"f","х":"h","ц":"c","ч":"č","џ":"dž","ш":"š"
  };
  return text.split("").map(c => map[c] || c).join("");
}


const form = document.getElementById('algorithmForm');
const input = document.getElementById('algorithmInput');
const resultCard = document.getElementById('resultCard');
const nameEl = document.getElementById('algoritamNaziv');
const descriptionEl = document.getElementById('algoritamOpis');
const codeEl = document.getElementById('algoritamKod');


const API_URL = `https://vebdizajn-4.onrender.com/api/vebdizajn/algoritmi-sortiranja`;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const algorithm = input.value.trim();
  if (!algorithm) {
    showCenteredAlert("Please enter the algorithm name!", "OK");
    console.warn(" Algorithm name not provided!");
    return;
  }

  resultCard.classList.add('d-none');
  const requestURL = `${API_URL}?naziv=${encodeURIComponent(algorithm)}`;
  console.log("📡 Calling API:", requestURL);

  try {
    const response = await fetch(requestURL);
    console.log(" API Response:", response);

    if (!response.ok) throw new Error("Network request failed");

    const data = await response.json();
    console.log(" Data received:", data);

    if (data) {
      const translatedName = await translateText(cyrillicToLatin(algorithm), "en");
      const translatedDesc = await translateText(cyrillicToLatin(data.opis || "No description available."), "en");
      const translatedCode = cyrillicToLatin(data.pseudoKod || data.kod || "// No code available.");

      nameEl.textContent = translatedName;
      descriptionEl.textContent = translatedDesc;
      codeEl.textContent = translatedCode;
    } else {
      nameEl.textContent = "Unknown Algorithm";
      descriptionEl.textContent =
        "No description available for this entry. Try: Quick Sort, Merge Sort, Bubble Sort, Insertion Sort, or Selection Sort.";
      codeEl.textContent = "// Algorithm code will be displayed here.";
    }

    resultCard.classList.remove('d-none');
  } catch (error) {
    console.error(" Error fetching algorithm:", error);
    nameEl.textContent = "Error!";
    descriptionEl.textContent = "An error occurred while retrieving data.";
    codeEl.textContent = "";
    resultCard.classList.remove('d-none');
  }
});