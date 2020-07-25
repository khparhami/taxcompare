import * as constants from "./constants";

function calculate(income) {
  income = parseInt(income);
  let tax = 0;
  let medicare_levy = 0;
  let low_income_tax_oofset = 0;
  let low_mid_income_tax_offset = 0;
  let monthly_pay = 0;
  let weekly_pay = 0;

  if (income <= constants.firstThreshold) {
    tax = 0;
    monthly_pay = Math.round(income / 12);
    weekly_pay = Math.round(income / 52);
  } else if (income <= constants.secondThreshold) {
    tax = (income - constants.firstThreshold) * constants.secondTaxRate;
    low_income_tax_oofset = 0;
    low_mid_income_tax_offset = 0;
  }

  const taxdetails = {
    income,
    tax,
    medicare_levy,
    low_income_tax_oofset,
    low_mid_income_tax_offset,
    monthly_pay,
    weekly_pay,
  };

  return taxdetails;
}

export default calculate;
