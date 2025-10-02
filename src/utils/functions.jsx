function CleanArrayData(dataArray, keys, filterFn) {
    return dataArray
        .filter(filterFn || (() => true))
        .map(item => {
            const cleanedItem = {};
            keys.forEach(key => {
                const nestedKeys = key.split('.');
                if (nestedKeys.length > 1) {
                    let nestedValue = item;
                    nestedKeys.forEach(nestedKey => {
                        if (nestedValue && nestedKey in nestedValue) {
                            nestedValue = nestedValue[nestedKey];
                        } else {
                            nestedValue = undefined; 
                        }
                    });
                    if (key.endsWith('created_at') || key.endsWith('updated_at')) {
                        cleanedItem[key] = formatDate(nestedValue);
                    } else {
                        cleanedItem[key] = nestedValue;
                    }
                } else if (key in item) {
                    if (key === 'created_at' || key === 'updated_at') {
                        cleanedItem[key] = formatDate(item[key]);
                    } else {
                        cleanedItem[key] = item[key];
                    }
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

export  function convertToReadableDate(isoString) {
    /**
     * Converts an ISO 8601 formatted date string to a readable date format.
     *
     * @param {string} isoString - The date string in ISO 8601 format.
     * @returns {string} - The formatted date string in "Month, Year, HH:MM AM/PM" format.
     */
    try {
        // Create a Date object from the ISO string.
        const date = new Date(isoString);

        // Check for an invalid date
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }

        // Define options for formatting
        const options = {
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        // Use toLocaleString to format the date
        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
    } catch (error) {
        return `Error parsing date: ${error.message}`;
    }
}

export function timeSince(date) {
    /**
     * Calculates the time elapsed from a given date until now.
     *
     * @param {Date} date - A Date object representing the creation time.
     * @returns {string} - A human-readable string indicating the time elapsed.
     */
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);  // Convert milliseconds to seconds

    let interval = Math.floor(seconds / 31536000); // Seconds in a year
    if (interval >= 1) {
        return interval === 1 ? "1 year ago" : `${interval} years ago`;
    }

    interval = Math.floor(seconds / 2592000); // Seconds in a month
    if (interval >= 1) {
        return interval === 1 ? "1 month ago" : `${interval} months ago`;
    }

    interval = Math.floor(seconds / 604800); // Seconds in a week
    if (interval >= 1) {
        return interval === 1 ? "1 week ago" : `${interval} weeks ago`;
    }

    interval = Math.floor(seconds / 86400); // Seconds in a day
    if (interval >= 1) {
        return interval === 1 ? "1 day ago" : `${interval} days ago`;
    }

    interval = Math.floor(seconds / 3600); // Seconds in an hour
    if (interval >= 1) {
        return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60); // Seconds in a minute
    if (interval >= 1) {
        return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
    }

    return "just now";
}

export function formatNumber(value, decimalPlaces = 0) {
   // Check if the input is a number
   if (isNaN(value)) {
       throw new Error('Invalid number provided');
   }

   // Round to the specified number of decimal places
   const roundedValue = Number(value).toFixed(decimalPlaces);

   // Split the number into whole and decimal parts
   const parts = roundedValue.split('.');
   const wholePart = parts[0];
   const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

   // Add commas to the whole part using a regular expression
   const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

   // Return the formatted number
   return formattedWholePart + decimalPart;
}

export  function isInteger(value) {
    return typeof value === 'number' && Number.isInteger(value);
}

export function isDecimal(value) {
    return typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value);
}

export function sumAttribute(arr, attribute) {
    return arr.reduce((total, item) => {
        const value = Number(item[attribute]); 
        return total + (isNaN(value) ? 0 : value); 
    }, 0);
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
        return "N/A";
    }
    const options = {
        weekday: 'long',
        month: 'long',
        year: 'numeric'
    };
    const day = date.getDate();
    const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? 'st' :
                       day % 10 === 2 && day !== 12 ? 'nd' :
                       day % 10 === 3 && day !== 13 ? 'rd' : 'th');
    const weekdayMonthYear = date.toLocaleDateString('en-US', options);
    const parts = weekdayMonthYear.split(' ');
    const formattedDate = `${parts[2]}, ${parts[0]} ${dayWithSuffix}, ${parts[1]}`;
    return formattedDate;
}

export function formatDateWithAge(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
        throw new Error("Invalid date format. Please use YYYY-MM-DD.");
    }
    const options = {
        weekday: 'long',
        month: 'long',
        year: 'numeric'
    };
    const day = date.getDate();
    const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? 'st' :
                       day % 10 === 2 && day !== 12 ? 'nd' :
                       day % 10 === 3 && day !== 13 ? 'rd' : 'th');
    const weekdayMonthYear = date.toLocaleDateString('en-US', options);
    const parts = weekdayMonthYear.split(' ');
    const formattedDate = `${parts[2]}, ${parts[0]} ${dayWithSuffix}, ${parts[1]}`;

    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--;
    }
    const result = `${formattedDate} - ${age} years old`;

    return result;
}

