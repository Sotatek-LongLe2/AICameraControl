import { Box, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import React, { DragEvent, useCallback, useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { combineSx } from "src/shared/utils";
import { colors } from "src/styles/colors";
import { v4 as uuidv4 } from "uuid";
import { TFileItem } from "../common/FileItem";

interface DragImageCropProps {
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
  children?: React.ReactNode;
  sx?: SxProps;
  aspect?: number;
  value?: TFileItem | null | string;
  onChange?: (value: File | null) => void;
  onCroppedValueChange?: (croppedValue: File | null) => void;
  type?: string;
}

const DragImageCrop: React.FC<DragImageCropProps> = ({
  width = "100%",
  height = "400px",
  disabled = false,
  children,
  sx,
  aspect,
  value,
  onChange,
  onCroppedValueChange,
  type = "image/jpeg",
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const uniqueId = uuidv4();

  useEffect(() => {
    if (!value) {
      setImageUrl(null);
      return;
    }

    if (typeof value === "string") {
      setImageUrl(value);
    } else if ("fullPath" in value) {
      setImageUrl(value.fullPath);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(value);
    }
  }, [value]);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.includes("image")) {
        onChange?.(file);
        onCroppedValueChange?.(null);
      }
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      onChange?.(file);
      onCroppedValueChange?.(null);
    }
  };

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = useCallback(
    async (imageSrc: string, pixelCrop: Area): Promise<File | null> => {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("No 2d context");
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
        pixelCrop.height
      );

      return new Promise((resolve, reject) => {
        try {
          canvas.toBlob(async (blob) => {
            if (!blob) return;

            const file = new File([blob], `cropped-${uuidv4()}.jpeg`, { type });

            resolve(file);
          }, type);
        } catch (e: unknown) {
          console.log(e);
          reject(null);
        }
      });
    },
    [type]
  );

  const handleCropAreaComplete = useCallback(
    async (_: Area, croppedAreaPixels: Area) => {
      if (!imageUrl) return;

      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
      onCroppedValueChange?.(croppedImage);
    },
    [getCroppedImg, imageUrl, onCroppedValueChange]
  );

  return (
    <Box sx={{ width, height, position: "relative" }}>
      {imageUrl ? (
        <>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundColor: "#333",
              overflow: "hidden",
            }}
          >
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={1}
              onCropChange={onCropChange}
              onCropComplete={handleCropAreaComplete}
              objectFit="cover"
              showGrid={false}
              cropShape="rect"
              aspect={aspect}
              restrictPosition={true}
              style={{
                containerStyle: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "#333",
                  borderRadius: "6px",
                },
                cropAreaStyle: {
                  border: "none",
                  boxShadow: "none",
                },
                mediaStyle: {
                  maxWidth: `100%`,
                },
              }}
            />
          </div>
        </>
      ) : (
        <label htmlFor={uniqueId} style={{ width: "100%", height: "100%" }}>
          <Box
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={combineSx(
              {
                width: "100%",
                height: "100%",
                border: "none",
                background: `linear-gradient(90deg, ${
                  isDragging ? colors["primary-main"] : "#FFFFFF"
                } 50%, transparent 50%) repeat-x,
                         linear-gradient(90deg, ${
                           isDragging ? colors["primary-main"] : "#FFFFFF"
                         } 50%, transparent 50%) repeat-x,
                         linear-gradient(0deg, ${
                           isDragging ? colors["primary-main"] : "#FFFFFF"
                         } 50%, transparent 50%) repeat-y,
                         linear-gradient(0deg, ${
                           isDragging ? colors["primary-main"] : "#FFFFFF"
                         } 50%, transparent 50%) repeat-y`,
                backgroundSize: "15px 1px, 15px 1px, 1px 15px, 1px 15px",
                backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
                borderRadius: "6px",
                padding: "24px",
                textAlign: "center",
                backgroundColor: isDragging
                  ? "rgba(0, 170, 255, 0.1)"
                  : "transparent",
                transition: "all 0.3s ease",
                cursor: disabled ? "inherit" : "pointer",
                opacity: disabled ? 0.7 : 1,
              },
              sx
            )}
          >
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{
                display: "none",
              }}
              id={uniqueId}
            />
            {isDragging ? (
              <Typography level="body1" sx={{ pointerEvents: "none" }}>
                Drop your file here
              </Typography>
            ) : (
              <>{children}</>
            )}
          </Box>
        </label>
      )}
    </Box>
  );
};

export default DragImageCrop;
