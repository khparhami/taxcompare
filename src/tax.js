import * as constants from "./constants";

function calculateNetIncome(
  income,
  tax,
  medicareLevy,
  lowIncomeOffset,
  midIncomeOffset
) {
  return income - tax - medicareLevy + lowIncomeOffset + midIncomeOffset;
}
function calculateLowIncomOffset(income) {
  if (
    income <= constants.firstLevel.threashold ||
    income >= constants.low_income_offset_threshold
  ) {
    return 0;
  }
  if (income <= constants.secondLevel.threashold) {
    return constants.low_income_offset_max;
  }

  return (
    constants.low_income_offset_max -
    (income - constants.secondLevel.threashold) *
      constants.low_income_offset_reduction_rate
  );
}

function calculateMidIncomOffset(income) {
  if (
    income <= constants.firstLevel.threashold ||
    income > constants.mid_income_offset.forth_threshold
  ) {
    return 0;
  }
  if (income <= constants.mid_income_offset.first_threshold) {
    return constants.mid_income_offset.min;
  }
  if (income <= constants.mid_income_offset.second_threshold) {
    let offset =
      constants.mid_income_offset.min +
      (income - constants.mid_income_offset.first_threshold) *
        constants.mid_income_offset.increase_rate;
    return offset < constants.mid_income_offset.max
      ? offset
      : constants.mid_income_offset.max;
  }
  if (income < constants.mid_income_offset.third_threshold) {
    return constants.mid_income_offset.max;
  }

  return (
    constants.mid_income_offset.max -
    (income - constants.mid_income_offset.third_threshold) *
      constants.mid_income_offset.decrease_rate
  );
}

function calculateMedicareLevy(income) {
  if (income > constants.medicare_levy_threshold) {
    return income * constants.medicare_levy_rate;
  }
  return 0;
}

function calculate(income) {
  income = parseInt(income);
  let tax = 0;
  let medicare_levy = 0;
  let low_income_tax_offset = 0;
  let low_mid_income_tax_offset = 0;

  low_income_tax_offset = calculateLowIncomOffset(income);
  low_mid_income_tax_offset = calculateMidIncomOffset(income);
  medicare_levy = calculateMedicareLevy(income);

  if (income <= constants.firstLevel.threashold) {
    tax = 0;
  } else if (income <= constants.secondLevel.threashold) {
    tax =
      (income - constants.firstLevel.threashold) * constants.secondLevel.rate;
  } else if (income <= constants.thirdLevel.threashold) {
    tax =
      constants.thirdLevel.previous_level_tax +
      (income - constants.secondLevel.threashold) * constants.thirdLevel.rate;
  } else if (income <= constants.forthLevel.threashold) {
    tax =
      constants.forthLevel.previous_level_tax +
      (income - constants.thirdLevel.threashold) * constants.forthLevel.rate;
  } else {
    tax =
      constants.fifthLevel.previous_level_tax +
      (income - constants.forthLevel.threashold) * constants.fifthLevel.rate;
  }

  const netIncome = calculateNetIncome(
    income,
    tax,
    medicare_levy,
    low_income_tax_offset,
    low_mid_income_tax_offset
  );

  const taxdetails = {
    income,
    tax: Math.round(tax),
    medicare_levy: Math.round(medicare_levy),
    low_income_tax_offset: Math.round(low_income_tax_offset),
    low_mid_income_tax_offset: Math.round(low_mid_income_tax_offset),
    monthly_pay: Math.round(netIncome / 12),
    weekly_pay: Math.round(netIncome / 52),
  };

  return taxdetails;
}

export default calculate;
