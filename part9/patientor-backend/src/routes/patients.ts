import { Router } from "express";
import * as patientService from '../services/patientService';

const router = Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

export default router;
