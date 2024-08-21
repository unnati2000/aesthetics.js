"use client";

import { useEffect, useState, useRef } from "react";

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
    showDays: false,
  },
  {
    step: "month",
    showDays: true,
  },
  {
    step: "day",
    showDays: true,
  },
];

const Timeline = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [monthWidth, setMonthWidth] = useState(50);
  const [dayWidth, setDayWidth] = useState(30);

  //   const handlePinch = (delta: number) => {
  //     const newScale = scale * (1 + delta / 100);
  //     setScale(newScale);

  //     const newMonthWidth = monthWidth * newScale;
  //     const newDayWidth = dayWidth * newScale;

  //     setMonthWidth(newMonthWidth);
  //     setDayWidth(newDayWidth);

  //     if (newMonthWidth > 200 && currentStepIndex < steps.length - 1) {
  //       setCurrentStepIndex(currentStepIndex + 1);
  //       setScale(1);
  //       setMonthWidth(50);
  //       setDayWidth(30);
  //     } else if (newMonthWidth < 25 && currentStepIndex > 0) {
  //       setCurrentStepIndex(currentStepIndex - 1);
  //       setScale(1);
  //       setMonthWidth(50);
  //       setDayWidth(30);
  //     }
  //   };

  const handlePinch = (delta: number) => {
    const newMonthWidth = Math.min(
      Math.max(monthWidth * (1 + delta / 100), MIN_MONTH_WIDTH),
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

  const [dataToShow, setDataToShow] = useState<
    {
      month: string;
      days: number;
      showDays: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (steps[currentStepIndex].step === "year") {
      const data = monthsAndDays
        .filter((_, i) => i % 3 === 0)
        .map((month) => ({
          month: month.month,
          days: month.days,
          showDays: steps[currentStepIndex].showDays,
        }));
      setDataToShow(data);
    } else if (steps[currentStepIndex].step === "6 months") {
      const data = monthsAndDays
        .filter((_, i) => i % 2 === 0)
        .map((month) => ({
          month: month.month,
          days: month.days,
          showDays: steps[currentStepIndex].showDays,
        }));
      setDataToShow(data);
    } else if (steps[currentStepIndex].step === "month") {
      const data = monthsAndDays.map((month) => ({
        month: month.month,
        days: month.days,
        showDays: steps[currentStepIndex].showDays,
      }));
      setDataToShow(data);
    } else if (steps[currentStepIndex].step === "day") {
      const data = monthsAndDays.map((month) => ({
        month: month.month,
        days: month.days,
        showDays: steps[currentStepIndex].showDays,
      }));
      setDataToShow(data);
    }
  }, [currentStepIndex]);

  const bind = useGesture({
    onPinch: ({ offset: [d], movement: [md], memo }) => {
      handlePinch(d);
    },
  });

  return (
    <div className="bg-zinc-900 h-screen flex flex-col items-center justify-center">
      <div
        {...bind()}
        ref={timelineRef}
        style={{
          touchAction: "none",
        }}
        className="border overflow-auto h-36 flex items-start justify-evenly text-zinc-400 w-full"
      >
        {dataToShow.map((item) => {
          return (
            <div
              key={item.month}
              className="flex flex-col items-center justify-center"
            >
              <div
                style={{
                  width: `${monthWidth}px`,
                }}
                className="border w-32"
                key={item.month}
              >
                {item.month}
              </div>
              {item.showDays && (
                <div className="flex">
                  {[...Array(item.days)].map((_, i) => (
                    <div
                      style={{
                        width: `${dayWidth}px`,
                      }}
                      className="border w-32"
                      key={i}
                    >
                      {i}
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

export default Timeline;

