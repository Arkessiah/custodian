require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servicio de Custodia Activo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

app.post('/transaccion', async (req, res) => {
  try {
    const { to, amount } = req.body;
    const transactionResponse = await firmarTransaccion({ to, amount });
    res.json({ success: true, transaction: transactionResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

