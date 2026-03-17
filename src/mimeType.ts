function getMimeType(format: string) {
    const mimeType = format.toLowerCase() === 'jpg' 
    ? 'image/jpeg' 
    : `image/${format.toLowerCase()}`;

    const quality = format.toLowerCase() === 'webp' ? 0.8 : 0.9;

    return { mimeType, quality };
}

export default getMimeType;