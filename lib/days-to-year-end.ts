export type DaysToYearEndResult = {
  daysRemaining: number;
  daysElapsed: number;
  totalDaysInYear: number;
  percentElapsed: number;
  percentRemaining: number;
  weekdaysRemaining: number;
  weekendsRemaining: number;
  weeksRemaining: number;
  monthsRemaining: number;
  currentDate: Date;
  yearEndDate: Date;
  currentYear: number;
};

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = niedziela, 6 = sobota
}

function countWeekdays(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);
  
  while (current <= endDate) {
    if (!isWeekend(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

function countWeekends(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);
  
  while (current <= endDate) {
    if (isWeekend(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

export function calculateDaysToYearEnd(inputDate?: Date): DaysToYearEndResult {
  const now = inputDate || new Date();
  const currentYear = now.getFullYear();
  
  // Ustaw na początek dnia (00:00:00)
  const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Koniec roku (31 grudnia, 23:59:59)
  const yearEndDate = new Date(currentYear, 11, 31, 23, 59, 59);
  
  // Początek roku
  const yearStartDate = new Date(currentYear, 0, 1);
  
  // Oblicz różnicę w dniach
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil((yearEndDate.getTime() - currentDate.getTime()) / msPerDay);
  const daysElapsed = Math.floor((currentDate.getTime() - yearStartDate.getTime()) / msPerDay);
  
  // Sprawdź czy rok przestępny
  const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
  const totalDaysInYear = isLeapYear ? 366 : 365;
  
  // Oblicz procenty
  const percentElapsed = (daysElapsed / totalDaysInYear) * 100;
  const percentRemaining = (daysRemaining / totalDaysInYear) * 100;
  
  // Oblicz dni robocze i weekendy pozostałe
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const weekdaysRemaining = countWeekdays(tomorrow, yearEndDate);
  const weekendsRemaining = countWeekends(tomorrow, yearEndDate);
  
  // Oblicz tygodnie
  const weeksRemaining = Math.floor(daysRemaining / 7);
  
  // Oblicz pełne miesiące pozostałe
  const currentMonth = now.getMonth();
  const monthsRemaining = 11 - currentMonth;
  
  return {
    daysRemaining,
    daysElapsed,
    totalDaysInYear,
    percentElapsed: Math.round(percentElapsed * 100) / 100,
    percentRemaining: Math.round(percentRemaining * 100) / 100,
    weekdaysRemaining,
    weekendsRemaining,
    weeksRemaining,
    monthsRemaining,
    currentDate,
    yearEndDate,
    currentYear,
  };
}

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function getDayName(date: Date): string {
  const days = [
    "niedziela",
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
  ];
  return days[date.getDay()];
}
