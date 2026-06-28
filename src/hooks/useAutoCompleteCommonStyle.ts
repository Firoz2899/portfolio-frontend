import { useThemeMode } from "./useThemeMode";

export function useAutoCompleteCommonStyle() {

    const {isDarkMode} = useThemeMode()
  
  const autoCompleteSX = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.5rem",
      paddingLeft: "2rem",
      backgroundColor: isDarkMode ? "#374151" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#111827",

      "& fieldset": {
        borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
      },

      "&:hover fieldset": {
        borderColor: "#6366f1",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#6366f1",
        borderWidth: "2px",
      },
    },

    "& .MuiInputBase-input": {
      color: isDarkMode ? "#ffffff" : "#111827",
    },

    "& .MuiSvgIcon-root": {
      color: isDarkMode ? "#9ca3af" : "#6b7280",
    },
  };

  const autoCompletePaperSX = {
    bgcolor: isDarkMode ? "#374151" : "#ffffff",
    color: isDarkMode ? "#f3f4f6" : "#111827",

    "& .MuiAutocomplete-option": {
      color: isDarkMode ? "#f3f4f6" : "#111827",
    },

    "& .MuiAutocomplete-option:hover": {
      backgroundColor: isDarkMode ? "#4b5563" : "#f3f4f6",
    },

    "& .MuiAutocomplete-option[aria-selected='true']": {
      backgroundColor: isDarkMode ? "#1d4ed8" : "#dbeafe",
      color: "#fff",
    },

    "& .MuiAutocomplete-option.Mui-focused": {
      backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb",
    },
  }

  return {
    autoCompleteSX,
    autoCompletePaperSX
  }
}
