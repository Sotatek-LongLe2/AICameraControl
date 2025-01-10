
export const downloadFileFromBlob = async (blob: Blob, fileName?: string) => {
  const fileUrlBlob = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = fileUrlBlob;
  link.download = fileName || "downloaded-file.pdf";
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(fileUrlBlob);
};

export const chooseFile = async (
  accept: string[] = ["image/*"]
): Promise<File | null> => {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept.join(",");

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0] || null;
      if (file) {
        resolve(file);
      } else {
        resolve(null);
      }
    };

    input.click();
  });
};

export const fileToBlob = (file: File): string => {
  return URL.createObjectURL(file);
};
