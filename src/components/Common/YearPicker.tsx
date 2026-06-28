import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
type YearPickerTheme = "light" | "dark";

interface YearPickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  yearsPerPage?: number;
  theme?: YearPickerTheme;
}

export default function YearPicker({
  value,
  onChange,
  placeholder = "Select Year",
  className = "",
  yearsPerPage = 16,
  theme = "light"
}: YearPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedYear = useMemo(() => {
    if (!value) return undefined;

    const date = new Date(value);

    if (!isNaN(date.getTime())) {
      return date.getFullYear();
    }

    const year = Number(value);

    return Number.isNaN(year) ? undefined : year;
  }, [value]);

  const getPageStart = (year: number) =>
    year - (year % yearsPerPage);

  const [open, setOpen] = useState(false);

  const [startYear, setStartYear] = useState(
    selectedYear
      ? getPageStart(selectedYear)
      : getPageStart(new Date().getFullYear())
  );

  useEffect(() => {
    if (!open) return;

    if (selectedYear) {
      setStartYear(getPageStart(selectedYear));
    } else {
        setStartYear(getPageStart(new Date().getFullYear()));
    }
  }, [open, selectedYear]);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", listener);

    return () =>
      document.removeEventListener("mousedown", listener);
  }, []);

  const years = useMemo(
    () =>
      Array.from(
        { length: yearsPerPage },
        (_, i) => startYear + i
      ),
    [startYear, yearsPerPage]
  );

  const isDark = theme === "dark";
  const styles = {
    popup: isDark
        ? "bg-gray-800 border-gray-700 text-gray-100 shadow-2xl"
        : "bg-white border-gray-200 text-gray-900 shadow-xl",

    headerBorder: isDark
        ? "border-gray-700"
        : "border-gray-200",

    navButton: isDark
        ? "hover:bg-gray-700"
        : "hover:bg-gray-100",

    yearButton: isDark
        ? "hover:bg-gray-700"
        : "hover:bg-gray-100",

    activeYear:
        "bg-teal-600 text-white",

    clearButton: isDark
        ? "text-red-400 hover:text-red-300"
        : "text-red-500 hover:text-red-700",

    placeholder: isDark
        ? "text-gray-500"
        : "text-gray-400",

    icon: isDark
        ? "text-gray-400"
        : "text-gray-500",
  };

  const displayValue = useMemo(() => {
    if (!value) return "";

    const date = new Date(value);

    if (!isNaN(date.getTime())) {
      return date.getFullYear().toString();
    }

    return value;
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      <button
        type="button"
        onClick={(e) => {
            e.preventDefault();
            setOpen((x) => !x)
        }}
        className={`w-full px-3 py-2 border rounded-lg flex items-center justify-between ${className}`}
      >
        <span className={value ? "" : styles.placeholder}>
          {displayValue || placeholder}
        </span>

        <FaCalendarAlt className={styles.icon} />
      </button>

      {open && (
        <div className={`absolute left-0 mt-2 w-80 rounded-xl border z-50 overflow-hidden ${styles.popup}`}>

          {/* Header */}
          <div className={`flex items-center justify-between p-3 border-b ${styles.headerBorder}`}>

            <button
              aria-label="left range"
              type="button"
              onClick={(e) =>{
                e.preventDefault();
                setStartYear((y) => y - yearsPerPage)
              }}
              className={`p-2 rounded cursor-pointer transition-colors ${styles.navButton}`}
            >
              <FaChevronLeft />
            </button>

            <div className="text-sm font-semibold">
              {startYear} - {startYear + yearsPerPage - 1}
            </div>

            <div className="flex items-center gap-2">

              {value && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onChange("");
                    setOpen(false);
                  }}
                  className={`text-xs cursor-pointer transition-colors ${styles.clearButton}`}
                >
                  Clear
                </button>
              )}

              <button
                aria-label="right range"
                type="button"
                onClick={(e) =>{
                    e.preventDefault();
                    setStartYear((y) => y + yearsPerPage)
                }}
                className={`p-2 rounded cursor-pointer transition-colors ${styles.navButton}`}
              >
                <FaChevronRight />
              </button>

            </div>

          </div>

          {/* Years */}
          <div className="grid grid-cols-4 gap-2 p-3">

            {years.map((year) => {
              const active = displayValue === year.toString();

              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => {

                    // Clicking selected year clears it
                    if (active) {
                      onChange("");
                    } else {
                      onChange(`${year.toString()}-01-01T00:00:00.000Z`);
                    }

                    setOpen(false);
                  }}
                  className={`
                    rounded-lg py-2 text-sm transition-all cursor-pointer

                    ${
                      active
                        ? styles.activeYear
                        : styles.yearButton
                    }
                  `}
                >
                  {year}
                </button>
              );
            })}

          </div>
        </div>
      )}
    </div>
  );
}