import { Router } from 'express';
import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  registerUserController,
  refreshUserSessionController,
  loginUserController,
  logoutUserController,
} from '../controllers/auth.js';
import { validationBody } from '../middlewares/validateBody.js';

const router = Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validationBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  jsonParser,
  validationBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
