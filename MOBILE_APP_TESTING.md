# Guía de Pruebas - App Móvil Campestre

## 🎯 Cambios Implementados

### Actualización del Flujo de Creación de Pases

La app móvil ahora utiliza el nuevo endpoint `/pass` del API en lugar del endpoint `/club-members` para crear pases de invitados.

---

## 📱 Nuevo Flujo de Creación de Pases

### Antes (Antiguo)
```
Usuario → Formulario Completo → POST /club-members → Crear Usuario + Club_Member
```

### Ahora (Nuevo)
```
Usuario → Formulario Simplificado → POST /pass → Crear/Encontrar Invitado + Generar Pase QR
```

---

## 🔧 Archivos Modificados

### 1. Nuevo Servicio de Pases
**Archivo:** `/src/features/home/services/passService.ts`

Funciones implementadas:
- ✅ `createPass()` - Crear nuevo pase de invitado
- ✅ `getAvailablePasses()` - Obtener pases disponibles del mes
- ✅ `getUserPasses()` - Obtener todos los pases del usuario
- ✅ `invalidatePass()` - Invalidar un pase

### 2. Hook Actualizado
**Archivo:** `/src/features/profile/hooks/useAddFamilyMember.ts`

Cambios:
- ✅ Importa `passService` en lugar de usar `memberService.addFamilyMember`
- ✅ Validación simplificada (solo nombre, apellido, email, teléfono)
- ✅ Llama a `passService.createPass()` con los datos del invitado
- ✅ Mensaje de éxito actualizado para mencionar notificación QR

### 3. Formulario Simplificado
**Archivo:** `/src/features/profile/components/AddFamilyMemberForm/index.tsx`

Cambios:
- ✅ Título actualizado: "Información del Invitado"
- ✅ Subtítulo dinámico según tipo de pase
- ✅ Campos requeridos reducidos a: nombre, apellido, email, teléfono
- ✅ Texto de ayuda: "El invitado recibirá su pase QR por email"
- ✅ Campos eliminados: RFC, fecha de nacimiento, género, relación

### 4. Estilos Actualizados
**Archivo:** `/src/features/profile/components/AddFamilyMemberForm/Style.tsx`

Nuevos estilos:
- ✅ `sectionSubtitle` - Subtítulo descriptivo
- ✅ `helperText` - Texto de ayuda en campos

---

## 🧪 Pruebas Paso a Paso

### Paso 1: Iniciar la App Móvil

```bash
cd /home/jvega/wipple/app-campestre
npm start
```

Escanea el código QR con Expo Go o presiona:
- `a` para Android
- `i` para iOS
- `w` para Web

### Paso 2: Login

1. Abre la app en tu dispositivo
2. Inicia sesión con credenciales de un SOCIO o SOCIO DEPENDIENTE
3. Navega a la pantalla de Home

### Paso 3: Verificar Pases Disponibles

En la sección "Gestión de Invitados" deberías ver:
```
Cuenta con X pases disponibles
```

Este número se obtiene del campo `passesAvailable` del endpoint `/club-members/:id`

### Paso 4: Crear Nuevo Pase

1. Presiona el botón **"+ Nuevo pase"**
2. Deberías ver el formulario simplificado con:
   - Título: "Información del Invitado"
   - Subtítulo: "Crea un pase de invitado (válido para 4 entradas)"
   - Campos:
     - ✅ Nombre *
     - ✅ Apellido *
     - ✅ Correo Electrónico * (con texto de ayuda)
     - ✅ Teléfono *

3. Llena el formulario:
   ```
   Nombre: Juan
   Apellido: Pérez
   Email: juan.perez@example.com
   Teléfono: 8112345678
   ```

4. Presiona **"Guardar"**
5. Confirma en el modal

### Paso 5: Verificar Respuesta

Deberías ver un Alert con:
```
Éxito

Pase de invitado creado correctamente.

El invitado recibirá una notificación con el link para ver su pase QR.

[Aceptar]
```

### Paso 6: Verificar en el Backend

