import { useState, useEffect, useRef } from "react";
import { 
  Button, 
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Input
} from "@/components/Common";
import {toast} from "sonner";
import { Upload, Image as ImageIcon, Crop, Minus, Plus } from "lucide-react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

interface UploadImagesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  currentImages: string[];
  multiple?: boolean;
  cropAspect?: number;
  cropShape?: "rect" | "round";
  onSave: (
    images: ImageItem[]
  ) => Promise<void> | void;
}

async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });
}

async function getCroppedImage(imageSrc: string, pixelCrop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL("image/jpeg", 0.92);
}

interface ImageItem {
  url: string;
  file?: File; // If file exists, it's a pending upload
  isExisting: boolean; // Whether it's an existing image or new
}

export function UploadImageDialog({
  open,
  onOpenChange,
  title = "Upload Image",
  currentImages = [],
  multiple = false,
  cropAspect = 1,
  cropShape = "rect",
  onSave,
}: UploadImagesDialogProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [cropFileName, setCropFileName] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [pendingCropFiles, setPendingCropFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when dialog opens/closes or currentImages changes
  useEffect(() => {
    if (open) {
      // Initialize with existing images
      const existingImages: ImageItem[] = (currentImages || []).map((url) => ({
        url,
        isExisting: true,
      }));
      setImages(existingImages);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setShowCropDialog(false);
      setCropImage(null);
      setCropFileName("");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setPendingCropFiles([]);
    }
  }, [open, currentImages]);

  const openCropForFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) {
        toast.error("Unable to read image file");
        return;
      }
      setCropImage(event.target.result as string);
      setCropFileName(file.name);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setShowCropDialog(true);
    };
    reader.onerror = () => {
      toast.error("Failed to load image for cropping");
    };
    reader.readAsDataURL(file);
  };

  const processFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (imageFiles.length === 0) {
      toast.error("Please select image files only");
      return;
    }

    setPendingCropFiles(imageFiles.slice(1));
    openCropForFile(imageFiles[0]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files) {
      await processFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files) {
      await processFiles(files);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsUploading(true);

    try {
        await onSave(images);
        onOpenChange(false);
    } catch (error) {
        console.error(error);
        toast.error("Failed to save images");
    } finally {
        setIsUploading(false);
    }
    // // Get pending files (new images that need to be uploaded)
    // const pendingFiles = images.filter((img) => img.file && !img.isExisting);

    // if (pendingFiles.length === 0) {
    //   // No new files to upload, just save existing images
    //   onSave(images);
    //   onOpenChange(false);
    //   return;
    // }

    // setIsUploading(true);
    // try {

    //   const filesToUpload = pendingFiles.map((img) => img.file!);

    //   // Compress files + convert to base64 for metadata (avoids 500 on large images)
    //   const base64Files = await Promise.all(
    //     filesToUpload.map(async (file) => {
    //       const dataUrl = await fileToCompressedDataUrl(file, 1920, 0.85);
    //       const blob = await (await fetch(dataUrl)).blob();
    //       const compressedFile = new File([blob], file.name, {
    //         type: blob.type || "image/jpeg",
    //       });
    //       return { base64: dataUrl, file: compressedFile };
    //     }),
    //   );

    //   // Build metadata array
    //   const existingCount = images.filter((img) => img.isExisting).length;
    //   const metadata = base64Files.map(({ base64, file }, idx) => {
    //     const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    //     const displayOrder = existingCount + idx + 1;
    //     return {
    //       DisplayOrder: displayOrder,
    //       FileExtension: extension,
    //       url: base64.split(",")[1] || base64
          
    //     };
    //   });


    // } catch (error) {
    //   console.error("Error uploading files:", error);
    //   toast.error("Failed to upload images. Please try again.");
    // } 
  };

  const handleCancel = () => {
    // Reset to original images
    const existingImages: ImageItem[] = (currentImages || []).map((url) => ({
      url,
      isExisting: true,
    }));
    setImages(existingImages);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onOpenChange(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCropCancel = () => {
    setShowCropDialog(false);
    setCropImage(null);
    setCropFileName("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setPendingCropFiles([]);
  };

  const handleCropSave = async () => {
    if (!cropImage || !croppedAreaPixels) {
      toast.error("Please adjust the crop area before continuing");
      return;
    }

    try {
      const croppedDataUrl = await getCroppedImage(
        cropImage,
        croppedAreaPixels,
      );
      const blob = await (await fetch(croppedDataUrl)).blob();
      const extension = cropFileName.split(".").pop()?.toLowerCase() || "jpg";
      const baseName = cropFileName.includes(".")
        ? cropFileName.replace(/\.[^.]+$/, "")
        : cropFileName || `project-image-${Date.now()}`;
      const croppedFile = new File([blob], `${baseName}-cropped.${extension}`, {
        type: blob.type || "image/jpeg",
      });

      const newImage = {
          url: croppedDataUrl,
          file: croppedFile,
          isExisting: false,
        };

        setImages((prev) =>  multiple
            ? [...prev, newImage]
            : [newImage]
        );

      const [nextFile, ...restFiles] = pendingCropFiles;
      if (nextFile) {
        setPendingCropFiles(restFiles);
        openCropForFile(nextFile);
      } else {
        setShowCropDialog(false);
        setCropImage(null);
        setCropFileName("");
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
      }
    } catch (error) {
      console.error("Error cropping project image:", error);
      toast.error("Failed to crop image. Please try again.");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Upload Images - {title}
            </DialogTitle>
            <DialogDescription className="text-sm">
              Add or remove images for this project
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Upload from PC */}
            <div className="space-y-2">
              <Label variant="inline">{title}</Label>
              <input
                aria-label="file input"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleFileSelect}
                className="hidden"
              />
              <div
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50 bg-muted/30"
                }`}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB {multiple ? "(multiple files supported)" : ""}
                </p>
                {isUploading && (
                  <p className="text-xs text-primary mt-2">
                    Uploading images...
                  </p>
                )}
              </div>
            </div>

            {/* Preview Images */}
            {images.length > 0 ? (
                multiple ? (
                    <div className="space-y-3">
                    <Label variant="inline">{title} Images ({images.length})</Label>

                    <Carousel className="w-full">
                        <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem key={index}>
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/30 border">
                                <img
                                src={image.url}
                                alt={`${title} - Image ${index + 1}`}
                                className="w-full h-full object-cover"
                                />
                            </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>

                        {images.length > 1 && (
                        <>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </>
                        )}
                    </Carousel>

                    <div className="space-y-2">
                        <Label variant="inline">Images ({images.length})</Label>

                        <div className="space-y-2 max-h-40 overflow-y-auto">
                        {images.map((image, index) => (
                            <div
                            key={index}
                            className="flex items-center gap-2 p-2 border rounded-lg"
                            >
                            <ImageIcon className="w-4 h-4 shrink-0" />

                            <Input
                                value={
                                image.isExisting
                                    ? `Image ${index + 1} (existing)`
                                    : `Image ${index + 1} (pending upload)`
                                }
                                readOnly
                            />
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <Label variant="inline">{title}</Label>

                        <div className="relative w-full flex justify-center">
                            <img
                                src={images[0].url}
                                alt={title}
                                className="h-40 w-40 rounded-lg border object-cover"
                            />
                        </div>
                    </div>
                )
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No images added yet. Upload images from your PC above.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isUploading}
              className="bg-purple hover:bg-purple-500"
            >
              {isUploading ? "Uploading..." : "Save Images"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-[700px] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple flex items-center justify-center">
                <Crop className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-sm sm:text-base">Crop {title}</span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Adjust the crop area to fit a 8:5 frame before uploading.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
            <div className="relative h-[250px] sm:h-[350px] md:h-[400px] bg-gray-900 rounded-lg overflow-hidden">
              {cropImage && (
                <Cropper
                  image={cropImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={cropAspect}
                  cropShape={cropShape}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_croppedArea: Area, croppedPixels: Area) =>
                    setCroppedAreaPixels(croppedPixels)
                  }
                  showGrid
                />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <Label variant="inline" htmlFor="project-zoom" className="text-xs sm:text-sm">
                  Zoom
                </Label>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  {Math.round((zoom - 1) * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  aria-label="zoom out"
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-200 text-muted-foreground"
                  onClick={() =>
                    setZoom((prev) => Math.max(1, Math.min(3, prev - 0.1)))
                  }
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <input
                  aria-label="zoom range"
                  id="project-zoom"
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(event) => setZoom(parseFloat(event.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <button
                  aria-label="zoom in"
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-200 text-muted-foreground"
                  onClick={() =>
                    setZoom((prev) => Math.max(1, Math.min(3, prev + 0.1)))
                  }
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleCropCancel}>
              Cancel
            </Button>
            <Button
              className="bg-purple hover:bg-purple-500"
              onClick={handleCropSave}
              disabled={!cropImage || !croppedAreaPixels}
            >
              <Crop className="w-4 h-4 mr-2" />
              Crop & Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
