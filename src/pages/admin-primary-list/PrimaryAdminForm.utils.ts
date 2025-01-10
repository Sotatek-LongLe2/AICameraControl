import { MAX_IMAGE_SIZE } from "src/constants/common";
import { validateFile, ValidateImage } from "src/shared/helpers/imageHelpers";

export const validateLogo = async (files: File[]) => {
  const file = files[0];
  if (!file) return;

  const validateMessage = await validateFile(file, {
    maxSize: MAX_IMAGE_SIZE,
    type: ["image/png", "image/jpeg", "image/jpg"],
    size: { width: 300, height: 300 },
  });

  if (validateMessage.includes(ValidateImage.INVALID_MAX_SIZE))
    return `The image size must be less than ${MAX_IMAGE_SIZE}MB`;
  if (validateMessage.includes(ValidateImage.INVALID_TYPE))
    return `The image type must be .png or .jpeg`;
  if (validateMessage.includes(ValidateImage.INVALID_SIZE))
    return `The image type must be 300 * 300 pixels or superior`;
};

export const validateBanner = async (files: File[]) => {
  const file = files[0];
  if (!file) return;

  const validateMessage = await validateFile(file, {
    maxSize: MAX_IMAGE_SIZE,
    type: ["image/jpeg", "image/jpg"],
    size: { width: 1140, height: 300 },
  });

  if (validateMessage.includes(ValidateImage.INVALID_MAX_SIZE))
    return `The image size must be less than ${MAX_IMAGE_SIZE}MB`;
  if (validateMessage.includes(ValidateImage.INVALID_TYPE))
    return `The image type must be .jpeg`;
  if (validateMessage.includes(ValidateImage.INVALID_SIZE))
    return `The image type must be 1140 * 300 pixels or superior`;
};

export const validateDocument = async (files: File[]) => {
  if (!files.length) return;

  for (const file of files) {
    const validateMessage = await validateFile(file, {
      // https://jira.sotatek.com/browse/ASA-388 change FDD
      maxSize: MAX_IMAGE_SIZE,
      type: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ],
    });

    if (validateMessage.includes(ValidateImage.INVALID_TYPE))
      return `The type must be .pdf or .xlsx`;
    if (validateMessage.includes(ValidateImage.INVALID_MAX_SIZE))
      return `The file must be less than ${MAX_IMAGE_SIZE}MB`;
  }
};
