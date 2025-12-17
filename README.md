# Club Campestre de Tampico Mobile App

Aplicación móvil para socios del Club Campestre de Tampico. Esta aplicación forma parte de una propuesta integral de transformación digital que busca digitalizar la experiencia de los más de 1,500 socios del club.

## Características

- **Inicio de sesión de socios**: Autenticación segura para socios del club
- **Perfil de socio**: Visualización y edición de información personal
- **Menús**: Consulta de menús disponibles (diarios, semanales y especiales)
- **Eventos y reservas**: Listado de eventos y opción de hacer reservas
- **Encuestas ("Voz del Socio")**: Formulario para recibir retroalimentación de los socios
- **Internacionalización**: Soporte para español e inglés
- **Almacenamiento local**: Persistencia de datos del usuario

## Tecnologías utilizadas

- **React Native**: Framework para aplicaciones móviles multiplataforma
- **Expo**: Herramienta para desarrollo y empaquetado de aplicaciones
- **TypeScript**: Tipado estático para JavaScript
- **Zustand**: Manejo de estado global ligero
- **React Navigation**: Sistema de navegación para aplicaciones React Native
- **React I18Next**: Internacionalización y localización
- **Expo Localization**: Detección de configuración regional del dispositivo
- **React Native Screens**: Optimización de navegación
- **React Native Safe Area Context**: Manejo de áreas seguras en dispositivos móviles

## Arquitectura

La aplicación sigue una arquitectura orientada a características (feature-based architecture):

```
/src
  /features              # Características principales
    /auth                # Autenticación de usuarios
      /containers        # Componentes que gestionan la lógica de la pantalla
      /components        # Componentes de UI específicos del módulo
      /hooks             # Lógica de negocio reutilizable
      /services          # Llamadas a API (en esta fase solo mocks)
    /profile             # Perfil de socio
    /menus               # Menús del club
    /events              # Eventos y reservas
    /surveys             # Encuestas
  /shared               # Componentes y utilidades comunes
    /components         # Componentes reutilizables
    /hooks              # Hooks globales
    /utils              # Funciones de utilidad
  /store                # Zustand store
  /i18n                 # Configuración de internacionalización
  /navigation           # Configuración de navegación
```

## Configuración del proyecto

### Requisitos previos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI (opcional)
- Android Studio (para Android) o Xcode (para iOS) - para builds nativas

### Instalación

1. Clona el repositorio:

```bash
git clone <repositorio-del-proyecto>
cd club-campestre-app
```

2. Instala las dependencias:

```bash
npm install
# o
yarn install
```

3. (Opcional) Instala Expo CLI globalmente:

```bash
npm install -g @expo/cli
```

## Cómo ejecutar la aplicación

### Con Expo (desarrollo)

#### Android

1. Asegúrate de tener el dispositivo Android conectado con USB debugging habilitado o un emulador Android en ejecución.

2. Ejecuta el siguiente comando:

```bash
npx expo start --android
```

O también puedes usar:

```bash
npx expo start
```

Y luego escanea el código QR con la aplicación Expo Go en tu dispositivo Android.

#### iOS

1. Asegúrate de estar en un entorno macOS con Xcode instalado.

2. Ejecuta el siguiente comando:

```bash
npx expo start --ios
```

O también puedes usar:

```bash
npx expo start
```

Y luego escanea el código QR con la aplicación Expo Go en tu dispositivo iOS.

### Emulador/simulador

#### Android Studio

1. Abre Android Studio y lanza un emulador Android.

2. Ejecuta el proyecto con:

```bash
npx expo start --android
```

#### Xcode (iOS)

1. Abre Xcode y lanza el simulador iOS.

2. Ejecuta el proyecto con:

```bash
npx expo start --ios
```

## Compilación para producción

### Android

Para generar un APK o AAB para Android:

```bash
npx expo run:android
```

O para un build standalone:

```bash
npx expo export --platform android
```

### iOS

Para generar un build para iOS:

```bash
npx expo run:ios
```

O para un build standalone:

```bash
npx expo export --platform ios
```

## Estructura de carpetas detallada

- **`/app`**: Archivos de rutas para Expo Router
- **`/assets`**: Recursos como imágenes, iconos y fuentes
- **`/components`**: Componentes genéricos de UI
- **`/src/features/auth`**: Funcionalidades de autenticación
  - `/containers`: Componentes principales que manejan la lógica
  - `/components`: Componentes de UI específicos del módulo
  - `/hooks`: Lógica de negocio reutilizable
  - `/services`: Llamadas a API (actualmente usando mocks)
- **`/src/features/profile`**: Funcionalidades del perfil de socio
- **`/src/features/menus`**: Funcionalidades de menús
- **`/src/features/events`**: Funcionalidades de eventos y reservas
- **`/src/features/surveys`**: Funcionalidades de encuestas
- **`/src/shared`**: Recursos compartidos
- **`/src/store`**: Configuración del store de Zustand
- **`/src/i18n`**: Configuración de internacionalización
- **`/src/navigation`**: Configuración de navegación

## Internacionalización

La aplicación soporta español e inglés. La detección automática del idioma se basa en la configuración regional del dispositivo. Para añadir nuevos idiomas:

1. Añade un nuevo archivo JSON en `/src/i18n/locales/` (por ejemplo, `fr.json` para francés)
2. Copia la estructura del archivo `en.json` o `es.json`
3. Traduce todos los textos

## Estado global (Zustand)

El estado global se maneja con Zustand y persiste los datos en el almacenamiento local del dispositivo. Incluye:

- Estado de autenticación
- Información del usuario actual
- Preferencias de idioma
- Eventos y reservas
- Menús
- Respuestas de encuestas

## Mock Data

Todos los datos en esta versión son mocks para fines de desarrollo. En futuras versiones, se integrará con SAP y otros servicios backend.

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/NombreDeLaCaracteristica`)
3. Asegúrate de seguir la arquitectura de carpetas
4. Haz commit de tus cambios (`git commit -m 'Agrega característica: NombreDeLaCaracteristica'`)
5. Haz push a la rama (`git push origin feature/NombreDeLaCaracteristica`)
6. Abre un Pull Request

## Futuras integraciones

- Conexión con SAP para datos reales
- Notificaciones push
- Sistema de mensajes entre socios y administración
- Pago de cuotas y servicios
- Integración con sistemas de acceso y control

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## Soporte

Para soporte, contacta al equipo de desarrollo del Club Campestre de Tampico.

---

Proyecto desarrollado como parte de la transformación digital del Club Campestre de Tampico.