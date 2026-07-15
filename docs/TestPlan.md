# Plan de Pruebas

## 1. Objetivo

El objetivo de este proyecto es desarrollar un framework de automatización de pruebas End-to-End (E2E) utilizando Playwright y JavaScript sobre una aplicación web de comercio electrónico.

El framework está diseñado siguiendo buenas prácticas de automatización, priorizando la reutilización del código, la mantenibilidad y la escalabilidad para facilitar la incorporación de nuevos casos de prueba.

---

## 2. Alcance

La automatización cubrirá las funcionalidades más importantes de la aplicación, entre ellas:

- Inicio de sesión.
- Cierre de sesión.
- Visualización del catálogo de productos.
- Búsqueda de productos.
- Añadir productos al carrito.
- Eliminar productos del carrito.
- Proceso de compra (Checkout).
- Historial de pedidos.

### Fuera del alcance

Este proyecto no contempla:

- Pruebas de rendimiento.
- Pruebas de seguridad.
- Pruebas de accesibilidad.
- Pruebas en dispositivos móviles.

---

## 3. Objetivos de las pruebas

Las pruebas automatizadas tienen como finalidad:

- Verificar el correcto funcionamiento de los flujos críticos de la aplicación.
- Detectar regresiones de forma temprana.
- Reducir el esfuerzo dedicado a pruebas manuales repetitivas.
- Aumentar la confianza en cada ejecución del proyecto.
- Facilitar futuras ampliaciones del framework.

---

## 4. Entorno de pruebas

| Elemento | Valor |
|----------|-------|
| Framework | Playwright |
| Lenguaje | JavaScript |
| Runner | Playwright Test |
| IDE | Visual Studio Code |
| Navegador principal | Chromium |
| Sistema Operativo | Windows 11 |

---

## 5. Tipos de pruebas

El proyecto automatizará principalmente:

- Pruebas funcionales.
- Pruebas End-to-End (E2E).
- Pruebas de regresión.
- Smoke Tests.

---

## 6. Módulos cubiertos

Los módulos que serán automatizados son:

- Login
- Home
- Catálogo de productos
- Carrito
- Checkout
- Historial de pedidos

---

## 7. Datos de prueba

Los datos utilizados durante las pruebas estarán organizados en archivos JavaScript independientes, permitiendo centralizar la información necesaria para la ejecución de los casos de prueba.

Esta estructura facilita el mantenimiento del proyecto, evita la duplicación de datos y simplifica la incorporación de nuevos escenarios de prueba.

Entre los datos utilizados se incluyen:

- Usuarios válidos.
- Usuarios inválidos.
- Productos.
- Mensajes esperados.
- Datos necesarios para el proceso de compra.

La separación de los datos respecto a la lógica de los tests permite mejorar la legibilidad del código y favorecer su reutilización.

## 8. Ejecución de las pruebas

El framework permitirá ejecutar las pruebas en:

- Modo Headless.
- Modo Headed.
- Ejecución individual.
- Ejecución completa del proyecto.
- Ejecución en paralelo cuando sea necesario.

---

## 9. Evidencias y reportes

El framework está configurado para generar automáticamente evidencias durante la ejecución de las pruebas.

Actualmente se generan:

- Reporte HTML de Playwright.
- Capturas de pantalla cuando una prueba falla.
- Archivos Trace para facilitar el análisis de errores.
- Vídeos de ejecución cuando una prueba falla (configurable).

Estas evidencias facilitan la investigación y resolución de incidencias detectadas durante la ejecución de los tests.

## 10. Arquitectura del proyecto

El proyecto seguirá el patrón de diseño **Page Object Model (POM)** para mejorar la organización del código y facilitar el mantenimiento.

La estructura principal será:

- pages/
- tests/
- test-data/
- docs/

---

## 11. Riesgos

Algunos riesgos que pueden afectar a la automatización son:

- Cambios en la interfaz de usuario.
- Modificaciones en los identificadores de los elementos.
- Datos de prueba desactualizados.
- Cambios en el entorno de pruebas.

Para minimizar estos riesgos se utilizarán localizadores robustos y una estructura desacoplada mediante Page Objects.

---

## 12. Criterios de éxito

El framework se considerará satisfactorio cuando:

- Todos los flujos críticos puedan ejecutarse correctamente.
- Los errores generen información suficiente para su análisis.
- El código sea reutilizable y fácil de mantener.
- Sea sencillo añadir nuevos casos de prueba sin modificar la arquitectura existente.