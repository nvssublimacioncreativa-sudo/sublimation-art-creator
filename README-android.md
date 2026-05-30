# Sublimarte — App Android con Capacitor (Opción A: shell)

Esta guía empaqueta la app publicada (`https://sublimation-art-creator.lovable.app`) como una app Android nativa usando Capacitor. La app abre la web publicada dentro de un WebView, así no hay que reescribir nada y `/api/generate-image` sigue funcionando en el servidor de Lovable.

## Requisitos en tu computadora

- Node.js 20+ y npm (o bun)
- **Android Studio** (incluye el SDK de Android)
- **JDK 17** (Android Studio lo trae)
- Git

> Capacitor NO compila dentro de Lovable. Tienes que clonar el repo y hacer el build de Android en tu máquina.

## 1. Clona el repo y entra a la carpeta

```bash
git clone <URL-de-tu-repo-de-Lovable>
cd <carpeta-del-repo>
npm install
```

## 2. Instala Capacitor

```bash
npm i @capacitor/core @capacitor/cli @capacitor/android
```

El archivo `capacitor.config.ts` ya está en el repo apuntando a la URL publicada.

## 3. Crea un `dist/` mínimo (requerido por Capacitor)

Capacitor exige una carpeta `webDir`, aunque no la usemos porque cargamos la URL remota. Crea un placeholder:

```bash
mkdir -p dist && echo "<!doctype html><meta http-equiv=refresh content=0;url=https://sublimation-art-creator.lovable.app>" > dist/index.html
```

## 4. Inicializa Android

```bash
npx cap add android
npx cap sync android
```

Se creará la carpeta `android/`.

## 5. Abre el proyecto en Android Studio

```bash
npx cap open android
```

- Espera a que Gradle termine de sincronizar.
- Conecta un teléfono (con depuración USB) o usa un emulador.
- Pulsa **Run ▶** para probarla.

## 6. Generar el APK / AAB firmado para Play Store

En Android Studio:

1. Menú **Build → Generate Signed Bundle / APK…**
2. Elige **Android App Bundle (AAB)** (lo que pide Google Play) o **APK** (para instalar a mano).
3. Crea un **keystore nuevo** (guárdalo bien: sin él no puedes publicar updates).
4. Selecciona variante **release** y genera.
5. El archivo queda en `android/app/release/`.

## Cambios de ícono y nombre

- Ícono: reemplaza los `mipmap-*` en `android/app/src/main/res/`.
- Nombre visible: `android/app/src/main/res/values/strings.xml` → `app_name`.
- `appId` / `appName`: edita `capacitor.config.ts` y vuelve a correr `npx cap sync android`.

## Notas

- Cada vez que cambies algo de Capacitor (config, plugins) corre `npx cap sync android`.
- Como la app carga la URL publicada, **cualquier cambio que publiques en Lovable aparece automáticamente** en la app sin tener que generar un APK nuevo.
- Si más adelante quieres modo offline o usar APIs nativas (cámara, push), tendrás que cambiar a Opción B (SPA empaquetada) o agregar plugins de Capacitor.
