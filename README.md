# Task Management Service

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS Elastic Beanstalk](https://img.shields.io/badge/AWS_Elastic_Beanstalk-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)

Servicio backend para la gestión de tareas (Task Management) implementado con NestJS. Proporciona una API REST robusta y segura para que clientes frontend u otras aplicaciones puedan manejar usuarios, autenticación y tareas.

---

## 💻 Tecnologías Utilizadas

Este proyecto fue diseñado tomando decisiones técnicas orientadas al rendimiento, la mantenibilidad y un despliegue optimizado para entornos de producción:

### Frameworks & Diseño Backend
* **[NestJS](https://nestjs.com/) + [Fastify](https://www.fastify.io/)**: Elegí esta combinación para estructurar el proyecto mediante inyección de dependencias y modularidad extrema. Fastify provee un alto rendimiento (rendimiento superior a Express), ideal para APIs intensivas.
* **TypeScript**: Tipado estático estricto en todo el flujo (desde DTOs hasta respuestas) para garantizar un código predecible y disminuir errores de ejecución anticipadamente.
* **[Sequelize ORM](https://sequelize.org/)**: Manejo seguro y programático de la base de datos SQL, implementando migraciones (Migrations) y constructores (Seeders) para mantener el versionado de base de datos directamente en el código.

### Seguridad y Validación
* **Sistema de Seguridad Stateless (Tokens)**: Implementación de **Passport.js** junto a **JSON Web Tokens (JWT)**.
* **Class Validator / Transformer**: Asegura validación declarativa de datos de entrada (Payloads HTTP) antes de que toquen la lógica de negocio, protegiendo al middleware de datos inconsistentes.

### DevSecOps & Cloud Architecture (AWS)
* **Docker & Docker Compose**: Contenerización completa de la aplicación en todas sus fases para garantizar total paridad entre el entorno local (desarrollo) y la producción.
* **Amazon Web Services (AWS)**: 
  * **Elastic Beanstalk**: Para orquestación, autoescalado y despliegue continuo de contenedores. Incluye aprovisionamiento inteligente vía utilidades internas pre-build y `.ebextensions`.
  * **Amazon RDS (MySQL)**: Capa de base de datos relacional auto-gestionada de alta disponibilidad.

---

## 🏗️ Resumen Arquitectónico y Enfoque de Ingeniería

La solución enfatiza las buenas prácticas de ingeniería de software, enfocándose en la testabilidad y adaptabilidad a cambios comerciales (Business Rules).

### Principios de Clean Architecture y Patrones de Diseño
1. **Modularidad Estricta**: La lógica se ha encapsulado en módulos independientes (Ej. `AuthModule`, `TasksModule`). Esto favorece un ecosistema "plug & play", haciendo más sencillo escalar el equipo trabajando en capas separadas simultáneamente.
2. **Patrón Repositorio (Repository Pattern) e Inversión de Dependencias**: 
   - Aislé la infraestructura de base de datos de las lógicas críticas. Los Casos de Uso interactúan con "Contratos/Interfaces" y no con integraciones directas (Entities de ORMs).
   - *Impacto empresarial:* Si el día de mañana se migra de MySQL/Sequelize a MongoDB/Mongoose o PostgreSQL/Prisma, la lógica de negocio subyacente del sistema no se enterará ni tendrá que ser refactorizada.
3. **Controladores Delgados**: Promoviendo buenas prácticas, los endpoints (`@Controller`) asumen el rol exclusivo de encaminar peticiones HTTP. Toda evaluación y procesamiento son delegados a capas de "Services" y "Use-Cases".

### Flujo de Identidad y Autorización
La API es "Stateless" y agnóstica de sesiones de servidor, lo que maximiza la capacidad del backend para distribuir tráfico en balanceadores de carga a escala (*Horizontal Scaling*):
- Se implementaron **Guards (`@UseGuards`)** en cascada para prohibir el acceso a rutas protegidas.
- Creé un interceptor personalizado (`@CurrentUser()`) diseñado para extraer el contexto del solicitante que firma el token y anexarlo de manera invisible (y segura) a las tareas en bases de datos. Los clientes Frontend no deben enviar ni conocer datos duros de auditoría ("ownerId"); el servidor los asume según su identidad criptográfica en tiempo real.