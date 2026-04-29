# 🌤️ Clima Guatemala

App web del clima para Guatemala City con datos en tiempo real.

![Vista previa](https://img.shields.io/badge/Status-Activo-green)
![HTML](https://img.shields.io/badge/HTML5-Vanilla-orange)
![CSS](https://img.shields.io/badge/CSS3-Custom%20Properties-blue)
![JS](https://img.shields.io/badge/JavaScript-ES6-yellow)

## 📸 Vista Previa

```
┌─────────────────────────────────────────┐
│  🌤️ Clima Guatemala              🌙     │
├─────────────────────────────────────────┤
│  [Guatemala City................ 🔍]    │
├─────────────────────────────────────────┤
│  ┌─────��─────────────────────────────┐  │
│  │  📍 Guatemala City                │  │
│  │  lunes 27 de abril de 2026        │  │
│  │                                   │  │
│  │  29°              ☀️              │  │
│  │  Soleado                           │  │
│  │                                   │  │
│  │  Sensación  31°  Humedad  45%     │  │
│  │  Lluvia     10%  Viento   12 km/h │  │
│  │  Presión   1013 hPa               │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Pronóstico Extendido                   │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│  │ lun│ │mar│ │mié│ │jue│ │vie│    │
│  │ ☀️ │ │ ⛅ │ │ ☁️ │ │ 🌧️ │ │ ☀️ │    │
│  │29° │ │28° │ │27° │ │26° │ │29° │    │
│  │10% │ │20% │ │ 5% │ │60% │ │15% │    │
��  └────┘ └────┘ └────┘ └────┘ └────┘    │
└─────────────────────────────────────────┘
```

## ✨ Características

- **Clima actual en tiempo real** - temperatura, sensación térmica, humedad, probabilidad de lluvia, viento, presión
- **Pronóstico de 7 días** - temperatura máxima/mínima y probabilidad de lluvia por día
- **Tema dinámico por clima** - los colores cambian según la condición:
  - ☀️ Soleado → naranja/amarillo
  - ⛅ Parcialmente nublado → dorado
  - ☁️ Nublado → gris
  - 🌧️ Lluvia → cyan/turquesa
  - ⛈️ Tormenta → violeta
  - ❄️ Nieve → azul cielo
  - 🌫️ Niebla → gris
- **Modo oscuro** - toggle en header, persiste en localStorage
- **Diseño responsivo** - funciona en móvil y desktop
- **API gratuita** - sin API key necesaria

## 🚀 Cómo Ejecutar

```bash
# Simplemente abre el archivo HTML en tu navegador
open index.html

# O usa un servidor local (opcional)
npx serve .
```

> No requiere instalación, dependencias ni build system.

## 🛠️ Tecnologías

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura |
| CSS3 | Estilos con variables CSS, temas dinámicos |
| JavaScript ES6 | Lógica de la aplicación |
| [Open-Meteo API](https://open-meteo.com/) | Datos del clima (gratuita, sin API key) |
| [Font Awesome 6.4](https://fontawesome.com/) | Iconos del clima |

## 📁 Estructura del Proyecto

```
clima-guatemala/
├── index.html      # Estructura HTML
├── styles.css      # Estilos y temas
├── script.js       # Lógica de la aplicación
└── README.md       # Este archivo
```

## 🏛️ Arquitectura

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    UI Layer                          │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │    │
│  │  │ Header  │ │ Weather │ │ Forecast│ │ Footer  │   │    │
│  │  │  Card   │ │  Cards  │ │         │ │         │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 Business Logic                       │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │    │
│  │  │  Theme   │  │ Weather  │  │  Theme   │          │    │
│  │  │ Manager  │  │  Data    │  │ Toggle   │          │    │
│  │  └──────────┘  └──────────┘  └──────────┘          │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Data Layer                         │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │    │
│  │  │  Fetch   │  │ local    │  │  DOM     │          │    │
│  │  │  API     │  │ Storage  │  │ Update   │          │    │
│  │  └──────────┘  └──────────┘  └──────────┘          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      EXTERNAL APIS                           │
│  ┌─────────────────┐                    ┌─────────────────┐ │
│  │   Open-Meteo    │                    │  Font Awesome   │ │
│  │   Weather API   │                    │  CDN Icons      │ │
│  └─────────────────┘                    └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Diagrama de Arquitectura Detallada

```
                    ┌──────────────────┐
                    │   index.html     │
                    │   (Entry Point)  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ styles.css│  │script.js │  │Font Awsm │
        │(Theme    │  │(Logic    │  │(Icons    │
        │ System)  │  │& Fetch)  │  │CDN)      │
        └──────────┘  └────┬─────┘  └──────────┘
                           │
                    ┌─────��┴──────┐
                    │             │
                    ▼             ▼
           ┌──────────────┐  ┌──────────────┐
           │ Open-Meteo   │  │ localStorage │
           │ API          │  │ (Theme)      │
           └──────────────┘  └──────────────┘
```

## 📋 Casos de Uso

### Diagrama de Casos de Uso

```
┌─────────────────────────────────────────────────────────────┐
│                    Sistema de Clima                          │
│                                                             │
│  ┌─────────────┐                                            │
│  │  Usuario    │                                            │
│  └──────┬──────┘                                            │
│         │                                                   │
│         │ ╭─────────────────────────────────────────────╮  │
│         │ │                                             │  │
│         │ ▼                                             │  │
│         │ 1. Consultar clima actual                     │  │
│         │    - Ver temperatura actual                   │  │
│         │    - Ver sensación térmica                     │  │
│         │    - Ver humedad                               │  │
│         │    - Ver probabilidad de lluvia                │  │
│         │    - Ver velocidad del viento                   │  │
│         │    - Ver presión atmosférica                   │  │
│         │                                                 │  │
│         │ 2. Ver pronóstico extendido                    │  │
│         │    - Ver clima de los próximos 7 días           │  │
│         │    - Ver temperatura máx/mín por día            │  │
│         │    - Ver probabilidad de lluvia por día         │  │
│         │                                                 │  │
│         │ 3. Cambiar tema visual                          │  │
│         │    - Activar modo claro                         │  │
│         │    - Activar modo oscuro                        │  │
│         │    - Preferencia se guarda automáticamente      │  │
│         │                                                 │  │
│         │ 4. Buscar por ciudad                            │  │
│         │    - Ingresar nombre de ciudad                  │  │
│         │    - Ver clima de la ciudad                     │  │
│         │                                                 │  │
│         │ 5. Ver fecha y hora actual                      │  │
│         │    - Fecha formateada en español                │  │
│         │                                                 │  │
│         │ 6. Manejar errores                              │  │
│         │    - Ver mensaje de error si falla la API       │  │
│         │    - Reintentar conexión automáticamente        │  │
│         │                                                 │  │
│         │ 7. Detectar estado de red                       │  │
│         │    - Mostrar error si no hay conexión           │  │
│         │    - Reintentar cuando se pierde conexión       │  │
│         │                                                 │  │
│         │ 8. Ver iconos dinámicos por clima               │  │
│         │    - Iconos cambiar según condición climática   │  │
│         │    - Colores adaptativos por tipo de clima      │  │
│         │                                                 │  │
│         │ 9. Ver tema de colores por clima                │  │
│         │    - Tarjetas cambian de color según clima      │  │
│         │                                                 │  │
│         │             ─────────────────────               │  │
│         │                                                 │  │
│         │              [API Open-Meteo]                   │  │
│         │             (Servicio Externo)                  │  │
│         │                                                 │  │
│         │                                                 │  │
│         │ ╰─────────────────────────────────────────────╯ │   |                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Usuario

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Inicio  │───▶│  Carga   │───▶│ Fetch    │───▶│ Muestra  │
│          │    │  Página  │    │  API     │    │  Clima   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                     │
                    ▼                                     ▼
             ┌──────────┐                          ┌──────────┐
             │   Error  │                          │  Éxito   │
             │  API     │                          │  Datos   │
             └────┬─────┘                          └────┬─────┘
                  │                                     │
                  ▼                                     ▼
           ┌──────────┐                          ┌──────────┐
           │ Muestra  │                          │ Actualiza│
           │  Error   │                          │  UI +    │
           └──────────┘                          │  Colores │
                                                 └──────────┘
                                                        │
                                                        ▼
                                                 ┌──────────┐
                                                 │ Muestra  │
                                                 │Pronóstico│
                                                 └──────────┘
```

## 🌐 API Open-Meteo

### Endpoint

```
https://api.open-meteo.com/v1/forecast
```

### Parámetros

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| `latitude` | `14.6349` | Latitud de Guatemala City |
| `longitude` | `-90.5055` | Longitud de Guatemala City |
| `current` | `temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,windspeed_10m,pressure_msl,precipitation_probability` | Variables del clima actual |
| `daily` | `temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max` | Variables del pronóstico |
| `timezone` | `America/Guatemala` | Zona horaria |
| `forecast_days` | `7` | Días de pronóstico |

### Códigos de Clima

| Código | Condición | Icono | Color |
|--------|-----------|-------|-------|
| 0 | Soleado | fa-sun | #f59e0b |
| 1 | Mayormente soleado | fa-sun | #f59e0b |
| 2 | Parcialmente nublado | fa-cloud-sun | #f59e0b |
| 3 | Nublado | fa-cloud | #64748b |
| 45, 48 | Niebla | fa-smog | #78716c |
| 51-57 | Llovizna | fa-cloud-rain | #06b6d4 |
| 61-67, 80-82 | Lluvia | fa-cloud-showers-heavy | #0891b2 |
| 71-77, 85-86 | Nieve | fa-snowflake | #0ea5e9 |
| 95-99 | Tormenta | fa-bolt | #8b5cf6 |


## 📝 Notas

- La búsqueda de ciudades es visual únicamente (no hay geocoding real)
- Los datos de coordenadas están hardcodeados para Guatemala City
- El modo oscuro se guarda en localStorage del navegador
- Los colores de las tarjetas cambian según el código del clima recibido


