## Despliegue de Task Management Service en AWS Elastic Beanstalk

A continuación documento **exactamente** el proceso paso a paso que seguí para desplegar mi aplicación NestJS (Task Management Service) en AWS Elastic Beanstalk usando contenedores Docker.

### Paso 1: Instalación de la EB CLI

Instalé la Elastic Beanstalk Command Line Interface (EB CLI) utilizando pip:

```
pip install --upgrade pip
pip install awsebcli --upgrade --user
```

Para verificar la instalación:

```
eb --version
```

### Paso 2 Preparación del Proyecto para Despliegue

- Creé un Dockerfile en la raíz del proyecto para contenerizar completamente la aplicación NestJS + Fastify.
- Configuré el archivo .ebignore para excluir carpetas y archivos innecesarios (node_modules, .git, carpetas de desarrollo, etc.).
- Probé el contenedor localmente con Docker para confirmar que funcionaba correctamente.
- Preparé todas las variables de entorno necesarias (conexión a RDS MySQL, JWT secret, NODE_ENV=production, etc.).

### Paso 3: Inicialización de Elastic Beanstalk

Inicialicé el proyecto con la plataforma Docker específica usando el siguiente comando:

```
eb init -p "64bit Amazon Linux 2023 v4.12.0 running Docker" --region us-east-1 task-service
```

Este comando creó la aplicación llamada task-service en AWS y configuró mi entorno local para trabajar con la plataforma 64bit Amazon Linux 2023 v4.12.0 running Docker en la región us-east-1.

### Paso 4: Creación del Entorno de Despliegue

Creé el entorno de producción con una sola instancia utilizando el comando:

```
eb create task-enviroment --single
```

Este comando ejecutó automáticamente todo el proceso:

- Empaquetó el código y lo subió a S3
- Lanzó una instancia EC2
- Construyó la imagen Docker
- Desplegó y levantó el contenedor
- Configuró el proxy nginx

### Paso 5: Monitoreo del Despliegue

Mientras se creaba el entorno, revisé el progreso en tiempo real con los siguientes comandos:

```
eb events
eb status
eb logs
eb logs --tail
```

### Paso 6: Configuración Posterior al Despliegue

Una vez que el entorno estuvo creado, realicé las siguientes configuraciones desde la consola de AWS Elastic Beanstalk:

- Accedí a Configuration → Software → Environment properties
- Agregué todas las variables de entorno necesarias:
  - Variables de conexión a Amazon RDS MySQL (DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE)
  - JWT_SECRET y otras variables específicas de la aplicación

- Modifiqué el Security Group de la instancia EC2 para permitir el tráfico hacia la instancia de RDS MySQL.

### Paso 7: Verificación del Despliegue

Verifiqué que la aplicación estuviera funcionando correctamente ejecutando:

```
eb open
```
