// Elements
const urlInput = document.getElementById('url-input');
const qrSizeSelect = document.getElementById('qr-size');
const generateBtn = document.getElementById('generate-btn');
const logoUpload = document.getElementById('logo-upload');
const uploadBtn = document.getElementById('upload-btn');
const fileName = document.getElementById('file-name');
const clearImageBtn = document.getElementById('clear-image-btn');

let selectedLogo = null;

// Image upload
uploadBtn.addEventListener('click', () => {
    logoUpload.click();
});

logoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                selectedLogo = img;
                fileName.textContent = file.name;
                clearImageBtn.style.display = 'block';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

clearImageBtn.addEventListener('click', () => {
    selectedLogo = null;
    logoUpload.value = '';
    fileName.textContent = 'None';
    clearImageBtn.style.display = 'none';
});

// Generate QR code
generateBtn.addEventListener('click', generateAndDownloadQRCode);

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateAndDownloadQRCode();
    }
});

function generateAndDownloadQRCode() {
    const url = urlInput.value.trim();
    const size = parseInt(qrSizeSelect.value);

    removeError();

    if (!url) {
        showError('Please enter a URL or text');
        return;
    }

    generateBtn.disabled = true;
    const originalText = generateBtn.textContent;
    generateBtn.textContent = 'Generating...';

    try {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        document.body.appendChild(tempDiv);

        const qrCode = new QRCode(tempDiv, {
            text: url,
            width: size,
            height: size,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: selectedLogo ? QRCode.CorrectLevel.H : QRCode.CorrectLevel.L
        });

        setTimeout(() => {
            const canvas = tempDiv.querySelector('canvas');
            
            if (!canvas) {
                throw new Error('Failed to generate QR code');
            }

            // Add logo if selected
            if (selectedLogo) {
                const ctx = canvas.getContext('2d');
                const logoSize = size * 0.25;
                const logoX = (size - logoSize) / 2;
                const logoY = (size - logoSize) / 2;

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
                ctx.drawImage(selectedLogo, logoX, logoY, logoSize, logoSize);
            }

            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = `qrcode-${Date.now()}.png`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            document.body.removeChild(tempDiv);

            showSuccess('QR code downloaded');
            urlInput.value = '';
            
            generateBtn.disabled = false;
            generateBtn.textContent = originalText;

        }, 300);

    } catch (error) {
        showError('Failed to generate QR code');
        console.error(error);
        generateBtn.disabled = false;
        generateBtn.textContent = originalText;
    }
}

function showError(message) {
    removeError();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    errorDiv.id = 'error-message';

    const inputSection = document.querySelector('.input-section');
    inputSection.insertBefore(errorDiv, inputSection.firstChild);
}

function removeError() {
    const existingError = document.getElementById('error-message');
    if (existingError) {
        existingError.remove();
    }
}

