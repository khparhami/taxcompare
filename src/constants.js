import * as constants_2019_2020 from "./2019-2020";
import * as constants_2018_2019 from "./2018-2019";
import * as constants_2017_2018 from "./2017-2018";
import * as constants_2016_2017 from "./2016-2017";
import * as constants_2015_2016 from "./2015-2016";

export const getRates = (financial_year) => {
  let finantial_year_rates;
  switch (financial_year) {
    case "2019-2020":
      finantial_year_rates = constants_2019_2020;
      break;
    case "2018-2019":
      finantial_year_rates = constants_2018_2019;
      break;
    case "2017-2018":
      finantial_year_rates = constants_2017_2018;
      break;
    case "2016-2017":
      finantial_year_rates = constants_2016_2017;
      break;
    case "2015-2016":
      finantial_year_rates = constants_2015_2016;
      break;
    default:
      finantial_year_rates = constants_2019_2020;
      break;
  }

  return finantial_year_rates;
};
