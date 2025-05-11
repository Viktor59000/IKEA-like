document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const firstname = document.getElementById('firstname').value.trim();
  localStorage.setItem('prenom', firstname);
  window.location.href = "index.html";
});