/**
 * Formats a duration given hours and minutes into a string.
 * 
 * @param {number} hours - The number of hours.
 * @param {number} minutes - The number of minutes.
 * @returns {string} - The formatted duration string.
 */
export const formatDuration = (hours, minutes) => {
    let durationString = '';

    // Add hours if present
    if (hours > 0) {
        durationString += `${hours} hour${hours > 1 ? 's' : ''}`;
    }

    // Add minutes only if greater than zero
    if (minutes > 0) {
        if (durationString) {
            durationString += ' '; // Add space if hours were also added
        }
        durationString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    // Return formatted string or default to "0 minutes"
    return durationString || '0 minutes';
};

/**
 * Formats a date string to return the day of the week (e.g., "Wed").
 * @param {string} dateStr - The date string (YYYY-MM-DD).
 * @returns {string} - Formatted day of the week.
 */
export const getWeekday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" }); // "Wed"
  };
  
  /**
   * Formats a date string to return the day of the month (e.g., "23").
   * @param {string} dateStr - The date string (YYYY-MM-DD).
   * @returns {string} - Formatted day of the month.
   */
 export  const getDayOfMonth = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDate().toString(); // "23"
  };
  
  /**
 * Replaces all dashes in a string with spaces.
 * @param {string} str - The input string from which to replace dashes.
 * @returns {string} - The string with dashes replaced by spaces.
 */
export function replaceDashesWithSpaces(str) {
    return str.replace(/-/g, ' ');
  }

 export function formatDateWithSuffix(date) {
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const dayOfWeek = daysOfTheWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfTheYear[date.getMonth()];
    const year = date.getFullYear();
    
    // Function to get the appropriate suffix for the day of the month
    function getDaySuffix(n) {
      const suffixes = ["th", "st", "nd", "rd"];
      const v = n % 100; 
      return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }
    
    const formattedDay = getDaySuffix(dayOfMonth);
    
    return `${dayOfWeek} ${formattedDay} ${month} ${year}`;
  }

 export  function convertTo24HourFormat(time) {
    // Use a regular expression to match the time format
    const regex = /(\d{1,2}):(\d{2})\s*(AM|PM)/i;

    // Check if the input time matches the expected format
    const match = time.match(regex);
    if (!match) {
        throw new Error('Invalid time format. Please use "hh:mm AM/PM" format.');
    }

    let hours = parseInt(match[1], 10); // Extract the hours
    const minutes = match[2];            // Extract the minutes
    const period = match[3].toUpperCase(); // Extract AM/PM

    // Convert to 24-hour format
    if (period === 'PM' && hours < 12) {
        hours += 12; // Convert PM hours to 24-hour format
    } else if (period === 'AM' && hours === 12) {
        hours = 0;   // Convert 12 AM to 0 hours
    }

    // Format hours and minutes as two digits
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}

