#!/bin/bash

# Backend setup
cd backend
npm install
cp .env.example .env
echo "✅ Backend dependencies installed!"

# Frontend setup
cd ../frontend
npm install
echo "✅ Frontend dependencies installed!"

# Done
cd ..
echo "🎉 Setup complete! Now run:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"

