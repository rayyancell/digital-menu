require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// ── MongoDB Connection ──
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// ── Schemas ──
const dishSchema = new mongoose.Schema({
  id: String, name: String, category: String, type: String,
  price: Number, image: String, ingredients: [String], tax: Number
});
const Dish = mongoose.model('Dish', dishSchema);

const orderSchema = new mongoose.Schema({
  id: String, date: { type: Date, default: Date.now }, status: { type: String, default: 'Pending' },
  customerName: String, customerPhone: String, tableNumber: String,
  items: Array, total: Number, is_deleted: { type: Boolean, default: false }
});
const Order = mongoose.model('Order', orderSchema);

// ── Middleware ──
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

// ── Routes ──
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

// Serve all root files (CSS, JS) and uploads
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── API (Simplified for brevity) ──
app.get('/api/dishes', async (req, res) => res.json(await Dish.find()));
app.post('/api/orders', async (req, res) => {
  const newOrder = new Order({ id: Date.now().toString(), ...req.body });
  await newOrder.save();
  res.status(201).json(newOrder);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
