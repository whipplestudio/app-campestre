# Guía de Deployment para Vercel

## Prerequisitos

1. Cuenta de Vercel (https://vercel.com)
2. Vercel CLI instalado (opcional): `npm i -g vercel`
3. Git instalado
4. Repositorio Git (GitHub, GitLab, o Bitbucket)

## Método 1: Deploy desde la Interfaz Web (Recomendado)

### Pasos:

1. **Subir tu código a GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Preparar para deployment en Vercel"
   git push origin main
   ```

2. **Ir a Vercel Dashboard**
   - Visita https://vercel.com/dashboard
   - Click en "Add New Project"

3. **Importar tu repositorio**
   - Selecciona tu repositorio Git
   - Click en "Import"

4. **Configurar el proyecto**
   - **Framework Preset**: Selecciona "Other"
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (o `yarn install`)

5. **Variables de Entorno**
   - Click en "Environment Variables"
   - Agrega:
     - `EXPO_PUBLIC_API_URL`: `https://campestre-api-1024201248834.us-central1.run.app`
     - `NODE_ENV`: `production`

6. **Deploy**
   - Click en "Deploy"
   - Espera 2-3 minutos mientras Vercel hace el build

7. **¡Listo!**
   - Tu app estará disponible en `https://tu-proyecto.vercel.app`

## Método 2: Deploy desde CLI

### Primera vez:

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login a Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Sigue las instrucciones interactivas
   - Selecciona configuración:
     - Output directory: `dist`
     - Build command: `npm run build`

### Deployments posteriores:

```bash
# Deploy a preview
vercel

# Deploy a producción
vercel --prod
```

## Configuración Adicional

### Dominio Personalizado

1. Ve a tu proyecto en Vercel Dashboard
2. Settings > Domains
3. Agrega tu dominio personalizado
4. Configura los DNS según las instrucciones

### Variables de Entorno

Puedes agregar/editar variables de entorno en:
- Dashboard > Tu Proyecto > Settings > Environment Variables

### Configuración de Build

El archivo `vercel.json` ya está configurado con:
- ✅ Rutas para Single Page Application (SPA)
- ✅ Cache headers optimizados para assets
- ✅ Redirección correcta para todas las rutas a index.html

## Comandos Útiles

```bash
# Ver logs en tiempo real
vercel logs

# Listar deployments
vercel ls

# Remover un deployment
vercel rm [deployment-url]

# Ver información del proyecto
vercel inspect
```

## Notas Importantes

- **Build automático**: Vercel hace el build cada vez que haces push al repositorio
- **Preview deployments**: Cada PR crea un deployment de preview automático
- **No necesitas server.js**: Vercel sirve archivos estáticos directamente desde `dist/`
- **Cache optimizado**: Los assets en `_expo/static/` tienen cache de 1 año
- **HTTPS gratis**: Todos los deployments tienen SSL automático

## Troubleshooting

### Build falla

**Error**: "Build failed"
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel Dashboard
- Asegúrate de que todas las dependencias estén en `dependencies`, no en `devDependencies`

### Rutas no funcionan

**Error**: 404 en rutas como `/explore`
- El archivo `vercel.json` debe estar en la raíz
- Verifica que todas las rutas redirijan a `/index.html`

### Variables de entorno no funcionan

**Error**: API URL incorrecta
- Verifica que las variables estén en Vercel Dashboard
- Deben empezar con `EXPO_PUBLIC_` para estar disponibles en el cliente
- Redeploy después de cambiar variables

### Build muy lento

- Vercel tiene un timeout de 15 minutos en el plan gratuito
- Si tu build toma más tiempo, considera optimizar dependencias

## Comparación con AWS Elastic Beanstalk

| Característica | Vercel | AWS EB |
|----------------|--------|---------|
| Setup inicial | ⚡ Muy rápido | 🐌 Más complejo |
| Deploy | Automático con Git | Manual con EB CLI |
| SSL | ✅ Gratis automático | ⚙️ Manual con ACM |
| Escalado | ✅ Automático | ⚙️ Manual |
| Precio (hobby) | 💰 Gratis | 💰 $5-30/mes |
| Server-side | ❌ No (solo static) | ✅ Sí (Node.js) |

## Recomendación

**Usa Vercel si**:
- Solo necesitas servir archivos estáticos (este proyecto ✅)
- Quieres deploys automáticos con Git
- Prefieres configuración simple

**Usa AWS EB si**:
- Necesitas lógica server-side
- Quieres control total del servidor
- Tienes requisitos específicos de infraestructura
