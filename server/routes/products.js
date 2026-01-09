const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_PATH = path.join(__dirname, '..', 'data', 'products.json');

function readData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeData(data) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET /api/products
router.get('/', (req, res) => {
  const items = readData();
  res.json(items);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const items = readData();
  const item = items.find((p) => p.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Product not found' });
  res.json(item);
});

// POST /api/products
router.post('/', (req, res) => {
  const items = readData();
  const newItem = { ...req.body, id: (Date.now() + Math.random()).toString() };
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  const items = readData();
  const idx = items.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Product not found' });
  items[idx] = { ...items[idx], ...req.body };
  writeData(items);
  res.json(items[idx]);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  let items = readData();
  const idx = items.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Product not found' });
  const [deleted] = items.splice(idx, 1);
  writeData(items);
  res.json(deleted);
});

module.exports = router;