function showSuccess(message) {
    removeError();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    successDiv.id = 'success-message';

    const inputSection = document.querySelector('.input-section');
    inputSection.insertBefore(successDiv, inputSection.firstChild);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

window.addEventListener('load', () => {
    urlInput.focus();
    initCodeBackground();
});

// Syntax highlighted code background
function initCodeBackground() {
    const codeBackground = document.querySelector('.code-background');
    if (!codeBackground) return;

    const fullCode = `// Elements
const urlInput = document.getElementById('url-input');
const qrSizeSelect = document.getElementById('qr-size');
const generateBtn = document.getElementById('generate-btn');
const logoUpload = document.getElementById('logo-upload');
const uploadBtn = document.getElementById('upload-btn');
const fileName = document.getElementById('file-name');
const clearImageBtn = document.getElementById('clear-image-btn');

let selectedLogo = null;

// Image upload
uploadBtn.addEventListener('click', () => {
    logoUpload.click();
});

logoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                selectedLogo = img;
                fileName.textContent = file.name;
                clearImageBtn.style.display = 'block';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

clearImageBtn.addEventListener('click', () => {
    selectedLogo = null;
    logoUpload.value = '';
    fileName.textContent = 'None';
    clearImageBtn.style.display = 'none';
});

// Generate QR code
generateBtn.addEventListener('click', generateAndDownloadQRCode);

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateAndDownloadQRCode();
    }
});

function generateAndDownloadQRCode() {
    const url = urlInput.value.trim();
    const size = parseInt(qrSizeSelect.value);
    
    removeError();
    
    if (!url) {
        showError('Please enter a URL or text');
        return;
    }
    
    generateBtn.disabled = true;
    const originalText = generateBtn.textContent;
    generateBtn.textContent = 'Generating...';
    
    try {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        document.body.appendChild(tempDiv);
        
        const qrCode = new QRCode(tempDiv, {
            text: url,
            width: size,
            height: size,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.L
        });
        
        setTimeout(() => {
            const canvas = tempDiv.querySelector('canvas');
            
            if (!canvas) {
                throw new Error('Failed to generate QR code');
            }
            
            if (selectedLogo) {
                const ctx = canvas.getContext('2d');
                const logoSize = size * 0.2;
                const logoX = (size - logoSize) / 2;
                const logoY = (size - logoSize) / 2;
                const padding = 8;
                
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(logoX - padding, logoY - padding, logoSize + (padding * 2), logoSize + (padding * 2));
                
                ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 2;
                
                ctx.drawImage(selectedLogo, logoX, logoY, logoSize, logoSize);
                
                ctx.shadowColor = 'transparent';
            }
            
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = \`qrcode-\${Date.now()}.png\`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            document.body.removeChild(tempDiv);
            
            showSuccess('QR code downloaded');
            urlInput.value = '';
            
            generateBtn.disabled = false;
            generateBtn.textContent = originalText;
            
        }, 300);
        
    } catch (error) {
        showError('Failed to generate QR code');
        console.error(error);
        generateBtn.disabled = false;
        generateBtn.textContent = originalText;
    }
}

function showError(message) {
    removeError();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    errorDiv.id = 'error-message';
    const inputSection = document.querySelector('.input-section');
    inputSection.insertBefore(errorDiv, inputSection.firstChild);
}

function removeError() {
    const existingError = document.getElementById('error-message');
    if (existingError) {
        existingError.remove();
    }
}

function showSuccess(message) {
    removeError();
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    successDiv.id = 'success-message';
    const inputSection = document.querySelector('.input-section');
    inputSection.insertBefore(successDiv, inputSection.firstChild);
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

window.addEventListener('load', () => {
    urlInput.focus();
});`;

    const highlighted = syntaxHighlight(fullCode);
    codeBackground.innerHTML = highlighted;
}

function syntaxHighlight(code) {
    const keywords = ['const', 'let', 'var', 'function', 'if', 'else', 'return', 'new', 'try', 'catch', 'throw'];
    const methods = ['addEventListener', 'getElementById', 'querySelector', 'createElement', 'appendChild', 'removeChild', 'insertBefore', 'click', 'trim', 'parseInt', 'setTimeout', 'readAsDataURL', 'toDataURL', 'getContext', 'fillRect', 'drawImage'];
    
    let result = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    keywords.forEach(kw => {
        result = result.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span style="color:#C678DD">$1</span>');
    });
    
    methods.forEach(method => {
        result = result.replace(new RegExp(`\\b(${method})\\b`, 'g'), '<span style="color:#61AFEF">$1</span>');
    });
    
    result = result.replace(/(\/\/[^\n]*)/g, '<span style="color:#5C6370">$1</span>');
    result = result.replace(/('([^']*)'|"([^"]*)")/g, '<span style="color:#98C379">$1</span>');
    result = result.replace(/\b(\d+)\b/g, '<span style="color:#D19A66">$1</span>');
    result = result.replace(/\b(true|false|null)\b/g, '<span style="color:#D19A66">$1</span>');
    
    return '<pre style="margin:0;white-space:pre-wrap;word-wrap:break-word;">' + result + '</pre>';
}