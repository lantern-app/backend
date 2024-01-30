import { Prayer } from "interfaces/prayer";

export const parsePrayers = (prayers: Prayer[]) => {
  return prayers.map((prayer: Prayer) => {
    const {
      timings: { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha },
      date: { gregorian },
      meta: { timezone },
    } = prayer;

    return {
      date: gregorian.date,
      timezone,
      fajr: Fajr,
      sunrise: Sunrise,
      dhuhr: Dhuhr,
      asr: Asr,
      maghrib: Maghrib,
      isha: Isha,
    };
  });
};
