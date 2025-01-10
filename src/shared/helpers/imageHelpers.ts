export const getSizeImage = (file?: File) => {
  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  return new Promise<{ width: number; height: number } | undefined>(
    (resolve) => {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = function () {
        const width = img.width;
        const height = img.height;

        URL.revokeObjectURL(imageUrl);
        resolve({ width, height });
      };

      img.onerror = function () {
        URL.revokeObjectURL(imageUrl);
        resolve(undefined);
      };

      img.src = imageUrl;
    }
  );
};

export enum ValidateImage {
  INVALID_MAX_SIZE = "INVALID_MAX_SIZE",
  INVALID_TYPE = "INVALID_TYPE",
  INVALID_SIZE = "INVALID_SIZE",
}

interface IValidateImageOptions {
  maxSize?: number;
  type?: string[];
  size?: {
    width: number;
    height: number;
  };
}

export const validateFile = async (
  file: File[] | File,
  option?: IValidateImageOptions
) => {
  const image = Array.isArray(file) ? file[0] : file;
  if (!image) return [];

  const fileSizeInMB = image.size / (1024 * 1024);

  const list: ValidateImage[] = [];

  if (option?.maxSize && fileSizeInMB > option.maxSize) {
    list.push(ValidateImage.INVALID_MAX_SIZE);
  }

  if (option?.type?.length && !option?.type.includes(image.type)) {
    list.push(ValidateImage.INVALID_TYPE);
  }

  if (!option?.size) return list;
  const { height: minHeight, width: minWidth } = option.size;

  const { height = 0, width = 0 } = (await getSizeImage(image)) ?? {};

  if ((option?.size && height < minHeight) || width < minWidth) {
    list.push(ValidateImage.INVALID_SIZE);
  }

  return list;
};
