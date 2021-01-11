export function extensionToMimeType(filename) {
  const mimes = { mp4: 'video/mp4', ogv: 'video/ogg', webm: 'video/webm' };
  const ext = filename.split('.').pop();
  if (ext in mimes) return mimes[ext];
  console.error(`Unsupported source file type: "${ext}"`);
  return;
}

export function uid() {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

export async function preloadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener(
      'load',
      () => {
        resolve(image);
      },
      { once: true }
    );
    image.src = url;
  });
}
