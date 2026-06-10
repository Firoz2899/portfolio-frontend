import {
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
}: OtpInputProps) {
  const inputsRef =
    useRef<(HTMLInputElement | null)[]>([]);

  const otpArray = Array.from(
    { length },
    (_, i) => value[i] ?? ""
  );

  const handleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const digit =
      e.target.value.replace(/\D/g, "");

    if (!digit) return;

    const newOtp = [...otpArray];
    newOtp[index] = digit[0];

    onChange(newOtp.join(""));

    if (
      index < length - 1 &&
      inputsRef.current[index + 1]
    ) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace"
    ) {
      const newOtp = [...otpArray];

      if (newOtp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputsRef.current[index - 1]?.focus();
      }

      onChange(newOtp.join(""));
    }
  };

  const handlePaste = (
    e: ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pasted =
      e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length);

    if (!pasted) return;

    onChange(pasted);

    const focusIndex =
      Math.min(
        pasted.length,
        length - 1
      );

    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {otpArray.map((digit, index) => (
        <input
          aria-label={`otp input ${index}`}
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={digit}
          maxLength={1}
          inputMode="numeric"
          onPaste={handlePaste}
          onKeyDown={(e) =>
            handleKeyDown(index, e)
          }
          onChange={(e) =>
            handleChange(index, e)
          }
          className="
            h-14
            w-14
            rounded-xl
            border-2
            border-gray-200
            text-center
            text-xl
            font-bold
            transition-all
            duration-200
            focus:border-teal-500
            focus:ring-4
            focus:ring-teal-100
            focus:outline-none
          "
        />
      ))}
    </div>
  );
}