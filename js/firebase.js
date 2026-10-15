// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Capturar los elementos del DOM correctamente
const formulario = document.getElementById('form-contacto');
const btnEnviar = document.getElementById('btn-enviar');
const mostrarMensaje = document.getElementById('mostrar-mensaje');

formulario.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar

    // Obtenemos los valores (.value) de los inputs
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const tipoConsulta = document.getElementById('tipo-consulta').value;
    const mensaje = document.getElementById('mensaje').value;

    try {
        btnEnviar.textContent = 'Enviando...';
        btnEnviar.disabled = true; // Corregido a minúscula

        // Guardar en Firestore incluyendo todos los campos útiles
        await addDoc(collection(db, 'solicitudes'), {
            nombre: nombre,
            email: email,
            telefono: telefono,
            tipoConsulta: tipoConsulta,
            mensaje: mensaje,
            fecha: serverTimestamp()
        });

        mostrarMensaje.style.color = '#fff';
        mostrarMensaje.textContent = '¡Solicitud enviada correctamente!';
        formulario.reset();
    } catch (error) {
        console.error('Error al guardar:', error);
        mostrarMensaje.style.color = '#ff3333';
        mostrarMensaje.textContent = 'Error al enviar el mensaje. Inténtalo de nuevo.';
    } finally {
        btnEnviar.textContent = 'Enviar Cotización';
        btnEnviar.disabled = false; // Corregido a minúscula
    }
});
