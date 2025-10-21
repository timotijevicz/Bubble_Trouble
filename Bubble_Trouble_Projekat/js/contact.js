
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


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault(); // sprečava default slanje

        // Dohvati vrednosti polja
        const fname = document.getElementById("fname").value.trim();
        const lname = document.getElementById("lname").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Provera obaveznih polja
        if(!fname || !lname || !email || !message){
            showAlert("Molimo popunite sva obavezna polja!");
            return;
        }

        // Validacija email-a
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!email.match(emailPattern)){
            showAlert("Unesite validnu email adresu!");
            return;
        }

        // Ako je sve OK, preusmeri na success.html
        window.location.href = "../pages/success.html";
    });

}); 