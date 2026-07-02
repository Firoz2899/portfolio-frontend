import { useEffect, useRef, useState } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";

interface ImageUploadProps {
    value?: File | string | null;
    onChange: (file: File | null) => void;
    accept?: string;
    shape?: "circle" | "rounded" | "square";
    size?: number;
    disabled?: boolean;
    className?: string;
}

export default function ImageUpload({
    value,
    onChange,
    accept = "image/*",
    shape = "circle",
    size = 140,
    disabled = false,
    className = "",
}: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!value) {
            setPreview(null);
            return;
        }

        if (typeof value === "string") {
            setPreview(value);
            return;
        }

        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [value]);

    const chooseImage = () => {
        if (!disabled) inputRef.current?.click();
    };

    const handleChange = (file?: File) => {
        onChange(file ?? null);
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onChange(null);
    };

    const shapeClass = {
        circle: "rounded-full",
        rounded: "rounded-xl",
        square: "rounded-none",
    };

    return (
        <div className={className}>
            <div
                style={{ width: size, height: size }}
                className={`relative overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100 cursor-pointer group ${shapeClass[shape]}`}
                onClick={chooseImage}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    handleChange(e.dataTransfer.files?.[0]);
                }}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <FaCamera
                            size={30}
                            className="text-gray-400"
                        />
                    </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <FaCamera className="text-white opacity-0 group-hover:opacity-100" />
                </div>

                {preview && (
                    <button
                        aria-label="remove image"
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                    >
                        <FaTrash size={12} />
                    </button>
                )}
            </div>

            <input
                ref={inputRef}
                hidden
                type="file"
                accept={accept}
                disabled={disabled}
                onChange={(e) => handleChange(e.target.files?.[0])}
            />
        </div>
    );
}