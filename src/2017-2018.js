export const low_income_offset_max = 445;
export const low_income_offset_reduction_rate = 0.015;
export const low_income_offset_threshold = 66667;
export const medicare_levy_rate = 0.02;
export const medicare_levy_threshold = 22800;

export const firstLevel = {
  threashold: 18200,
  rate: 0,
};

export const secondLevel = {
  threashold: 37000,
  rate: 0.19,
};

export const thirdLevel = {
  threashold: 87000,
  rate: 0.325,
  previous_level_tax: 3572,
};

export const forthLevel = {
  threashold: 180000,
  rate: 0.37,
  previous_level_tax: 19822,
};

export const fifthLevel = {
  rate: 0.45,
  previous_level_tax: 54232,
};
