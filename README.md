# One Pace Fácil EN

Web estática para seguir One Pace con subtítulos en inglés desde el móvil o la tele. El catálogo conserva el orden y los enlaces de Pixeldrain de la versión anterior.

## Ver en la tele

1. Abre la web en el navegador de Google TV y activa **Modo TV**.
2. Usa las flechas y OK para abrir el capítulo actual o elegir otro en el catálogo.
3. Después de verlo, pulsa Atrás en el mando hasta volver a One Pace Fácil. Elige **Marcar visto y abrir siguiente** para seguir, o **Marcar como visto** para dejar preparado el siguiente capítulo.

El progreso se guarda por capítulo en este navegador. Al pasar de la versión anterior, la aplicación recupera el arco guardado y te pide que elijas el capítulo. Pixeldrain reproduce el vídeo en su propia página y gestiona el inicio y el final de la reproducción.

## Probar y mantener

Sirve esta carpeta con un servidor HTTP estático. Desde la raíz del repositorio, por ejemplo, puedes ejecutar `python -m http.server 8000` y abrir `http://localhost:8000`. La instalación y la caché requieren HTTPS o localhost.

- `catalog.js` define el orden de los arcos y los capítulos de cada lista. El orden dentro de cada lista coincide con la galería de Pixeldrain. Mantén los identificadores de los arcos para conservar el progreso guardado.
- `progress.js` guarda los capítulos vistos y migra el arco anterior. `app.js` y `remote.js` gestionan la interfaz y el mando.
- `sw.js` busca los archivos más recientes en red y permite abrir el catálogo sin conexión. Al cambiar los archivos de la aplicación, incrementa la versión de la caché y actualiza la lista de archivos si procede. La reproducción necesita conexión.
- Ejecuta `node --test` con Node.js 22 o posterior para verificar el catálogo, el progreso y el comportamiento de la caché.