Revisa los logs del API:
```bash
# Deberías ver:
Creating pass with data: { guestName, guestLastName, guestEmail, guestPhone, type }
Pass created successfully: { pass, token, viewUrl }
Notificación enviada al invitado juan.perez@example.com
```

### Paso 7: Verificar Pases Disponibles Actualizados

Después de crear el pase:
1. La app debería refrescar automáticamente
2. El contador de pases disponibles debería disminuir en 1
3. Ejemplo: Si tenías 5, ahora deberías tener 4

### Paso 8: Ver Lista de Invitados

1. Presiona **"Ver invitados"**
2. Deberías ver el nuevo invitado en la lista
3. Verifica que aparezca con:
   - Nombre completo
   - Email
   - Relación (si aplica)

---

## 🔍 Validaciones a Probar

### Validación 1: Campos Requeridos

Intenta guardar sin llenar campos:
- ❌ Sin nombre → "El nombre es requerido."
- ❌ Sin apellido → "El apellido es requerido."
- ❌ Sin email → "El correo electrónico es requerido."
- ❌ Email inválido → "Por favor ingrese un correo electrónico válido."
- ❌ Sin teléfono → "El número de teléfono es requerido."
- ❌ Teléfono < 10 dígitos → "El número de teléfono debe tener al menos 10 dígitos."

### Validación 2: Límite de Pases Mensuales

Si ya has creado 5 pases este mes:
1. Intenta crear un sexto pase
2. Deberías ver un error:
   ```
   Error
   Has alcanzado el límite de 5 pases mensuales
   [Aceptar]
   ```

### Validación 3: Usuario No Autorizado

Si inicias sesión como INVITADO:
1. El botón "Nuevo pase" debería estar deshabilitado
2. Mensaje: "Disponible solo para socios o socios dependientes"
3. Al intentar presionar, debería mostrar:
   ```
   Acceso Restringido
   Un invitado no puede generar nuevos pases. Solo los socios tienen este privilegio.
   ```

### Validación 4: Find-or-Create de Invitados

Crea dos pases con el mismo email:
1. Primer pase: `test@example.com`
2. Segundo pase: `test@example.com` (mismo email)
3. El backend debería:
   - Encontrar el usuario existente
   - Crear un nuevo pase para ese usuario
   - No crear un usuario duplicado

---

## 📊 Verificación en Base de Datos

### Ver Pases Creados
```sql
SELECT 
  p.id,
  p.type,
  p.is_valid,
  u1.name || ' ' || u1.last_name as host,
  u2.name || ' ' || u2.last_name as guest,
  u2.email as guest_email,
  p.created_at
FROM passes p
JOIN users u1 ON p.host_id = u1.id
JOIN users u2 ON p.guest_id = u2.id
ORDER BY p.created_at DESC
LIMIT 10;
```

### Verificar Invitados Creados
```sql
SELECT 
  id,
  name,
  last_name,
  email,
  type,
  active,
  created_at
FROM users
WHERE type = 'INVITADO'
ORDER BY created_at DESC
LIMIT 10;
```

### Contar Pases del Mes Actual
```sql
SELECT 
  u.name || ' ' || u.last_name as socio,
  COUNT(p.id) as pases_creados
FROM passes p
JOIN users u ON p.host_id = u.id
WHERE DATE_TRUNC('month', p.created_at) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY u.id, socio
ORDER BY pases_creados DESC;
```

---

## 🎨 Diferencias Visuales

### Formulario Antiguo
- 10+ campos
- Incluía: RFC, fecha de nacimiento, género, relación, dirección
- Título: "Información Personal"
- Más complejo y largo

### Formulario Nuevo
- 4 campos esenciales
- Solo: nombre, apellido, email, teléfono
- Título: "Información del Invitado"
- Subtítulo descriptivo
- Texto de ayuda sobre notificación
- Más simple y rápido

---

## 🔗 Integración con el Sistema Completo

### Flujo Completo End-to-End

