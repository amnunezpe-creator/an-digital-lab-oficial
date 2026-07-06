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


// FORMULARIO
const formulario = document.getElementById('formulario');
const formMensaje = document.getElementById('formMensaje');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre === '' || email === '' || mensaje === '') {
        formMensaje.textContent = 'Por favor completa todos los campos.';
        formMensaje.style.color = 'red';
        return;
    }

    formMensaje.textContent = '¡Mensaje enviado correctamente! Te contactaremos pronto.';
    formMensaje.style.color = 'green';

    formulario.reset();
});