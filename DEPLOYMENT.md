# Guía de Deployment para Elastic Beanstalk

## Prerequisitos

1. AWS CLI instalado y configurado
2. EB CLI instalado: `pip install awsebcli`
3. Node.js 18+ instalado

## Configuración Inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:
```bash
EXPO_PUBLIC_API_URL=https://campestre-api-1024201248834.us-central1.run.app
NODE_ENV=production
PORT=8080
```

### 3. Build local (opcional para pruebas)
```bash
npm run build
```

Esto generará la carpeta `dist/` con los archivos estáticos.

### 4. Probar localmente
```bash
npm start
```

La aplicación estará disponible en `http://localhost:8080`

## Deployment a Elastic Beanstalk

### Primera vez (Inicialización)

1. Inicializar EB en el proyecto:
```bash
eb init
```
   - Selecciona la región (ej: us-east-1)
   - Nombre de la aplicación: `club-campestre-app`
   - Plataforma: Node.js 18
   - No configurar CodeCommit
   - SSH: según prefieras

2. Crear ambiente:
```bash
eb create production --platform "Node.js 18 running on 64bit Amazon Linux 2" --instance-type t3.small
```

3. Configurar variables de entorno en EB:
```bash
eb setenv EXPO_PUBLIC_API_URL=https://campestre-api-1024201248834.us-central1.run.app NODE_ENV=production
```

### Deployments Subsecuentes

1. Hacer commit de tus cambios:
```bash
git add .
git commit -m "Descripción de cambios"
```

2. Deploy a EB:
```bash
eb deploy
```

3. Abrir la aplicación:
```bash
eb open
```

## Comandos Útiles

### Ver logs
```bash
eb logs
```

### Ver estado del ambiente
```bash
eb status
```

### SSH al servidor
```bash
eb ssh
```

### Eliminar ambiente
```bash
eb terminate production
```

## Estructura de Archivos Importantes

- **server.js**: Servidor Express que sirve los archivos estáticos
- **.ebextensions/**: Configuración de Elastic Beanstalk
- **.platform/hooks/prebuild/**: Scripts que se ejecutan antes del deployment
- **dist/**: Archivos estáticos generados (no incluir en git)
- **.env.production**: Variables de entorno de producción (no incluir en git)

## Proceso de Build en EB

1. EB clona tu código
2. Ejecuta `01_install_dependencies.sh` - Instala dependencias npm
3. Ejecuta `02_build_app.sh` - Hace el build de Expo (genera dist/)
4. Ejecuta `npm start` - Inicia el servidor Express
5. Express sirve los archivos desde `dist/`

## Notas Importantes

- El build se hace **automáticamente** en el servidor de EB
- No necesitas hacer commit de la carpeta `dist/`
- Asegúrate de que `.env.production` tenga las variables correctas
- El puerto 8080 es el puerto por defecto de EB para Node.js

## Troubleshooting

### Error: "Cannot find module 'express'"
Verifica que express esté en dependencies, no en devDependencies.

### Error: "dist folder not found"
El build falló. Revisa los logs con `eb logs` para ver errores de build.

### La app no carga
- Verifica que el servidor esté escuchando en `0.0.0.0` y no en `localhost`
- Revisa los logs: `eb logs`
- Verifica las variables de entorno: `eb printenv`

## Configuración de Dominio Personalizado

1. Ve a AWS Console > Elastic Beanstalk > Tu ambiente
2. Configuration > Load Balancer
3. Agrega un certificado SSL de ACM
4. Configura tu dominio en Route 53 apuntando al Load Balancer
