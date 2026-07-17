TestCases.md

1. Register
2. Login
3. Dashboard
4. Cart
5. Checkout
6. Orders

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
| TC-DASHBOARD-004  | Añadir todos los productos al carrito                                           | Alta      |
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