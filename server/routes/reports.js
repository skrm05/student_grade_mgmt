import { Router } from "express";
import * as studentService from "../services/studentService.js";

const router = Router();


router.get("/ranklist", async (req, res, next) => {
  try {
    const rankList = await studentService.getRankList();
    res.json(rankList);
  } catch (err) {
    next(err);
  }
});


router.get("/top5", async (req, res, next) => {
  try {
    const top5 = await studentService.getTop5Students();
    res.json(top5);
  } catch (err) {
    next(err);
  }
});


router.get("/subject-averages", async (req, res, next) => {
  try {
    const averages = await studentService.getSubjectWiseAverage();
    res.json(averages);
  } catch (err) {
    next(err);
  }
});

export default router;
