# Home Decor E-Commerce Platform

A modern, full-stack e-commerce platform specialized in home decor products featuring a React frontend, .NET backend, and SQL Server database - all containerized with Docker for easy deployment.

## 🏠 Project Overview

This e-commerce platform is designed specifically for home decor products, providing users with a seamless shopping experience from browsing to checkout. The application implements user authentication, product management, shopping cart, and wishlist features in a responsive interface.

## ✨ Features

### User Features
- **Account Management**: User registration and login with secure authentication
- **Product Browsing**: View all products with filtering by categories
- **Product Details**: Detailed product information and images
- **Shopping Cart**: Add/remove items to cart, update quantities
- **Wishlist**: Save favorite products for later (requires authentication)
- **Checkout Process**: Complete purchase with shipping and payment details

### Technical Features
- **JWT Authentication**: Secure API endpoints with token-based authentication
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Real-time Data**: API integration for product information
- **Data Persistence**: SQL Server database for storing product and user data
- **Containerized Architecture**: Docker and Docker Compose for easy setup and deployment

## 🛠️ Technology Stack

### Frontend
- React.js with React Router for routing
- Tailwind CSS for styling
- Formik & Yup for form validation
- Axios for API communication

### Backend
- ASP.NET Core API
- Entity Framework Core
- SQL Server for database
- JWT for authentication

