import { format } from "date-fns";
import {DATE_FORMATS} from '@/constants'

interface DateFormatterOptions {
  date?: string | Date | null;
  formatString?: string;
  defaultValue?: string;
}

export const formatDate = ({
  date,
  formatString = DATE_FORMATS.DATE,
  defaultValue = "",
}: DateFormatterOptions): string => {
  if (!date) return defaultValue;

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return defaultValue;
  }

  return format(parsedDate, formatString);
};