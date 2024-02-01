# Use a lightweight Node.js image
FROM node:20.11.0

# Set the working directory inside the container
WORKDIR /app

# Copy the built Next.js project files into the container
COPY . .

# Install production dependencies
RUN npm install && npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Command to start the Next.js app
CMD ["npm", "start"]
