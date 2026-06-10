import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    useVerifyEmailMutation,
    useResendEmailOtpMutation,
    executeMutation,
} from "@/services";

import { useAlert, OtpInput } from "@/components/Common";
import { RouteNames } from "@/constants";
import { getRoute } from "@/utils/route.helpers";

interface VerifyOtpModalProps {
    open: boolean;
    email: string;
    onClose: () => void;
}

export function VerifyOtpModal({
    open,
    email,
    onClose,
}: VerifyOtpModalProps) {

    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(60);
    const [verifyEmailApi, verifyState] = useVerifyEmailMutation();
    const [resendOtpApi, resendState] = useResendEmailOtpMutation();
    const { showAlert } = useAlert();

    useEffect(() => {
        if (!open) return;
        setOtp("");
        setTimer(60);
    }, [open]);

    useEffect(() => {
        if (!open || timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [open, timer]);

    const handleVerify = async () => {
        const res = await executeMutation(verifyEmailApi({
            Email: email,
            OTP: otp,
        }).unwrap());

        showAlert({
            type: res.IsSuccess
                ? "success"
                : "error",
            message: res.Message,
        });

        if (!res.IsSuccess) return;

        const navigateTo = getRoute(RouteNames.auth.SignIn)?.path ?? "";
        setTimeout(() => {
            navigate(navigateTo, { replace: true });
        }, 1500);
    };

    const handleResendOtp = async () => {
        const res = await executeMutation(resendOtpApi({
            Email: email,
        }).unwrap());

        showAlert({
            type: res.IsSuccess
                ? "success"
                : "error",
            message: res.Message,
        });

        if (!res.IsSuccess) return;

        setTimer(60);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

                {/* Close Button */}
                <button
                    aria-label="close button"
                    onClick={onClose}
                    className="absolute right-5 top-5 text-gray-400 transition hover:text-gray-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-teal-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m0 4h.01M5.93 19h12.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L4.2 16c-.77 1.33.19 3 1.73 3z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">
                        Verify Your Email
                    </h2>

                    <p className="mt-3 text-sm text-gray-500">
                        We've sent a verification code to
                    </p>

                    <p className="mt-1 font-semibold text-teal-600">
                        {email}
                    </p>
                </div>

                {/* OTP Inputs */}
                <div className="mt-8 flex justify-center gap-3">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                    />
                </div>

                {/* Verify Button */}
                <button
                    disabled={otp.length !== 6 || verifyState.isLoading}
                    onClick={handleVerify}
                    className="mt-8 w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 py-4 font-semibold text-white shadow-lg transition duration-200 hover:from-teal-600 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {verifyState.isLoading
                        ? "Verifying..."
                        : "Verify OTP"}
                </button>

                {/* Resend */}
                <div className="mt-5 text-center">
                    {timer > 0 ? (
                        <span className="text-sm text-gray-500">
                            Resend code in{" "}
                            <span className="font-semibold text-teal-600">
                                {timer}s
                            </span>
                        </span>
                    ) : (
                        <button
                            disabled={resendState.isLoading}
                            onClick={handleResendOtp}
                            className="text-sm font-semibold text-teal-600 transition hover:text-teal-700"
                        >
                            {resendState.isLoading
                                ? "Sending..."
                                : "Resend OTP"}
                        </button>
                    )}
                </div>

                {/* Footer Note */}
                <div className="mt-6 rounded-xl bg-gray-50 p-4">
                    <p className="text-center text-xs text-gray-500">
                        For your security, this verification code
                        will expire in 10 minutes.
                    </p>
                </div>
            </div>
        </div>
    )
}