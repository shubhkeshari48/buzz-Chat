import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { getUserForSidebar } from '../controllers/getUserController.js';
const router=express.Router();
router.get('/',protectRoute,getUserForSidebar)
export default router;