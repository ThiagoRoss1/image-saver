// Offscreen rendering for image extension conversion
import getMimeType from "./mimeType";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type !== 'offscreen-convert-image') {
        return;
    }
    const { url, format } = message.data;
    
    convertImage(url, format)
        .then((dataUrl) => sendResponse(dataUrl))
        .catch((error) => {
            console.error('Error converting image:', error);
            sendResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        });

    return true;
});

async function convertImage(url: string, format: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);

            const { mimeType, quality } = getMimeType(format);
            
            const dataUrl = canvas.toDataURL(mimeType, quality);
            resolve(dataUrl);
        };
        img.onerror = (error) => {
            reject(new Error(`Failed to load image for conversion. ${error instanceof Error ? error.message : 'Unknown error'}`));
        };
        img.src = url;
    });
}
