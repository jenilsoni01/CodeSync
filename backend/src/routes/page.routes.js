import { Router } from 'express';
import { getPage, setPage } from '../controllers/page.controller.js';

const router = Router();

// Route to get a page by pageId
router.get('/:pageId', getPage);

// Route to set/update a page by pageId
router.post('/:pageId', setPage);

// Export the router for use in app.js
export { router as pageRouter }; 