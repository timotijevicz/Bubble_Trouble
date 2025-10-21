// // Custom alert function with red styling
// function showAlert(message) {
//   const alertDiv = document.createElement('div');
//   alertDiv.className = 'alert';
//   alertDiv.textContent = message;
//   alertDiv.style.position = 'fixed';
//   alertDiv.style.top = '20px';
//   alertDiv.style.right = '20px';
//   alertDiv.style.zIndex = '9999';
//   alertDiv.style.minWidth = '300px';
//   document.body.appendChild(alertDiv);
  
//   setTimeout(() => {
//     alertDiv.remove();
//   }, 5000);
// }

// //
// document.addEventListener('DOMContentLoaded', function() {
//   // Provera da li je korisnik ulogovan 
//   const loggedIn = localStorage.getItem("loggedIn") === "true"; 
//   const loginBtn = document.getElementById("loginBtn");
//   const logoutBtn = document.getElementById("logoutBtn"); 

// // Ako nije ulogovan — blokiraj pristup drugim stranicama

//  document.querySelectorAll(".protected-link").forEach(link => {
//     link.addEventListener("click", e => { 
//     if (!loggedIn) {
//     e.preventDefault();
//     showAlert(" MOLIM VAS, MORATE DA SE ULOGUJETE!"); 
//     window.location.href = "../home.html";
//     } 
//     });
// }); 

// // Ako jeste ulogovan 

// if (loggedIn) {
//  loginBtn.classList.add("d-none");
//  logoutBtn.classList.remove("d-none");
//  } 

// // Klik na "Prijava" 
// loginBtn.addEventListener("click", () => { 
// window.location.href = "../pages/login.html";
//  }); 
// // Klik na "Odjava" 
// logoutBtn.addEventListener("click", () => { 
// localStorage.removeItem("loggedIn");
//  showAlert("Odjavljeni ste."); 
// window.location.reload(); 
// });


// // Login forma
//   const form = document.getElementById("loginForm");
//   const usernameInput = document.getElementById("username");
//   const passwordInput = document.getElementById("password");

//   const usernameError = document.getElementById("username-error");
//   const passwordError = document.getElementById("password-error");

//   const USERS_JSON = "../json/users.json";
//   let users = [];

//   // Učitavanje korisnika iz JSON fajla
//   fetch(USERS_JSON)
//     .then(res => {
//       if (!res.ok) throw new Error(`Greška HTTP ${res.status}`);
//       return res.json();
//     })
//     .then(json => {
//       users = json.data || [];
//       console.log("Učitani korisnici:", users.map(u => u.username));
//     })
//     .catch(err => console.error("Greška pri učitavanju users.json:", err));

//   function resetErrors() {
//     usernameError.textContent = "";
//     passwordError.textContent = "";
//   }

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     resetErrors();

//     const username = usernameInput.value.trim();
//     const password = passwordInput.value;

//     if (!username || !password) {
//       if (!username) usernameError.textContent = "Unesite korisničko ime!";
//       if (!password) passwordError.textContent = "Unesite lozinku!";
//       return;
//     }

//     const user = users.find(u => u.username === username);
//     if (!user) {
//       usernameError.textContent = "Korisnik nije pronađen!";
//       return;
//     }

//     try {
//       const hashedPass = CryptoJS.MD5(password).toString().toUpperCase();
//       if (hashedPass === user.password) {
//         localStorage.setItem("loggedIn", "true");
//         window.location.href = "../home.html";
//       } else {
//         passwordError.textContent = "Pogrešna lozinka!";
//       }
//     } catch (err) {
//       console.error("Greška pri prijavi:", err);
//       passwordError.textContent = "Došlo je do greške prilikom prijave.";
//     }
//   });

// }); // End of DOMContentLoaded


console.log("Skripta učitana");

//  Dugmad iz home stranice (ako postoje)
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    window.location.href = "../pages/login.html";
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    alert("Odjavljeni ste.");
    window.location.reload();
  });
}

//  Dugme "Uloguj se" na login stranici
const loginButton = document.getElementById("loginbutton");
if (loginButton) {
  loginButton.addEventListener("click", function () {
    console.log("Kliknuto na ULOGUJ SE");
  });
}

//  Forma i polja
const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const USERS_JSON = "../json/users.json";
let users = [];

//  Učitavanje korisnika iz users.json
fetch(USERS_JSON)
  .then(res => {
    if (!res.ok) throw new Error(`Greška HTTP ${res.status}`);
    return res.json();
  })
  .then(json => {
    users = json.data || [];
    console.log("Učitani korisnici:", users.map(u => u.username));
  })
  .catch(err => console.error("Greška pri učitavanju users.json:", err));

// 🔹 Reset grešaka
function resetErrors() {
  usernameError.textContent = "";
  passwordError.textContent = "";
}

// 🔹 Obrada prijave
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetErrors();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      if (!username) usernameError.textContent = "Unesite korisničko ime!";
      if (!password) passwordError.textContent = "Unesite lozinku!";
      return;
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      usernameError.textContent = "Korisnik nije pronađen!";
      return;
    }

    try {
      const hashedPass = CryptoJS.MD5(password).toString().toUpperCase();
      if (hashedPass === user.password) {
        localStorage.setItem("loggedIn", "true");
        console.log("Uspješna prijava");
        window.location.href = "../home.html";
      } else {
        passwordError.textContent = "Pogrešna lozinka!";
      }
    } catch (err) {
      console.error("Greška pri prijavi:", err);
      passwordError.textContent = "Došlo je do greške prilikom prijave.";
    }
  });
}

