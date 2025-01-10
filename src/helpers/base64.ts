export function base64ToBlob(
  base64: string,
  contentType: string = "image/jpeg"
): Blob {
  const base64Data = base64.split(",")[1];

  const binaryString = window.atob(base64Data);
  const binaryLength = binaryString.length;
  const bytes = new Uint8Array(binaryLength);

  for (let i = 0; i < binaryLength; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new Blob([bytes], { type: contentType });
}
