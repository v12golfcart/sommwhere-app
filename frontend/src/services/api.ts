const API_URL = 'https://winepoc.ngrok.io';

export const analyzeImage = async (
  photoUri: string,
  tasteProfile?: string | null,
  sommPrompt?: string | null,
) => {
  const url = `${API_URL}/analyze`;
  const formData = new FormData();

  // add image - detect file type from uri
  const fileType = photoUri.split('.').pop()?.toLowerCase() || 'jpg';
  const mimeType = fileType === 'png' ? 'image/png' : 'image/jpeg';
  formData.append('image', {
    uri: photoUri,
    type: mimeType,
    name: `image.${fileType}`,
  } as any);

  // add text fields - only append if they have values
  if (tasteProfile) {
    formData.append('tasteProfile', tasteProfile);
  }
  if (sommPrompt && sommPrompt !== tasteProfile) {
    formData.append('sommPrompt', sommPrompt);
  }

  // send request
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to analyze image');
  }

  return response.json();
};
