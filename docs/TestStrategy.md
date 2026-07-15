# Estrategia de Pruebas

## 1. Objetivo

Este documento describe la estrategia seguida para el diseño y desarrollo del framework de automatización creado como proyecto personal utilizando Playwright y JavaScript.

El objetivo es aplicar buenas prácticas de automatización, diseño y organización similares a las utilizadas en proyectos reales.

---

## 2. Enfoque de automatización

El proyecto sigue un enfoque basado en la automatización de los flujos críticos de negocio de la aplicación.

Las pruebas están diseñadas para validar el comportamiento funcional desde la perspectiva del usuario final, simulando escenarios reales de uso.

Se priorizan aquellos casos de prueba con mayor impacto sobre el negocio, como:

- Inicio de sesión.
- Gestión del carrito.
- Proceso de compra.
- Historial de pedidos.

---

## 3. Patrón de diseño

El framework utiliza el patrón **Page Object Model (POM)**.

Este patrón permite:

- Separar la lógica de negocio de la lógica de automatización.
- Reducir la duplicación de código.
- Facilitar el mantenimiento.
- Mejorar la legibilidad de las pruebas.

---

## 4. Organización del proyecto

La estructura del proyecto se organiza en diferentes módulos con responsabilidades independientes.

- **pages/** → Contiene los Page Objects de la aplicación.
- **tests/** → Casos de prueba automatizados.
- **test-data/** → Datos utilizados por los tests.
- **docs/** → Documentación del proyecto.

---

## 5. Gestión de datos de prueba

Los datos utilizados durante la ejecución se almacenan de forma independiente de los tests.

Esta separación permite:

- Reutilizar información.
- Facilitar el mantenimiento.
- Crear nuevos escenarios sin modificar la lógica de automatización.

---

## 6. Localizadores

Siempre que sea posible, se utilizarán localizadores robustos y estables.

Se priorizarán:

- getByRole()
- getByLabel()
- getByPlaceholder()

Solo cuando no exista una alternativa mejor se utilizarán selectores CSS.

---

## 7. Evidencias

El framework está configurado para generar evidencias cuando una prueba falla.

Estas evidencias incluyen:

- Capturas de pantalla.
- Trace de Playwright.
- Reportes HTML.

El objetivo es facilitar el análisis de errores y acelerar la resolución de incidencias.

---

## 8. Criterios de calidad

Antes de incorporar nuevos casos de prueba se procurará que:

- El código sea legible.
- No exista duplicidad.
- Se reutilicen los Page Objects.
- Los nombres de métodos y variables sean descriptivos.
- Los tests sean independientes entre sí.

---

## 9. Escalabilidad

El framework está diseñado para facilitar la incorporación de nuevas funcionalidades sin afectar a la estructura existente.

La arquitectura permite añadir nuevos Page Objects y casos de prueba de forma organizada.

---

## 10. Mantenimiento

El mantenimiento del framework consistirá principalmente en:

- Actualizar localizadores cuando cambie la interfaz.
- Incorporar nuevos casos de prueba.
- Eliminar código duplicado.
- Revisar periódicamente la estructura del proyecto para mantener una arquitectura limpia y sencilla.

---

## 11. Buenas prácticas

Durante el desarrollo del framework se seguirán las siguientes prácticas:

- Evitar el uso de esperas fijas (`waitForTimeout()`), salvo en casos excepcionales.
- Utilizar esperas automáticas proporcionadas por Playwright siempre que sea posible.
- Mantener cada test independiente del resto.
- Reutilizar métodos mediante Page Objects.
- Utilizar nombres descriptivos para métodos, variables y casos de prueba.
- Mantener el código limpio y fácil de mantener.