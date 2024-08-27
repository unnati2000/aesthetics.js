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

  const calculateCurrentDate = (needleX: number) => {
    let totalDays = 0;
    const currentStep = steps[currentStepIndex];

    if (currentStep.step === "year") {
      totalDays = Math.floor(needleX / monthWidth) * 30; // Approximate
    } else if (
      currentStep.step === "6 months" ||
      currentStep.step === "3 months" ||
      currentStep.step === "month"
    ) {
      totalDays =
        Math.floor(needleX / monthWidth) * 30 +
        Math.floor((needleX % monthWidth) / dayWidth) * 10; // Approximate
    } else {
      // day step
      totalDays = Math.floor(needleX / dayWidth);
    }

    let tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() + totalDays);
    setCurrentDate(tempDate);
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
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  const handlePinch = (delta: number) => {
    const newMonthWidth = Math.min(
      Math.max(monthWidth * delta, MIN_MONTH_WIDTH),
      MAX_MONTH_WIDTH
    );
    const newDayWidth = dayWidth * (newMonthWidth / monthWidth);

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
  };

  const bind = useGesture(
    {
      onPinch: ({ offset: [d], movement: [md], memo }) => {
        handlePinch(d);
      },
    },
    {
      eventOptions: { passive: false },
    }
  );

  return (
    <div className="bg-zinc-900  px-4 h-screen flex flex-col items-center justify-center">
      <div
        {...bind()}
        ref={timelineRef}
        style={{
          touchAction: "none",
        }}
        className="border relative p-4 min-h-72 border-zinc-700 rounded-xl shadow-lg bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-auto h-36 flex items-start justify-evenly text-zinc-400 w-full"
      >
        <Rnd
          bounds={"parent"}
          position={{
            x: x,
            y: 60,
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
              className="flex flex-col items-center gap-4 justify-center"
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
                  {steps[currentStepIndex]?.days?.map((day) => (
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
    <div className="w-[2px] bg-zinc-600 h-full rounded-bl-md rounded-br-md" />
  );
};

export default Timeline;
