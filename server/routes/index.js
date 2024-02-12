import { Router } from 'express';
import path from 'path';
import apiRoutes from './api.js';

const router = Router();

router.use('/api', apiRoutes);

// Serve up React front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default router;