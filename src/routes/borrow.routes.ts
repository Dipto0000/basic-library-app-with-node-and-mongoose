import express from 'express';
import { borrowBook, borrowedBooksSummary } from '../../src/app/controllers/borrow.controller';

const router = express.Router();

router.post('/', borrowBook as express.RequestHandler);
router.get('/', borrowedBooksSummary as express.RequestHandler);

export default router;
