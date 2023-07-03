import express from 'express';
import gameRoutes from './routes/gameRoutes';

const app = express();
const port = 4000;

app.use(express.json());
app.use('/api/game', gameRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
