import dayjs from "dayjs";
import { Router } from "express";

import prayerApi from "services/Api/PrayerApi";
import api from "utils/api";
import { parsePrayers } from "utils/parsePrayers";

const router = Router();

router.get("/:country/:city", async (req, res) => {
  const { city, country } = req.params;

  const today = dayjs();
  const [year, month] = [today.year(), today.month() + 1];

  try {
    const parsedPrayers = await prayerApi.getCityPrayerTimes({ city, country, year, month });
    return res.json({ data: parsedPrayers });
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { status, message } = error.response.data;
      return res.status(status).json({ message, status });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/location", async (req, res) => {
  const { latitude, longitude } = req.query;

  const today = dayjs();
  const [year, month] = [today.year(), today.month() + 1];

  try {
    const response = await api.get(`calendar/${year}/${month}`, {
      params: { latitude, longitude },
    });

    const parsed_prayers = parsePrayers(response.data.data);
    return res.json({ data: parsed_prayers });
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { status, message } = error.response.data;
      return res.status(status).json({ message, status });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export default router;