### DevOps
- Docker & Docker Compose for containerization
- Docker Hub for container registry
- Git for version control

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Git](https://git-scm.com/downloads) (optional, for cloning the repository)

### Note for New Users
You don't need React or .NET development experience to run this application. Docker takes care of all dependencies and setup for you! As long as you have Docker installed, you can run the entire application stack without installing React, Node.js, .NET SDK, or SQL Server on your local machine.

### Installation & Setup

#### Option 1: Using Docker Hub Images

1. **Create a docker-compose.yml file** with the following content (adjust as needed):
   ```bash
   version: "3.8"
   services:
     backend:
       image: yourusername/homedecor-backend:latest
       ports:
         - "5236:80"
       environment:
         - ASPNETCORE_ENVIRONMENT=Development
       networks:
         - ecommerce-net
       volumes:
         - ./Uploads:/app/Uploads
       depends_on:
         db:
           condition: service_healthy
       restart: unless-stopped
     frontend:
       image: yourusername/homedecor-frontend:latest
       ports:
         - "5173:5173"
       environment:
         - CHOKIDAR_USEPOLLING=true
       networks:
         - ecommerce-net
       depends_on:
         - backend
     db:
       image: yourusername/homedecor-sqlserver:latest
       environment:
         - "ACCEPT_EULA=Y"
         - "SA_PASSWORD=Admin123@"
         - "MSSQL_PID=Developer"
         - "MSSQL_AGENT_ENABLED=true"
         - "MSSQL_TCP_PORT=1433"
       ports:
         - "1433:1433"
       volumes:
         - mssql-data:/var/opt/mssql
       networks:
         - ecommerce-net
       healthcheck:
         test: /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1" || exit 1
         interval: 10s
         timeout: 3s
         retries: 10
         start_period: 10s
       restart: unless-stopped
   networks:
     ecommerce-net:
       driver: bridge
   volumes:
     mssql-data:
   ```

2. **Pull and run using Docker Compose**
   ```bash
   docker-compose up -d
   ```

#### Option 2: Building Locally from Source

1. **Clone the repository** (if using Git)
   ```bash
   git clone <repository-url>
   cd home-decor-ecommerce
   ```

2. **Environment setup**
   - No additional environment setup is needed as all required configurations are included in the Docker Compose file.

3. **Start the application with Docker Compose**
   ```bash
   docker-compose up -d
   ```
   This command will:
   - Build and start the frontend, backend, and database containers
   - Create necessary networks and volumes
   - Configure all services to communicate with each other

4. **Verify the application is running**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5236
   - API Documentation (Swagger): http://localhost:5236/swagger

## 📋 Usage Guide

### Container Images on Docker Hub
The application images are available on Docker Hub:

- Frontend: https://hub.docker.com/repository/docker/mariamkilany4/ecommerce-frontend
- Backend:  https://hub.docker.com/repository/docker/mariamkilany4/ecommerce-backend
- Database: https://hub.docker.com/repository/docker/mariamkilany4/ecommerce-db

### Accessing the Application
Once all containers are up and running:

1. Open your browser and navigate to `http://localhost:5173`
2. You can browse products without creating an account
3. To add items to cart or wishlist, you'll need to create an account or login

### Creating an Account
1. Click on the "Sign Up" link in the navigation
2. Fill in the required information
3. Submit the form to create your account

### Shopping
1. Browse products on the home page or by category
2. Click on a product to view details
3. Add products to your cart or wishlist using the icons
4. View your cart to adjust quantities or remove items
5. Proceed to checkout when ready to complete your purchase

## 🔧 Development Guide

### Project Structure
```
├── back/
│   └── E-Commerce/         # .NET Backend
│       └── dockerfile      # Backend Docker build file
├── front/                  # React Frontend
│   └── dockerfile          # Frontend Docker build file
├── sql-tools/              # SQL Server tools
├── docker-compose.yml      # Docker Compose configuration
├── sql.dockerfile          # SQL Server Docker build file
└── README.md               # This file
```

### Making Changes
- **Frontend**: Changes in the `front` directory will be automatically reflected due to volume mounting and hot-reloading
- **Backend**: Changes to the backend code require rebuilding the container:
  ```bash
  docker-compose build backend
  docker-compose up -d backend
  ```

### Publishing to Docker Hub
If you've made changes and want to update the Docker Hub images:

```bash
# Login to Docker Hub
docker login

# Build and tag images
docker-compose build

# Tag images
docker tag home-decor-ecommerce-frontend:latest yourusername/homedecor-frontend:latest
docker tag home-decor-ecommerce-backend:latest yourusername/homedecor-backend:latest
docker tag home-decor-ecommerce-db:latest yourusername/homedecor-sqlserver:latest

# Push images to Docker Hub
docker push yourusername/homedecor-frontend:latest
docker push yourusername/homedecor-backend:latest
docker push yourusername/homedecor-sqlserver:latest
```

### Database Access
- The SQL Server database runs on port 1433
- Connection string is defined in the backend configuration
- You can connect using SQL Server Management Studio or any compatible tool:
  - Server name: localhost,1433
  - Authentication: SQL Server Authentication
  - Login: sa
  - Password: Admin123@

## 🛑 Stopping the Application

To stop and remove the running containers:
```bash
docker-compose down
```

To stop and remove containers along with volumes (will delete database data):
```bash
docker-compose down -v
```

## 🐛 Troubleshooting

### Common Issues
1. **Port conflicts**: If ports 5173, 5236, or 1433 are already in use on your machine, modify the port mappings in the `docker-compose.yml` file.

2. **Database connection issues**: If the backend cannot connect to the database, ensure the SQL Server container is healthy:
   ```bash
   docker-compose ps
   ```
   If the database shows as unhealthy, check the logs:
   ```bash
   docker-compose logs db
   ```

3. **Frontend not loading**: Check if the frontend container is running and check its logs:
   ```bash
   docker-compose logs frontend
   ```

### For Non-Developers
If you're not familiar with React, .NET, or Docker concepts:

1. **Simple restart solution**: Most issues can be fixed by restarting the containers:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

2. **Viewing the application**: Just open your web browser and go to:
   - http://localhost:5173

3. **First-time setup**: The first time you run the application might take several minutes while Docker downloads and builds the necessary components.

4. **No development tools needed**: You don't need to install any development tools or make any code changes - Docker handles everything!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For any questions or suggestions, please reach out through the contact page in the application.