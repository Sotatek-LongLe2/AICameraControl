import dayjs from "dayjs";
import { FileService } from "src/services/FileService";

export const handleUploadFile = async (
  file?: File | null,
  hasUniqueName?: boolean
) => {
  if (!file) return;

  if (hasUniqueName) {
    const [name, extension] = file.name.split(".");

    const newName = `${name}-${dayjs().unix()}.${extension}`;
    file = new File([file], newName);
  }
  const res = await FileService.Upload({ file });

  return res.data.data.url;
};