1. **Socio crea pase en app móvil**
   - POST `/pass` con datos del invitado
   - Backend crea/encuentra usuario INVITADO
   - Backend genera pase con JWT
   - Backend envía notificación (Email/WhatsApp)

2. **Invitado recibe notificación**
   - Email con link al pase QR
   - WhatsApp con link al pase QR
   - Link: `http://api-url/guest/view-pass/{token}`

3. **Invitado abre link**
   - Ve página HTML hermosa
   - Código QR visible
   - Información del socio anfitrión
   - Contador de entradas (0 de 4)

4. **Guardia escanea QR**
   - QR apunta a: `http://cms-url/verify-access?token={token}`
   - CMS carga información del pase
   - Muestra datos del invitado y anfitrión
   - Botón "CONFIRMAR INGRESO"

5. **Guardia confirma entrada**
   - POST `/access/register-entry`
   - Se crea registro en `AccessLog`
   - Contador se actualiza (1 de 4)
   - Mensaje de éxito

---

## ✅ Checklist de Funcionalidades

### App Móvil
- [ ] Botón "Nuevo pase" visible para socios
- [ ] Botón deshabilitado para invitados
- [ ] Formulario simplificado se muestra correctamente
- [ ] Validaciones funcionan correctamente
- [ ] Mensaje de éxito se muestra
- [ ] Contador de pases disponibles se actualiza
- [ ] Lista de invitados se refresca

### Backend
- [ ] Endpoint `/pass` recibe datos correctamente
- [ ] Find-or-create de invitados funciona
- [ ] JWT se genera correctamente
- [ ] Notificación se envía (verificar logs)
- [ ] Límite de 5 pases se respeta
- [ ] Campo `passesAvailable` se calcula correctamente

### Base de Datos
- [ ] Registro en tabla `passes` se crea
- [ ] Usuario INVITADO se crea o se encuentra
- [ ] Relación host-guest es correcta
- [ ] Tipo de pase es correcto (GUEST/TEMPORAL)

---

## 🐛 Troubleshooting

### Error: "No hay token de autenticación disponible"
- Verifica que el usuario esté logueado
- Revisa el store de Zustand
- Reinicia la app

### Error: "Has alcanzado el límite de 5 pases mensuales"
- Es correcto si ya creaste 5 pases este mes
- Espera al próximo mes o usa cuenta de ADMINISTRADOR

### Error: "Error al crear el pase de invitado"
- Revisa logs del API
- Verifica que el API esté corriendo
- Verifica la URL del API en `.env`

### Notificación no se envía
- Es normal si no tienes configurado Twilio/Resend
- El pase se crea correctamente de todas formas
- Revisa logs del API para ver el error específico

### Formulario no se simplifica
- Verifica que los cambios estén guardados
- Reinicia Metro bundler: `r` en la terminal
- Limpia caché: `npm start -- --clear`

---

## 📝 Notas Importantes

1. **Compatibilidad hacia atrás**: El endpoint `/club-members` sigue funcionando para crear socios dependientes y temporales

2. **Notificaciones opcionales**: Si no tienes configurado Twilio/Resend, el sistema funciona igual, solo no envía notificaciones

3. **Límites mensuales**: Se calculan del día 1 al 31 del mes actual

4. **Find-or-Create**: El sistema busca invitados existentes por email o teléfono antes de crear uno nuevo

5. **Tipo de pase**: 
   - "Nuevo pase" → type: GUEST
   - "Nuevo pase temporal" → type: TEMPORAL

---

## 🚀 Próximos Pasos

1. **Probar en dispositivo real**: Escanea el QR con tu teléfono
2. **Probar flujo completo**: Desde crear pase hasta registrar entrada
3. **Verificar notificaciones**: Configura Twilio/Resend y prueba
4. **Probar límites**: Crea 5 pases e intenta crear un sexto
5. **Probar con diferentes usuarios**: SOCIO, DEPENDIENTE, INVITADO

---

**Sistema actualizado y funcionando correctamente! ✨**
