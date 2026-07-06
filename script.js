const elements = document.querySelectorAll('.card, .beneficio');

const showOnScroll = () => {
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener('scroll', showOnScroll);
showOnScroll();


// MENÚ RESPONSIVE
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('activo');
});


// CERRAR MENÚ AL HACER CLICK
const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('activo');
    });
});


// FAQ
const preguntas = document.querySelectorAll('.faq-pregunta');

preguntas.forEach(pregunta => {
    pregunta.addEventListener('click', () => {
        pregunta.parentElement.classList.toggle('activo');
    });
});


// FORMULARIO CON EMAILJS
const formulario = document.getElementById("formulario");
const formMensaje = document.getElementById("formMensaje");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
        formMensaje.textContent = "⚠️ Completa todos los campos.";
        formMensaje.style.color = "#ef4444";
        return;
    }

    const boton = formulario.querySelector("button");

    boton.disabled = true;
    boton.textContent = "Enviando...";

    emailjs.send(
        "service_fxivfeg",
        "template_8l8nwpk",
        {
            name: nombre,
            email: email,
            message: mensaje
        }
    )
    .then(() => {
        formMensaje.textContent = "✅ ¡Mensaje enviado correctamente! Te contactaremos pronto.";
        formMensaje.style.color = "#22c55e";
        formulario.reset();
    })
    .catch((error) => {
        console.error("Error EmailJS:", error);
        formMensaje.textContent = "❌ Ocurrió un error al enviar el mensaje. Intenta nuevamente.";
        formMensaje.style.color = "#ef4444";
    })
    .finally(() => {
        boton.disabled = false;
        boton.textContent = "Enviar mensaje";
    });
});