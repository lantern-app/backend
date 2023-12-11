import { Router } from "express";
import dayjs from "dayjs";
import api from "utils/api";
import parse_prayer from "utils/parse_prayer";

const router = Router();

router.get("/:country/:city", async (req, res) => {
  const { city, country } = req.params;

  const today = dayjs();
  const [year, month] = [today.year(), today.month() + 1];

  try {
    const response = await api.get(`calendarByCity/${year}/${month}`, {
      params: { city, country },
    });

    const parsed_prayers = parse_prayer(response.data.data);
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

router.get("/location", async (req, res) => {
  const { latitude, longitude } = req.query;

  const today = dayjs();
  const [year, month] = [today.year(), today.month() + 1];

  try {
    const response = await api.get(`calendar/${year}/${month}`, {
      params: { latitude, longitude },
    });

    const parsed_prayers = parse_prayer(response.data.data);
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