export function calculateExamDuration(startTime, endTime) {
    // Parse the start and end times to Date objects
    const startDate = new Date(`1970-01-01T${convertTo24Hour(startTime)}`);
    const endDate = new Date(`1970-01-01T${convertTo24Hour(endTime)}`);

    // Calculate the duration in milliseconds
    const durationInMillis = endDate - startDate;

    // If the duration is negative, return an error message
    if (durationInMillis < 0) {
        return 'End time must be after start time!';
    }

    // Calculate hours and minutes
    const totalMinutes = Math.floor(durationInMillis / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Create a readable string output
    let durationString = '';
    if (hours > 0) {
        durationString += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
        if (durationString) {
            durationString += ' ';
        }
        durationString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return durationString.trim() || '0 hours'; // In case of zero duration
}

// Utility function to convert 12-hour time to 24-hour format
function convertTo24Hour(time) {
    const [timePart, modifier] = time.split(' '); // Split time from AM/PM
    let [hours, minutes] = timePart.split(':').map(Number); // Split hours and minutes

    // Adjust hours based on AM/PM
    if (modifier === 'PM' && hours < 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    // Format to HH:mm
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function truncateText(text, maxLength) {
  if (typeof text !== 'string') {
    console.warn("truncateText: 'text' must be a string.");
    return { truncatedText: '', isTruncated: false };
  }
  if (typeof maxLength !== 'number' || maxLength <= 0) {
    console.warn("truncateText: 'maxLength' must be a positive number.");
    return { truncatedText: text, isTruncated: false };
  }

  // If the text is already shorter than or equal to the max length, no truncation needed
  if (text.length <= maxLength) {
    return {
      truncatedText: text,
      isTruncated: false,
    };
  }

  // Calculate the length for the actual text part, reserving space for "..."
  const ellipsis = '...';
  const textPartLength = maxLength - ellipsis.length;

  // Ensure textPartLength is not negative (e.g., if maxLength is very small)
  if (textPartLength <= 0) {
    return {
      truncatedText: ellipsis, // Just return ellipsis if maxLength is too small
      isTruncated: true,
    };
  }

  // Truncate the text and add the ellipsis
  const truncated = text.substring(0, textPartLength) + ellipsis;

  return {
    truncatedText: truncated,
    isTruncated: true,
  };
}


export function formatISODate(isoString, formatType) {
  try {
    const date = new Date(isoString);

    // Check if the date is valid.
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    switch (formatType) {
      case 'locale':
        // Use Intl.DateTimeFormat for a robust, locale-aware format.
        const localeFormatter = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        });
        return localeFormatter.format(date);

      case 'specific':
        // Helper function to add a leading zero if the number is less than 10.
        const pad = (num) => (num < 10 ? '0' : '') + num;

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // getMonth() is 0-indexed
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

      case 'custom':
      default: // Fallback to 'custom' format if formatType is invalid or not provided.
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const customDay = date.getDate();
        const customMonth = monthNames[date.getMonth()];
        const customYear = date.getFullYear();

        let customHours = date.getHours();
        const customMinutes = date.getMinutes();
        const ampm = customHours >= 12 ? 'PM' : 'AM';
        customHours = customHours % 12;
        customHours = customHours ? customHours : 12; // The hour '0' should be '12'
        const minutesPadded = customMinutes < 10 ? '0' + customMinutes : customMinutes;

        return `${customDay} ${customMonth} ${customYear}, ${customHours}:${minutesPadded} ${ampm}`;
    }
  } catch (error) {
    // Return a generic error message for any parsing issues.
    return `Error: ${error.message}`;
  }
}

export const formatISOTimeSince = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 0) {
      return 'in the future';
    }

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  } catch (error) {
    console.error("Invalid date string provided:", error);
    return 'Invalid date';
  }
};

export const areAllFieldsFilled = (obj) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value === null || value === undefined) {
        return false;
      }

      if (typeof value === 'string') {
        if (value.trim() === '') {
          return false;
        }
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          return false;
        }
      }
    }
  }
  return true; 
};


export function objectHasEmpty(obj, strict = false) {
  return Object.values(obj).some(value => {
    // null / undefined
    if (value == null) return true;

    // String
    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed === "" || (strict && trimmed === "0");
    }

    // Number
    if (typeof value === "number") {
      return strict ? value === 0 : false;
    }

    // Boolean
    if (typeof value === "boolean") {
      return strict ? value === false : false;
    }

    // BigInt
    if (typeof value === "bigint") {
      return strict ? value === 0n : false;
    }

    // Symbol — never considered "empty" unless strict mode and it's a specific placeholder
    if (typeof value === "symbol") {
      return false;
    }

    // Function — never considered empty unless strict mode and explicitly checking
    if (typeof value === "function") {
      return false;
    }

    // Array
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    // Plain object
    if (typeof value === "object") {
      return Object.keys(value).length === 0;
    }

    // Fallback
    return false;
  });
}

export function objectHasErrors(obj) {
  return Object.values(obj).some(value => {
    if (value == null) return false; 

    if (typeof value === "string") return value.trim().length > 0;

    if (Array.isArray(value)) return value.length > 0;

    if (typeof value === "object") return Object.keys(value).length > 0;

    return Boolean(value);
  });
}

export function allFieldsValid(obj) {
  return Object.values(obj).every(value => value === true);
}

export function optionalValidateObject(data) {
  const hasFalseValue = Object.values(data).some(value => value === false);
  if (hasFalseValue) {
    return false;
  }
  return true;
}

export function hasNonEmptyValue(data) {
  return Object.values(data).some(value => value !== null && value !== '' && typeof value !== 'undefined');
}

export function convertToMySQLTimeHHMM(timeStr) {
  // Remove AM/PM and trim whitespace
  const cleanStr = timeStr.replace(/\s*(AM|PM|am|pm)\s*/i, '').trim();

  // Determine if it's PM or AM
  const isPM = /pm/i.test(timeStr);
  const isAM = /am/i.test(timeStr);

  // Split into hours and minutes
  const [hourPart, minutePart = '00'] = cleanStr.split(':');

  let hours = parseInt(hourPart, 10);
  const minutes = parseInt(minutePart, 10);

  // Convert to 24-hour format
  if (isPM && hours < 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }

  // Format to HH:MM
  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');

  return `${hh}:${mm}`;
}
export function formatToMySQLDateTime(dateString, timeString) {
    const combinedDateTime = `${dateString} ${timeString}`;

    const dateObject = new Date(combinedDateTime);

    if (isNaN(dateObject.getTime())) {
        console.error("Invalid date or time string provided.");
        return "";
    }

    const mysqlDateTime = combinedDateTime.trim();

    return mysqlDateTime;
}