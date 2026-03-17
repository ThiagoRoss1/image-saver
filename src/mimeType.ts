function getMimeType(format: string) {
    const type = format.toLowerCase();
    const mimeType = type === 'jpg' 
    ? 'image/jpeg' 
    : `image/${type}`;

    const quality = type === 'webp' ? 0.8 : (type === 'jpg' || type === 'jpeg') ? 0.9 : 1.0;

    return { mimeType, quality };
}

export default getMimeType;