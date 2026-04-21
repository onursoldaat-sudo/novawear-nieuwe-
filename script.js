/* =====================================================
   NOVAWEAR – STABIELE AUTH & HEADER LOGICA
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HELPERS
     ========================= */

  const $ = (s) => document.querySelector(s);

  const isLoggedIn = () =>
    localStorage.getItem("novawearLoggedIn") === "true";

  const getUser = () =>
    JSON.parse(localStorage.getItem("novawearUser"));

  /* =========================
     HEADER – ALTIJD SYNC
     ========================= */

  function syncHeader() {
    const loginLink = $("#loginLink");
    const accountLink = $("#accountLink");
    const logoutBtn = $("#logoutBtn");

    if (!loginLink || !accountLink || !logoutBtn) return;

    if (isLoggedIn()) {
      loginLink.style.display = "none";
      accountLink.style.display = "inline-block";
      logoutBtn.style.display = "inline-block";
    } else {
      loginLink.style.display = "inline-block";
      accountLink.style.display = "none";
      logoutBtn.style.display = "none";
    }
  }

  syncHeader(); // 🔥 ELKE PAGINA

  /* =========================
     REGISTER
     ========================= */

  if (location.pathname.includes("register")) {
    const form = $(".auth-form");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = form.querySelectorAll("input");

        const user = {
          firstName: inputs[0].value.trim(),
          lastName: inputs[1].value.trim(),
          email: inputs[2].value.trim(),
          password: inputs[3].value
        };

        localStorage.setItem("novawearUser", JSON.stringify(user));
        localStorage.setItem("novawearLoggedIn", "true");

        location.href = "account.html";
      });
    }
  }

  /* =========================
     LOGIN
     ========================= */

  if (location.pathname.includes("login")) {
    const form = $(".auth-form");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = form.querySelectorAll("input");
        const email = inputs[0].value.trim();
        const password = inputs[1].value;

        const user = getUser();

        if (!user) {
          alert("Geen account gevonden.");
          return;
        }

        if (email === user.email && password === user.password) {
          localStorage.setItem("novawearLoggedIn", "true");
          location.href = "account.html";
        } else {
          alert("Onjuiste gegevens.");
        }
      });
    }
  }

  /* =========================
     ACCOUNT (BEVEILIGD)
     ========================= */

  if (location.pathname.includes("account")) {
    if (!isLoggedIn()) {
      location.href = "login.html";
      return;
    }

    const user = getUser();
    if (!user) return;

    $("#accountName").textContent =
      user.firstName + " " + user.lastName;
    $("#accountEmail").textContent = user.email;
  }

  /* =========================
     LOGOUT
     ========================= */

  const logoutBtn = $("#logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("novawearLoggedIn");
      location.href = "index.html";
    });
  }

});