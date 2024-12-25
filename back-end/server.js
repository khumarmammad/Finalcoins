const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'images/' });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'coins_catalog',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

// Routes

// Получение списка монет с пагинацией
app.get('/api/coins', (req, res) => {
  const limit = 10;
  const page = parseInt(req.query.page) || 0;
  const offset = page * limit;

  const countQuery = 'SELECT COUNT(*) AS total FROM coins';
  const coinsQuery = `SELECT * FROM coins LIMIT ${limit} OFFSET ${offset}`;

  db.query(countQuery, (err, countResult) => {
    if (err) return res.status(500).send(err);

    const total = countResult[0].total;
    db.query(coinsQuery, (err, coins) => {
      if (err) return res.status(500).send(err);
      res.json({ coins, totalPages: Math.ceil(total / limit) });
    });
  });
});

// Получение информации о конкретной монете
app.get('/api/coins/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM coins WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// Добавление новой монеты
app.post('/api/coins', (req, res) => {
  const {
    name,
    short_description,
    full_description,
    issuing_country,
    composition,
    quality,
    denomination,
    year,
    weight,
    price,
    category,
    front_image,
    reverse_image,
  } = req.body;

  const query = `
    INSERT INTO coins 
    (name, short_description, full_description, issuing_country, composition, quality, denomination, year, weight, price, category, front_image, reverse_image) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      name,
      short_description,
      full_description,
      issuing_country,
      composition,
      quality,
      denomination,
      year,
      weight,
      price,
      category,
      front_image,
      reverse_image,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Coin added successfully', id: result.insertId });
    }
  );
});

// Редактирование существующей монеты
app.put('/api/coins/:id', (req, res) => {
  const { id } = req.params;
  const {
    name,
    short_description,
    full_description,
    issuing_country,
    composition,
    quality,
    denomination,
    year,
    weight,
    price,
    category,
    front_image,
    reverse_image,
  } = req.body;

  const query = `
    UPDATE coins 
    SET name = ?, short_description = ?, full_description = ?, issuing_country = ?, composition = ?, quality = ?, denomination = ?, year = ?, weight = ?, price = ?, category = ?, front_image = ?, reverse_image = ? 
    WHERE id = ?`;

  db.query(
    query,
    [
      name,
      short_description,
      full_description,
      issuing_country,
      composition,
      quality,
      denomination,
      year,
      weight,
      price,
      category,
      front_image,
      reverse_image,
      id,
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Coin updated successfully' });
    }
  );
});

// Удаление монеты
app.delete('/api/coins/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM coins WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Coin deleted successfully' });
  });
});

// Загрузка изображений
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ path: `/images/${req.file.filename}` });
});

// Увеличение количества просмотров
app.post('/api/coins/:id/view', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE coins SET views = views + 1 WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Получение похожих монет
app.get('/api/coins/:id/similar', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT * FROM coins 
    WHERE id != ? 
    AND composition = (SELECT composition FROM coins WHERE id = ?)`;

  db.query(query, [id, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Запуск сервера
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
