# Tracking de Actividad

Este proyecto implementa un sistema de tracking de actividad utilizando DynamoDB y Node.js.

## Requisitos

- Amazon Web Services (AWS) Account
- Node.js
- AWS SDK for JavaScript
- Express.js

## Instalación

1. Clonar el repositorio `https://github.com/FrancaBruzzone/TrackingDeActividad.git`.
2. Instalar dependencias: `npm install`
3. Configurar .env con las credenciales de tu cuenta de AWS.
4. Crear la tabla DynamoDB: `node createActivityTrackingTable.js`
5. Iniciar el servidor: `npm start`

## Uso

### Insertar Actividad

Para insertar una actividad, enviar una solicitud POST a:

```
POST http://localhost:3000/track
Con el cuerpo de la solicitud en formato JSON:
{
    "user_id": "user123",
    "activity_type": "game_played",
    "details": {
        "game_id": "game456",
        "duration": 120
    }
}
```

### Obtener Actividad

Para obtener actividades de un usuario, enviar una solicitud GET a:

```
GET http://localhost:3000/activities/user123
```

### Obtener Actividades

Para obtener actividades de un usuario, enviar una solicitud GET a:

```
GET http://localhost:3000/activities/user123
```
