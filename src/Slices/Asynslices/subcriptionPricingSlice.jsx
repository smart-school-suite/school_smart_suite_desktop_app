import { createSlice } from '@reduxjs/toolkit';

const pricingSlice = createSlice({
  name: 'pricing',
  initialState: {
    userInput: { students: 1 },
    calculatedCost: { monthlyCost: 0, yearlyCost: 0, activeRateId: null },
    ranges: [],
    rates: [],
  },
  reducers: {
    setUserInput: (state, action) => {
      state.userInput.students = action.payload.students;
      const { students } = state.userInput;

      if (students <= 0) {
        state.calculatedCost = { monthlyCost: 0, yearlyCost: 0, activeRateId: null };
        return;
      }

      const activeRate = state.rates.find((rate, index) => {
        const range = state.ranges[index];
        return students >= range.min && students <= range.max;
      });

      if (activeRate) {
        const { id, monthly_rate_per_student, yearly_rate_per_student } = activeRate;
        state.calculatedCost.monthlyCost = students * parseFloat(monthly_rate_per_student);
        state.calculatedCost.yearlyCost = students * parseFloat(yearly_rate_per_student);
        state.calculatedCost.activeRateId = id;
      } else {
        state.calculatedCost = { monthlyCost: 0, yearlyCost: 0, activeRateId: null };
      }
    },
    setRates: (state, action) => {
      state.rates = action.payload;

      if (state.rates.length > 0) {
        const sortedRates = [...state.rates].sort((a, b) => a.max_students - b.max_students);
        state.rates = sortedRates;

        const ranges = [];
        let previousMaxStudents = 0;

        sortedRates.forEach((rate) => {
          const range = {
            min: previousMaxStudents + 1,
            max: rate.max_students,
          };
          ranges.push(range);
          previousMaxStudents = rate.max_students;
        });

        state.ranges = ranges;

        const { students } = state.userInput;
        const activeRate = sortedRates.find((rate, index) => {
          const range = ranges[index];
          return students >= range.min && students <= range.max;
        });

        if (activeRate) {
          const { id, monthly_rate_per_student, yearly_rate_per_student } = activeRate;
          state.calculatedCost.monthlyCost = students * parseFloat(monthly_rate_per_student);
          state.calculatedCost.yearlyCost = students * parseFloat(yearly_rate_per_student);
          state.calculatedCost.activeRateId = id; 
        }
      }
    },
  },
});

export const { setUserInput, setRates } = pricingSlice.actions;
export default pricingSlice.reducer;
