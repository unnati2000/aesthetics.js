"use client";

import { useEffect, useState, useRef } from "react";

import { Rnd } from "react-rnd";

import { useGesture } from "@use-gesture/react";

const MIN_MONTH_WIDTH = 25;
const MAX_MONTH_WIDTH = 60;
const INITIAL_MONTH_WIDTH = 50;
const INITIAL_DAY_WIDTH = 60;

const monthsAndDays = [
  {
    month: "January",
    days: 31,
  },
  {
    month: "February",
    days: 28,
  },
  {
    month: "March",
    days: 31,
  },
  {
    month: "April",
    days: 30,
  },
  {
    month: "May",
    days: 31,
  },
  {
    month: "June",
    days: 30,
  },
  {
    month: "July",
    days: 31,
  },
  {
    month: "August",
    days: 31,
  },
  {
    month: "September",
    days: 30,
  },
  {
    month: "October",
    days: 31,
  },
  {
    month: "November",
    days: 30,
  },
  {
    month: "December",
    days: 31,
  },
];

const steps = [
  {
    step: "year",
    showDays: false,
  },
  {
    step: "6 months",
    showDays: true,
    days: [1, 11, 21],
  },
  {
    step: "3 months",
    showDays: true,
    days: [1, 11, 21],
  },
  {
    step: "month",
    showDays: true,
    days: [1, 11, 21],
  },
  {
    step: "day",
    showDays: true,
    days: Array.from({ length: 31 }, (_, i) => i + 1),
  },
];

const startDate = new Date("2024-01-01");
const endDate = new Date("2025-05-31");
const initialCurrentDate = new Date("2024-05-01");

