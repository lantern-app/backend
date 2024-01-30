import { Prayer } from "interfaces/prayer";
import AxiosService from "services/Axios";
import { parsePrayers } from "utils/parsePrayers";

type CityPrayerTimes = { year: number; month: number; city: string; country: string };

class PrayerApi {
  private axios: AxiosService;

  constructor() {
    this.axios = new AxiosService("https://api.aladhan.com/v1/");
  }

  public getCityPrayerTimes = async ({ city, country, year, month }: CityPrayerTimes) => {
    const prayers = await this.axios.get<Prayer[]>(`calendarByCity/${year}/${month}`, {
      params: { city, country },
    });

    return parsePrayers(prayers);
  };
}

const prayerApi = new PrayerApi();

export default prayerApi;
