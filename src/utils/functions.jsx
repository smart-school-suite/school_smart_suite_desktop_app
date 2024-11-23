function CleanArrayData(dataArray, keys, filterFn) {
    return dataArray
        .filter(filterFn || (() => true)) // Filter based on the provided function or keep all
        .map(item => {
            const cleanedItem = {};
            keys.forEach(key => {
                // Check if the key is a nested key
                const nestedKeys = key.split('.');
                if (nestedKeys.length > 1) {
                    // Extract nested object
                    let nestedValue = item;
                    nestedKeys.forEach(nestedKey => {
                        if (nestedValue && nestedKey in nestedValue) {
                            nestedValue = nestedValue[nestedKey];
                        } else {
                            nestedValue = undefined; // If the nested key is not found, set to undefined
                        }
                    });
                    cleanedItem[key] = nestedValue;
                } else if (key in item) {
                    cleanedItem[key] = item[key];
                }
            });
            return cleanedItem;
        });
}
export default CleanArrayData;

export function renameKeys(dataArray, renameMap) {
    return dataArray.map(item => {
        const renamedItem = {};
        
        // Iterate over the keys in the item and rename as per the renameMap
        for (const key in item) {
            const newKey = renameMap[key] || key; // Use the new key if it exists in the map, otherwise keep original
            renamedItem[newKey] = item[key];
        }

        return renamedItem;
    });
}


export function IsPathInRoutes(routes) {
    return routes.includes(location.pathname);
}

export function generateMonthlyWeeks(year, month) {
    const weeks = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const monthAbbreviation = monthAbbreviations[month];
    let currentWeek = [];
    let weekIndex = 1;
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
  
      const dayObj = {
        abbreviation: weekDays[dayOfWeek],
        fullName: date.toLocaleString("default", { weekday: "long" }),
        date: day, // Store the actual date
      };
  
      currentWeek[dayOfWeek] = dayObj;
  
      if (dayOfWeek === 6 || day === daysInMonth) {
        weeks.push({
          week: `${weekIndex}`,
          abbreviation: monthAbbreviation,
          days: currentWeek.filter(Boolean),
        });
  
        currentWeek = [];
        weekIndex++;
      }
    }
  
    return weeks;
  }

export const generateYearlyMonthData = (year) => {
    const monthData = [
        { name: "January", abbreviation: "Jan", days: 31 },
        { name: "February", abbreviation: "Feb", days: (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28 },
        { name: "March", abbreviation: "Mar", days: 31 },
        { name: "April", abbreviation: "Apr", days: 30 },
        { name: "May", abbreviation: "May", days: 31 },
        { name: "June", abbreviation: "Jun", days: 30 },
        { name: "July", abbreviation: "Jul", days: 31 },
        { name: "August", abbreviation: "Aug", days: 31 },
        { name: "September", abbreviation: "Sep", days: 30 },
        { name: "October", abbreviation: "Oct", days: 31 },
        { name: "November", abbreviation: "Nov", days: 30 },
        { name: "December", abbreviation: "Dec", days: 31 }
    ];

    const yearlyData = {};
    monthData.forEach((month) => {
        const weeks = [];
        const totalDays = month.days;
        const numberOfWeeks = Math.ceil(totalDays / 7);
        for (let week = 1; week <= numberOfWeeks; week++) {
            weeks.push(`Week ${week}`);
        }
        yearlyData[month.name] = {
            abbreviation: month.abbreviation,
            weeks: weeks,
            totalDays: totalDays,
            year: year
        };
    });

    return yearlyData;
};