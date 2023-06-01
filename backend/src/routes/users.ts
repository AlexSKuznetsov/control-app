import { Router } from "express";
import axios from "axios";
import { BASE_URL } from "../config";

const router = Router();
router.get("/user-list", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`);
    res.send(response.data);
  } catch (e) {
    console.log(e);
  }
});

export default router;
