# Step 1: Build Frontend
FROM node:20-slim AS build-stage
WORKDIR /app
COPY . .
# Install and build frontend
RUN cd frontend && npm install && npm run build

# Step 2: Final Image
FROM node:20-slim
WORKDIR /app

# Copy built frontend to a folder the backend can serve
COPY --from=build-stage /app/frontend/dist ./public_html
# Copy backend files
COPY backend ./backend
COPY db ./db

# Install Backend dependencies
RUN cd backend && npm install

EXPOSE 5000
CMD ["node", "backend/server.js"]