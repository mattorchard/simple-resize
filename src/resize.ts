const loadImage = async (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    if (image.naturalWidth)
      return resolve(image);
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image`));
  });

const exportFileFromCanvas = async (canvas: HTMLCanvasElement, {
  type = "image/jpeg",
  quality = 0.9,
  filename = "image.jpeg"
} = {}): Promise<File> => new Promise((resolve, reject) =>
  canvas.toBlob((blob) => {
    if (!blob) return reject(new Error(`Failed to create file`));
    const file = new File([blob], filename, {type});
    resolve(file);
  }, type, quality)
)

const createSquareCanvas = (size: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) throw new Error(`Can't create canvas context`);
  return {canvas, context};
}

const drawImageOffset = (context: CanvasRenderingContext2D, image: HTMLImageElement, dx: number, dy: number, dw: number, dh: number) =>
  context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, dx, dy, dw, dh);

export const resizeImage = async (inputImage: File, maxSizeLength: number): Promise<File> => {
  const inputImageUrl = URL.createObjectURL(inputImage);
  try {
    const image = await loadImage(inputImageUrl);
    const {canvas, context} = createSquareCanvas(maxSizeLength);

    const aspectRatio = image.naturalWidth / image.naturalHeight;
    if (aspectRatio >= 1)
      drawImageOffset(
        context,
        image,
        -((maxSizeLength * aspectRatio) - maxSizeLength) / 2,
        0,
        maxSizeLength * aspectRatio,
        maxSizeLength
      );
    else
      drawImageOffset(
        context,
        image,
        0,
        -((maxSizeLength / aspectRatio) - maxSizeLength) / 2,
        maxSizeLength,
        maxSizeLength / aspectRatio
      );

    return await exportFileFromCanvas(canvas)
  } finally {
    URL.revokeObjectURL(inputImageUrl);
  }
}