// Set active navbar link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'home-eng.html')) {
      link.classList.add('active');
    }
  });
});

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

// // Wait for DOM to be loaded
// document.addEventListener('DOMContentLoaded', function() {
//   // Check if the user is logged in
//   const loggedIn = localStorage.getItem("loggedIn") === "true";
//   const loginBtn = document.getElementById("loginBtn");
//   const logoutBtn = document.getElementById("logoutBtn");

// // If the user is not logged in — block access to protected pages
// document.querySelectorAll(".protected-link").forEach(link => {
//   link.addEventListener("click", e => {
//     if (!loggedIn) {
//       e.preventDefault();
//       showAlert(" PLEASE LOG IN FIRST!");
//       window.location.href = "../pages/login-eng.html";
//     }
//   });
// });

// // If the user is logged in
// if (loggedIn) {
//   loginBtn.classList.add("d-none");
//   logoutBtn.classList.remove("d-none");
// }

// // Click on "Login"
// loginBtn.addEventListener("click", () => {
//   window.location.href = "../pages/login-eng.html";
// });

// // Click on "Logout"
// logoutBtn.addEventListener("click", () => {
//   localStorage.removeItem("loggedIn");
//   showAlert("You have been logged out.");
//   window.location.reload();
// });

// // Login form
// const form = document.getElementById("loginForm");
// const usernameInput = document.getElementById("username");
// const passwordInput = document.getElementById("password");

// const usernameError = document.getElementById("username-error");
// const passwordError = document.getElementById("password-error");

// const USERS_JSON = "../json/users.json";
// let users = [];

// // Load users from JSON file
// fetch(USERS_JSON)
//   .then(res => {
//     if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
//     return res.json();
//   })
//   .then(json => {
//     users = json.data || [];
//     console.log("Loaded users:", users.map(u => u.username));
//   })
//   .catch(err => console.error("Error loading users.json:", err));

// function resetErrors() {
//   usernameError.textContent = "";
//   passwordError.textContent = "";
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   resetErrors();

//   const username = usernameInput.value.trim();
//   const password = passwordInput.value;

//   if (!username || !password) {
//     if (!username) usernameError.textContent = "Enter username!";
//     if (!password) passwordError.textContent = "Enter password!";
//     return;
//   }

//   const user = users.find(u => u.username === username);
//   if (!user) {
//     usernameError.textContent = "User not found!";
//     return;
//   }

//   try {
//     const hashedPass = CryptoJS.MD5(password).toString().toUpperCase();
//     if (hashedPass === user.password) {
//       localStorage.setItem("loggedIn", "true");
//       window.location.href = "../pages/home-eng.html";
//     } else {
//       passwordError.textContent = "Wrong password!";
//     }
//   } catch (err) {
//     console.error("Login error:", err);
//     passwordError.textContent = "An error occurred during login.";
//   }
// });

// }); // End of DOMContentLoaded

console.log("Script loaded");

// 🔹 Buttons from home page (if they exist)
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    window.location.href = "../pages/login-eng.html";
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    alert("You have been logged out.");
    window.location.reload();
  });
}

// 🔹 "Login" button on the login page
const loginButton = document.getElementById("loginbutton");
if (loginButton) {
  loginButton.addEventListener("click", function () {
    console.log("LOGIN button clicked");
  });
}

// 🔹 Form and fields
const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const USERS_JSON = "../json/users.json";
let users = [];

// 🔹 Load users from users.json
fetch(USERS_JSON)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return res.json();
  })
  .then(json => {
    users = json.data || [];
    console.log("Loaded users:", users.map(u => u.username));
  })
  .catch(err => console.error("Error loading users.json:", err));

// 🔹 Reset error messages
function resetErrors() {
  usernameError.textContent = "";
  passwordError.textContent = "";
}

// 🔹 Handle login
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetErrors();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      if (!username) usernameError.textContent = "Please enter your username!";
      if (!password) passwordError.textContent = "Please enter your password!";
      return;
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      usernameError.textContent = "User not found!";
      return;
    }

    try {
      const hashedPass = CryptoJS.MD5(password).toString().toUpperCase();
      if (hashedPass === user.password) {
        localStorage.setItem("loggedIn", "true");
        console.log("Login successful");
        window.location.href = "../pages/home-eng.html";
      } else {
        passwordError.textContent = "Incorrect password!";
      }
    } catch (err) {
      console.error("Login error:", err);
      passwordError.textContent = "An error occurred during login.";
    }
  });
}
