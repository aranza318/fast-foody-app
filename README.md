# Fast Foody App 🍔

### Una Breve Descripción del Proyecto

**Fast Foody App** es una aplicación móvil desarrollada en **React Native** que permite a los usuarios realizar pedidos de comida de manera rápida y sencilla. Integra funcionalidades como autenticación, localización de punto de entrega para el delivery, y seguimiento de órdenes en tiempo real, ofreciendo una experiencia moderna y eficiente para sus usuarios.  

Objetivo principal del proyecto: busca demostrar cómo combinar herramientas modernas como Redux, Firebase, y Expo para crear una solución completa y funcional.

---
## Demo  
Mira el video demostrativo del proyecto [aquí](https://www.youtube.com/watch?v=hvogYvKGWZE).  
---

## Presentación de los Alcances del Proyecto

- Autenticación para el registro e inicio de sesión seguro mediante Firebase.
- Surtir los productos en listas por categoría y opciones para agregar al carrito de compras.
- Dejar claro para el usuario su compra mediante la generación y almacenamiento de recibos por usuario.
- Facilitar una función de geolocalización para que el cliente pueda mostrar donde se encuentra y así agregar esta dirección en su orden si desea delivery.
- Generar notificaciones visuales con `Toast` para informar al usuario del flujo de la app.
- Hoy por hoy, un punto importante para la experiencia del usuario: un diseño atractivo y responsivo optimizado para combinar funcionamiento con comodidad de uso y acciones fáciles de entender.

---

## Features Incluidos

- **Autenticación:** Registro e inicio de sesión con Firebase.
- **Carrito de Compras:** Manejo de productos y totales.
- **Geolocalización:** Muestra de ubicaciones cercanas utilizando mapas interactivos.
- **Notificaciones:** Mensajes tipo toast para alertas rápidas.
- **Recibos por Usuario:** Gestión de compras realizadas, filtradas por usuario actual.

---

## Librerías Utilizadas y Motivo

### **React Navigation**
- Dependencias: `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`
- **Motivo:** Para implementar navegación fluida entre pantallas con pilas y pestañas.

### **Redux Toolkit**
- Dependencias: `@reduxjs/toolkit`, `react-redux`
- **Motivo:** Para manejar el estado global de la aplicación, como autenticación y carrito de compras.

### **Expo**
- Dependencias: `expo`, `expo-image-picker`, `expo-location`, `expo-sqlite`
- **Motivo:** Facilita el desarrollo con APIs nativas para acceso a cámara, localización y base de datos local.

### **React Native Toast Message**
- Dependencia: `react-native-toast-message`
- **Motivo:** Para mostrar notificaciones rápidas y estilizadas a los usuarios.

### **React Native Maps**
- Dependencia: `react-native-maps`
- **Motivo:** Para integrar mapas interactivos y mostrar ubicaciones cercanas.

### **React Native Vector Icons**
- Dependencia: `react-native-vector-icons`
- **Motivo:** Para incorporar íconos atractivos y consistentes en el diseño de la app.

### **SQLite**
- Dependencia: `expo-sqlite`
- **Motivo:** Para el manejo de datos persistentes localmente.

---

## Pasos de Instalación y Puesta en Marcha

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/tu_usuario/fast-foody-app.git
   cd fast-foody-app
2. **Instalar Dependencias:**
   Asegúrate de tener instalado `Node.js` y `Expo CLI`. Continúa por ejecutar el siguiente comando para instalar todas las dependencias del proyecto:
   ```bash
   npm install
3. **Configurar Variables de Entorno:**
   La seguridad de los datos es lo primero, por eso no subí esta parte; igualmente te dejo cómo hacerlo para que puedas correr el proyecto con naturalidad.
   Crea un archivo .env en la raíz del proyecto y agrega las claves necesarias, como las de Firebase y los mapas. No olvides en este proyecto las siguientes:
   BASE_URL (se refiere a tu base de datos Realtime Database en Firebase. Se utiliza para realizar operaciones CRUD (crear, leer, actualizar, eliminar) en la base de datos.)
   BASE_AUTH_URL (vemos esta URL en acción cuando realizamos acciones como registro, inicio de sesión, y manejo de sesiones de usuarios y corresponde al endpoint de autenticación de Firebase.)
   API_KEY (búscala en tu documentación de Firebase. Es la clave API proporcionada por Firebase para autenticar solicitudes hacia sus servicios. Se utiliza en conjunto con las URLs anteriores para garantizar que las operaciones sean válidas y seguras.)
4. **Iniciar la Aplicación:**
  Ngrok proporciona un túnel más estable para apps que se muestran en dispositivos físicos. Me refiero a él, ya que lo utilicé durante todo el proyecto para ver mi app directamente en mi dispositivo físico mediante el uso del QR administrado para inicializarlo en Expo Go con la cámara del mismo. El comando que usé fue:
   ```powershell
   npx expo start --tunnel

## Reconocimientos  
- Gracias a [Expo](https://expo.dev/) por facilitar el desarrollo en React Native.  
- Documentación de [Firebase](https://firebase.google.com/) y su comunidad de soporte.  
- Iconos de [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons).

## Contacto  
Si tienes preguntas o sugerencias, no dudes en contactarme:  
📧 Email: agalvaliz318@gmail.com  
🐙 GitHub: [MiGitHub](https://github.com/aranza318)  
