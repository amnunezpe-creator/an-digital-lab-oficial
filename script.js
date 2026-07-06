const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight - 80) {
            element.classList.add("active");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// MENÚ RESPONSIVE
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("activo");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("activo");
    });
});


// CONTADORES ANIMADOS
const contadores = document.querySelectorAll(".contador");
let contadoresIniciados = false;

const animarContadores = () => {
    const statsSection = document.getElementById("estadisticas");
    const rect = statsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100 && !contadoresIniciados) {
        contadoresIniciados = true;

        contadores.forEach(contador => {
            const target = Number(contador.dataset.target);
            let actual = 0;
            const incremento = Math.ceil(target / 60);

            const actualizar = () => {
                actual += incremento;

                if (actual >= target) {
                    contador.textContent = target;
                } else {
                    contador.textContent = actual;
                    requestAnimationFrame(actualizar);
                }
            };

            actualizar();
        });
    }
};

window.addEventListener("scroll", animarContadores);
animarContadores();


// CALCULADORA DE COTIZACIÓN
const checks = document.querySelectorAll(".servicio-check");
const totalCotizacion = document.getElementById("totalCotizacion");

const formatoCLP = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
});

const calcularTotal = () => {
    let total = 0;

    checks.forEach(check => {
        if (check.checked) {
            total += Number(check.value);
        }
    });

    totalCotizacion.textContent = formatoCLP.format(total);
};

checks.forEach(check => {
    check.addEventListener("change", calcularTotal);
});


// CHAT IA SIMULADO
const chatBtn = document.getElementById("chatBtn");
const chatbot = document.getElementById("chatbot");
const cerrarChat = document.getElementById("cerrarChat");
const chatBody = document.getElementById("chatBody");
const chatOptions = document.querySelectorAll(".chat-options button");

chatBtn.addEventListener("click", () => {
    chatbot.classList.toggle("activo");
});

cerrarChat.addEventListener("click", () => {
    chatbot.classList.remove("activo");
});

const respuestas = {
    "Quiero una página web": "¡Excelente! Podemos crear una página moderna, responsiva y conectada a WhatsApp o correo. Puedes completar el formulario y te contactaremos pronto.",
    "¿Cuánto cuesta?": "El valor depende del tipo de proyecto. Una página web básica puede comenzar desde $180.000 CLP. Usa la calculadora para obtener un estimado.",
    "¿Qué servicios ofrecen?": "Ofrecemos diseño web, gestión de redes sociales, inteligencia artificial, automatización y estrategia digital para negocios."
};

chatOptions.forEach(button => {
    button.addEventListener("click", () => {
        const mensaje = button.dataset.msg;

        const userMessage = document.createElement("p");
        userMessage.className = "user";
        userMessage.textContent = mensaje;
        chatBody.appendChild(userMessage);

        setTimeout(() => {
            const botMessage = document.createElement("p");
            botMessage.className = "bot";
            botMessage.textContent = respuestas[mensaje];
            chatBody.appendChild(botMessage);

            chatBody.scrollTop = chatBody.scrollHeight;
        }, 500);
    });
});


// FORMULARIO EMAILJS
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