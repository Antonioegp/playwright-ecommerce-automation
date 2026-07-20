TestCases.md

1. Register
2. Login
3. Dashboard
4. Cart
5. Checkout
6. Orders
7. API

## 1. Register

| ID              | Caso de prueba                                      | Prioridad | 
| --------------- | --------------------------------------------------- | --------- |
| TC-REGISTER-001 | Registrar un usuario con datos válidos              | Alta      | 
| TC-REGISTER-002 | Registrar un usuario ya existente                   | Alta      | 
| TC-REGISTER-003 | Registrar un usuario con email inválido             | Media     |
| TC-REGISTER-004 | Registrar un usuario con contraseña inválida        | Media     | 
| TC-REGISTER-005 | Registrar un usuario con campos obligatorios vacíos | Alta      |

---

## 2. Login

| ID           | Caso de prueba                                         | Prioridad |
| ------------ | ------------------------------------------------------ | --------- |
| TC-LOGIN-001 | Iniciar sesión con credenciales válidas                | Alta      |
| TC-LOGIN-002 | Iniciar sesión con contraseña incorrecta               | Alta      |
| TC-LOGIN-003 | Iniciar sesión con usuario inexistente                 | Alta      |
| TC-LOGIN-004 | Iniciar sesión con campos vacíos                       | Media     |
| TC-LOGIN-005 | Verificar mensaje de error para credenciales inválidas | Alta      |

## 3. Dashboard

| ID                | Caso de prueba                                                               | Prioridad |
| ----------------- | ---------------------------------------------------------------------------  | --------- |
| TC-DASHBOARD-001  | Verificar la carga correcta del Dashboard tras iniciar sesión                | Alta      |
| TC-DASHBOARD-002  | Visualizar correctamente el catálogo de productos                            | Alta      |
| TC-DASHBOARD-003  | Añadir un producto al carrito desde el Dashboard                             | Alta      |
| TC-DASHBOARD-004  | Añadir todos los productos al carrito                                        | Alta      |
| TC-DASHBOARD-005  | Verificar que se muestra el mensaje de producto añadido correctamente        | Media     |
| TC-DASHBOARD-006  | Acceder a la página del carrito desde el Dashboard                           | Alta      |
| TC-DASHBOARD-007  | Acceder a la página My Orders desde el Dashboard                             | Alta      |
| TC-DASHBOARD-008  | Cerrar sesión desde el Dashboard                                             | Alta      |
| TC-DASHBOARD-009  | Verificar que cada producto muestra nombre e imagen                          | Baja      |
| TC-DASHBOARD-010  | Verificar que cada producto muestra su precio                                | Baja      |
| TC-DASHBOARD-011  | Verificar que el filtrado de un producto por su titulo es correcto           | Baja      |
| TC-DASHBOARD-012  | Verificar que el filtrado de un producto por su rango de precios es correcto | Baja      |

## 4. Cart

| ID            | Caso de prueba                                                              | Prioridad |
| ------------- | --------------------------------------------------------------------------- | --------- |
| TC-CART-001   | Visualizar correctamente la página del carrito                              | Alta      |
| TC-CART-002   | Verificar que un producto añadido desde el Dashboard aparece en el carrito  | Alta      |
| TC-CART-003   | Verificar que varios productos añadidos aparecen en el carrito              | Alta      |
| TC-CART-004   | Verificar que se muestra el precio de un producto correctamente             | Alta      |
| TC-CART-005   | Eliminar un producto del carrito                                            | Alta      |
| TC-CART-006   | Verificar que el carrito queda vacío tras eliminar todos los productos      | Media     |
| TC-CART-007   | Continuar al proceso de Checkout desde el carrito                           | Alta      |

## 5. Checkout

| ID               | Caso de prueba                                                                  | Prioridad |
| ---------------- | ------------------------------------------------------------------------------- | --------- |
| TC-CHECKOUT-001  | Acceder correctamente a la página de Checkout desde el carrito                  | Alta      |
| TC-CHECKOUT-002  | Verificar que se muestran correctamente los productos seleccionados             | Alta      |
| TC-CHECKOUT-003  | Completar una compra con datos válidos                                          | Alta      |
| TC-CHECKOUT-004  | Buscar y seleccionar un país válido durante el proceso de compra                | Alta      |
| TC-CHECKOUT-005  | Verificar que se genera un identificador (Order ID) tras completar la compra    | Alta      |
| TC-CHECKOUT-006  | Intentar completar la compra sin seleccionar un país                            | Media     |
| TC-CHECKOUT-007  | Intentar aplicar un codigo de cupon invalido                                    | Media     |
| TC-CHECKOUT-008  | Verificar que el correo del usuario autenticado se muestra correctamente        | Baja      |

## 6. Orders

| ID             | Caso de prueba                                                                  | Prioridad |
| -------------- | ------------------------------------------------------------------------------- | --------- |
| TC-ORDERS-001  | Acceder correctamente a la página **My Orders**                                 | Alta      |
| TC-ORDERS-002  | Verificar que el identificador (Order ID) del pedido es correcto                | Alta      |
| TC-ORDERS-003  | Verificar que el detalle del pedido muestra el Order Id correcto                | Alta      |
| TC-ORDERS-004  | Volver al Dashboard desde la página **My Orders**                               | Media     |
| TC-ORDERS-005  | Verificar que un usuario sin pedidos no visualiza órdenes registradas           | Baja      |

## 7. API

| ID         | Caso de prueba                                                                  | Prioridad |
| ---------- | ------------------------------------------------------------------------------- | --------- |
| TC-API-001 | Iniciar sesión mediante la API con credenciales válidas                         | Alta      |
| TC-API-002 | Obtener correctamente el listado de productos (POST Products)                   | Alta      |
| TC-API-003 | Verificar error al iniciar sesión con credenciales inválidas                    | Alta      |
| TC-API-004 | Crear un nuevo pedido mediante la API y validar la respuesta                    | Alta      |
| TC-API-005 | Crear un nuevo pedido mediante la API y validar el Order ID generado en el front| Alta      |
| TC-API-006 | Simular mediante Mock una respuesta sin pedidos y verificar el mensaje mostrado | Alta      |
