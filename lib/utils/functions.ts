
// # Converts a Blob to a File.
export function blobToFile(blob: Blob, fileName: string): File {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

// generate random filename
export function generateRandomFilename(extension: string = ''): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10; // Довжина випадкової частини імені файлу
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const timestamp = new Date().getTime(); // Додаємо часову мітку для унікальності
  
  return `${result}_${timestamp}${extension ? '.' + extension : ''}`;
}