const Timeline = () => {
  // ... existing state and other functions ...

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [currentDate, setCurrentDate] = useState(startDate);
  const [x, setX] = useState(0);

  const [monthWidth, setMonthWidth] = useState(50);
  const [dayWidth, setDayWidth] = useState(30);

  const [dataToShow, setDataToShow] = useState<
    {
      month: string;
      days: number;
      showDays: boolean;
      year: number;
    }[]
  >([]);

  // const calculateCurrentDate = (needleX: number) => {
  //   const currentStep = steps[currentStepIndex];
  //   let tempDate = new Date(startDate);
  //   let totalWidth = 0;
  //   let monthIndex = 0;

  //   while (tempDate <= endDate && totalWidth <= needleX) {
  //     const daysInMonth = new Date(
  //       tempDate.getFullYear(),
  //       tempDate.getMonth() + 1,
  //       0
  //     ).getDate();
  //     let widthToAdd = 0;

  //     if (currentStep.step === "year") {
  //       widthToAdd = monthWidth;
  //     } else if (["6 months", "3 months", "month"].includes(currentStep.step)) {
  //       widthToAdd = monthWidth;
  //     } else {
  //       // day step
  //       widthToAdd = daysInMonth * dayWidth;
  //     }

  //     if (totalWidth + widthToAdd > needleX) {
  //       // The needle is within this month
  //       const daysIntoMonth = Math.floor(
  //         (needleX - totalWidth) / (widthToAdd / daysInMonth)
  //       );
  //       tempDate.setDate(tempDate.getDate() + daysIntoMonth);
  //       break;
  //     }

  //     totalWidth += widthToAdd;
  //     tempDate.setMonth(tempDate.getMonth() + 1);
  //     monthIndex++;

  //     if (currentStep.step === "year" && monthIndex % 12 === 0) {
  //       tempDate.setFullYear(tempDate.getFullYear() + 1);
  //     }
  //   }

  //   // Ensure the date doesn't go beyond the end date
  //   if (tempDate > endDate) {
  //     tempDate = new Date(endDate);
  //   } else if (tempDate < startDate) {
  //     tempDate = new Date(startDate);
  //   }

  //   setCurrentDate(tempDate);
  //   return tempDate;
  // };

  const calculateDateForYearView = (needleX: number) => {
    const containerWidth = timelineRef.current?.clientWidth || 0;
    const totalDays = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
    const pixelsPerDay = containerWidth / totalDays;

    const daysPassed = Math.floor(needleX / pixelsPerDay);
    let tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() + daysPassed);

    // Ensure the date doesn't go beyond the end date or before the start date
    if (tempDate > endDate) {
      tempDate = new Date(endDate);
    } else if (tempDate < startDate) {
      tempDate = new Date(startDate);
    }

    setCurrentDate(tempDate);
    return tempDate;
  };

  const calculateDateForMonthViews = (needleX: number) => {
    const containerWidth = timelineRef.current?.scrollWidth || 0;
    const totalMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    let monthsToShow = totalMonths;
    if (steps[currentStepIndex].step === "6 months") {
      monthsToShow = Math.ceil(totalMonths / 6) * 6;
    } else if (steps[currentStepIndex].step === "3 months") {
      monthsToShow = Math.ceil(totalMonths / 3) * 3;
    }

    const pixelsPerMonth = containerWidth / monthsToShow;

    const monthsPassed = Math.floor(needleX / pixelsPerMonth);
    let tempDate = new Date(startDate);
    tempDate.setMonth(tempDate.getMonth() + monthsPassed);

    // Adjust for day of month
    const daysInMonth = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth() + 1,
      0
    ).getDate();
    const dayPosition = (needleX % pixelsPerMonth) / pixelsPerMonth;
    const dayOfMonth = Math.floor(dayPosition * daysInMonth) + 1;
    tempDate.setDate(dayOfMonth);

    // Ensure the date doesn't go beyond the end date or before the start date
    if (tempDate > endDate) {
      tempDate = new Date(endDate);
    } else if (tempDate < startDate) {
      tempDate = new Date(startDate);
    }

    setCurrentDate(tempDate);
    return tempDate;
  };

  const calculateDateForDayView = (needleX: number) => {
    const containerWidth = timelineRef.current?.scrollWidth || 0;
    const totalDays = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
    const pixelsPerDay = containerWidth / totalDays;

    const daysPassed = Math.floor(needleX / pixelsPerDay);
    let tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() + daysPassed + 1);

    // Adjust for time of day
    const dayFraction = (needleX % pixelsPerDay) / pixelsPerDay;
    const hoursInDay = Math.floor(dayFraction * 24);
    const minutesInHour = Math.floor((dayFraction * 24 - hoursInDay) * 60);
    tempDate.setHours(hoursInDay, minutesInHour);

    // Ensure the date doesn't go beyond the end date or before the start date
    if (tempDate > endDate) {
      tempDate = new Date(endDate);
    } else if (tempDate < startDate) {
      tempDate = new Date(startDate);
    }

    setCurrentDate(tempDate);
    return tempDate;
  };

  const calculateCurrentDate = (needleX: number) => {
    if (steps[currentStepIndex].step === "year") {
      calculateDateForYearView(needleX);
    } else if (
      ["6 months", "3 months", "month"].includes(steps[currentStepIndex].step)
    ) {
      calculateDateForMonthViews(needleX);
    } else if (steps[currentStepIndex].step === "day") {
      calculateDateForDayView(needleX);
    }
  };

  useEffect(() => {
    const generateTimelineData = () => {
      let currentDate = new Date(startDate);
      const data = [];

      while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        data.push({
          month: monthsAndDays[month].month,
          days: daysInMonth,
          showDays: steps[currentStepIndex].showDays,
          year: year,
        });

        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      return data;
    };

    const allData = generateTimelineData();

    if (steps[currentStepIndex].step === "year") {
      setDataToShow(allData.filter((_, i) => i % 3 === 0));
    } else if (steps[currentStepIndex].step === "6 months") {
      setDataToShow(allData.filter((_, i) => i % 2 === 0));
    } else {
      setDataToShow(allData);
    }
  }, [currentStepIndex]);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("touchstart", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventDefault);
      document.removeEventListener("touchstart", preventDefault);
    };
  }, []);

  const calculateXFromDate = (
    date: Date,
    monthWidth: number,
    dayWidth: number
  ) => {
    const daysDiff = Math.floor(
      (date.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
    const currentStep = steps[currentStepIndex];
    let newX = 0;

    if (currentStep.step === "year") {
      newX = (daysDiff / 365) * monthWidth * 12;
    } else if (["6 months", "3 months", "month"].includes(currentStep.step)) {
      newX = (daysDiff / 30) * monthWidth;
    } else {
      // day step
      newX = daysDiff * dayWidth;
    }

    return newX;
  };

  const handlePinch = (delta: number) => {
    const newMonthWidth = Math.min(
      Math.max(monthWidth * delta, MIN_MONTH_WIDTH),
      MAX_MONTH_WIDTH
    );

    const newDayWidth = dayWidth * (newMonthWidth / monthWidth);

    // Calculate the new X position based on the current date and new zoom level
    setMonthWidth(newMonthWidth);
    setDayWidth(newDayWidth);

    if (
      newMonthWidth >= MAX_MONTH_WIDTH &&
      currentStepIndex < steps.length - 1
    ) {
      setCurrentStepIndex(currentStepIndex + 1);
      setMonthWidth(INITIAL_MONTH_WIDTH);
      setDayWidth(INITIAL_DAY_WIDTH);
    } else if (newMonthWidth <= MIN_MONTH_WIDTH && currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setMonthWidth(INITIAL_MONTH_WIDTH);
      setDayWidth(INITIAL_DAY_WIDTH);
    }

    const newX = calculateXFromDate(currentDate, newMonthWidth, newDayWidth);
    setX(newX);
  };

  const bind = useGesture(
    {
      onPinch: ({ event, offset: [d], movement: [md], memo }) => {
        if (event instanceof TouchEvent) {
          event.preventDefault();
        }
        handlePinch(d);
      },
    },
    {
      eventOptions: { passive: false },
    }
  );

  return (
    <div className="bg-zinc-900 gap-4 px-4 h-screen flex flex-col items-center justify-center">
      <p className="text-zinc-400 text-2xl">
        {currentDate.toLocaleDateString()}
      </p>
      <div
        {...bind()}
        ref={timelineRef}
        style={{
          touchAction: "none",
        }}
        className="border relative p-4 min-h-72 border-zinc-700 rounded-xl shadow-lg bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-auto h-36 flex items-start justify-between text-zinc-400 w-full"
      >
        <Rnd
          position={{
            x: x,
            y: 64,
          }}
          size={{
            height: "90%",
            width: "10px",
          }}
          onDrag={(e, d) => {
            setX(d.x);
            calculateCurrentDate(d.x);
          }}
          enableResizing={false}
          dragAxis="x"
        >
          <Needle />
        </Rnd>
        {dataToShow.map((item, index) => {
          return (
            <div
              key={`${item.year}-${item.month}`}
              className="flex flex-col px-4 items-center gap-4 justify-center"
            >
              <div
                style={{
                  width: `${monthWidth}px`,
                }}
                className="justify-center text-zinc-500 transition-all duration-300 ease-in-out flex items-center gap-2 overflow-visible"
              >
                <p className="text-md">{item.month.slice(0, 3)}</p>
                <p className="text-zinc-500">{item.year}</p>
              </div>
              {item.showDays && (
                <div className="flex">
                  {monthsAndDays.find((m) => m.month === item.month)?.days &&
                    Array.from(
                      {
                        length: monthsAndDays.find(
                          (m) => m.month === item.month
                        )!.days,
                      },
                      (_, i) => i + 1
                    ).map((day) => (
                      <div
                        style={{
                          width: `${dayWidth}px`,
                        }}
                        className="flex items-center border-t relative pt-4 border-zinc-600 justify-center w-32"
                        key={`${item.year}-${item.month}-${day}`}
                      >
                        <div className="absolute left-1/2 border-l border-zinc-600 top-0 h-2 rounded-bl-md rounded-br-md" />
                        {day}
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Needle = () => {
  return (
    <div className="h-full flex items-center flex-col">
      <svg
        fill="#4e4d4d"
        height="20px"
        width="20px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 511.509 511.509"
        xmlSpace="preserve"
        transform="rotate(180)"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <path d="M498.675,493.845L265.16,5.568c-3.541-7.424-15.701-7.424-19.243,0L11.251,496.235c-1.579,3.307-1.344,7.189,0.597,10.283 s5.355,4.992,9.024,4.992h469.76c5.888,0,10.667-4.779,10.667-10.667C501.299,498.176,500.317,495.723,498.675,493.845z"></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
      <div className="w-[2px] bg-zinc-600 h-full rounded-bl-md rounded-br-md" />
    </div>
  );
};

export default Timeline;

