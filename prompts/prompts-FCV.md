*Listado de prompts:*

**Prompt 1:**

**Rol:**  
Eres un experto en React y desarrollo frontend, con experiencia en modularización, integración de APIs, testing, diseño responsive, accesibilidad y optimización de rendimiento.


**Objetivo y Contexto:**  
Usa @frontend como contexto para el desarrollo y generara el nuevo código siguiendo la misma estructura de carpetas y convenciones encontrado en el proyecto.

Crea la interfaz "position", una vista kanban para gestionar candidatos de una posición. La interfaz debe:
- Mostrar el título de la posición con un botón de retroceso.
- Generar columnas dinámicas basadas en las fases del proceso de contratación.
- Ubicar tarjetas de candidatos que muestren su nombre y puntuación, permitiendo actualizarlas mediante drag and drop.
- Adaptarse a dispositivos móviles, disponiendo las columnas verticalmente.

Toma como referencia el siguiente diseño: @ui-designs/positions.avif

**Endpoints de Backend:**  

- **GET /positions/:id/interviewFlow:**  
Este endpoint devuelve información sobre el proceso de contratación para una determinada posición:
 - positionName: Título de la posición
 - interviewSteps: id y nombre de las diferentes fases de las que consta el proceso de contratación

*Ejemplo de respuesta:*
```json
{
    "positionName": "Senior backend engineer",
    "interviewFlow": {
        "id": 1,
        "description": "Standard development interview process",
        "interviewSteps": [
            { "id": 1, "interviewFlowId": 1, "interviewTypeId": 1, "name": "Initial Screening", "orderIndex": 1 },
            { "id": 2, "interviewFlowId": 1, "interviewTypeId": 2, "name": "Technical Interview", "orderIndex": 2 },
            { "id": 3, "interviewFlowId": 1, "interviewTypeId": 3, "name": "Manager Interview", "orderIndex": 2 }
        ]
    }
}
```

- **GET /positions/:id/candidates:**  
Este endpoint devuelve todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Proporciona la siguiente información:

  - name: Nombre completo del candidato
  - current_interview_step: en qué fase del proceso está el candidato.
  - score: La puntuación media del candidato

*Ejemplo de respuesta:*
```json
[
    { "fullName": "Jane Smith", "currentInterviewStep": "Technical Interview", "averageScore": 4 },
    { "fullName": "Carlos García", "currentInterviewStep": "Initial Screening", "averageScore": 0 },
    { "fullName": "John Doe", "currentInterviewStep": "Manager Interview", "averageScore": 5 }
]
```

- **PUT /candidates/:id/stage:**
Este endpoint actualiza la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico, a través del parámetro "new_interview_step" y proporionando el interview_step_id correspondiente a la columna en la cual se encuentra ahora el candidato.
*Ejemplo petición:*
```json
{
     "applicationId": "1",
     "currentInterviewStep": "3"
}
```
*Ejemplo respuesta:*
```json
{    
    "message": "Candidate stage updated successfully",
     "data": {
         "id": 1,
         "positionId": 1,
         "candidateId": 1,
         "applicationDate": "2024-06-04T13:34:58.304Z",
         "currentInterviewStep": 3,
         "notes": null,
         "interviews": []    
     }
 }
```

**Criterios y Observaciones:**  
- El encabezado muestra el título de la posición y un botón de retroceso.  
- Las columnas se generan dinámicamente según las fases del proceso.  
- Las tarjetas de candidato muestran su nombre y puntuación, ubicándose en la columna correspondiente a su estado actual.  
- Se implementa drag and drop para mover tarjetas y actualizar la etapa vía API.  
- La interfaz es responsive: en dispositivos móviles, las columnas se disponen verticalmente.  
- Asume que la página "positions" y la estructura global (menú, footer, etc.) ya existen; tu tarea es desarrollar únicamente el contenido interno de la página.

**Prompt 2:**
Estás haciendo referencia a dependencias no añadidas al proyecto. Añade las dependencias necesarias.

  
**Prompt 3:**
En lugar de hacer las peticiones a la API, mockea los datos de la respuesta.