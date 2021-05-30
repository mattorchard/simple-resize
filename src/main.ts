import {resizeImage} from "./resize";

const input = document.querySelector("input")!;

input.onchange = async () => {
  const file = input.files![0]
  if (!file) return;
  console.time("Resizing")
  const resultingImage = await resizeImage(file, 300);
  console.timeEnd("Resizing")
  window.open(URL.createObjectURL(resultingImage))
}

export {}