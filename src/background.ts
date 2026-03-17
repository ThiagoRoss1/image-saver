// Background for downloading images on web

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'save-image',
        title: 'Save Image as',
        contexts: ['image']
    });

    // Sub-options for different formats
    const formats = ['JPG', 'PNG', 'WebP'];

    formats.forEach(format => {
        chrome.contextMenus.create({
            id: `save-image-${format.toLowerCase()}`,
            parentId: 'save-image',
            title: format,
            contexts: ['image']
        });
    });
});

// Call offscreen script
async function convertImageOffscreen(url: string, format: string) {
    if (!(await chrome.offscreen.hasDocument())) {
        await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: [chrome.offscreen.Reason.DOM_PARSER],
            justification: `Convert images for downloading`,
        });
    }
    const dataUrl = await chrome.runtime.sendMessage({ 
        type: 'offscreen-convert-image', 
        data: { url, format } 
    });

    return dataUrl;
}

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener(async (info) => {
    if (!info.menuItemId.toString().startsWith('save-image-') || !info.srcUrl) return;
    
    const format = info.menuItemId.toString().replace('save-image-', '');
    const convertedDataUrl = await convertImageOffscreen(info.srcUrl!, format);
    console.log(convertedDataUrl);

    if (!convertedDataUrl) {
        console.error('No data URL received from offscreen conversion.');
        return;
    }

    chrome.downloads.download({
        url: convertedDataUrl,
        filename: `image-${Date.now()}.${format.toLowerCase()}`,
        saveAs: true  
    });
});