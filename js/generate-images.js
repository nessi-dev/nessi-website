// Function to generate a dashboard preview image
function generateDashboardPreview() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#f5f8f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, 60);
    ctx.fillStyle = '#2e7d32';
    ctx.font = 'bold 18px Inter';
    ctx.fillText('Nessi.dev Dashboard', 20, 35);

    // Sidebar
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 60, 200, canvas.height - 60);
    
    // Sidebar menu items
    const menuItems = ['Dashboard', 'Tables', 'Schema', 'Quality Rules', 'Lineage', 'Settings'];
    ctx.fillStyle = '#6c7b6c';
    ctx.font = '14px Inter';
    menuItems.forEach((item, index) => {
        ctx.fillText(item, 20, 100 + (index * 40));
    });
    
    // Active menu item
    ctx.fillStyle = '#2e7d32';
    ctx.fillText('Dashboard', 20, 100);
    
    // Main content area - Quality score card
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(220, 80, 560, 120);
    ctx.fillStyle = '#2e7d32';
    ctx.font = 'bold 16px Inter';
    ctx.fillText('Data Quality Score', 240, 110);
    
    // Score circle
    ctx.beginPath();
    ctx.arc(280, 150, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#4caf50';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Inter';
    ctx.fillText('94', 272, 155);
    
    // Score metrics
    ctx.fillStyle = '#6c7b6c';
    ctx.font = '14px Inter';
    ctx.fillText('Rules Passed: 47/50', 340, 140);
    ctx.fillText('Last Run: 2 hours ago', 340, 160);
    ctx.fillText('Trend: +2% from last week', 340, 180);
    
    // Charts section
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(220, 220, 270, 200);
    ctx.fillRect(510, 220, 270, 200);
    
    // Chart titles
    ctx.fillStyle = '#2e7d32';
    ctx.font = 'bold 16px Inter';
    ctx.fillText('Schema Evolution', 240, 250);
    ctx.fillText('Null Distribution', 530, 250);
    
    // Schema evolution chart (simple line)
    ctx.beginPath();
    ctx.moveTo(240, 350);
    ctx.lineTo(270, 330);
    ctx.lineTo(300, 340);
    ctx.lineTo(330, 320);
    ctx.lineTo(360, 310);
    ctx.lineTo(390, 330);
    ctx.lineTo(420, 300);
    ctx.lineTo(450, 290);
    ctx.strokeStyle = '#2e7d32';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Null distribution chart (simple bar chart)
    const barWidth = 30;
    const bars = [80, 40, 60, 30, 50];
    bars.forEach((height, index) => {
        ctx.fillStyle = '#81c784';
        ctx.fillRect(540 + (index * 40), 380 - height, barWidth, height);
    });
    
    // Convert to PNG and download
    return canvas.toDataURL('image/png');
}

// Function to generate architecture diagram
function generateArchitectureDiagram() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Title
    ctx.fillStyle = '#2e7d32';
    ctx.font = 'bold 24px Inter';
    ctx.fillText('Nessi.dev Architecture', 280, 40);
    
    // Draw boxes for architecture components
    function drawBox(x, y, width, height, title, color, description) {
        // Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        
        // Box
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Inter';
        ctx.fillText(title, x + 15, y + 25);
        
        // Description
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        const words = description.split(' ');
        let line = '';
        let lineHeight = 15;
        let yPos = y + 50;
        
        words.forEach(word => {
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > width - 30 && line !== '') {
                ctx.fillText(line, x + 15, yPos);
                line = word + ' ';
                yPos += lineHeight;
            } else {
                line = testLine;
            }
        });
        
        ctx.fillText(line, x + 15, yPos);
    }
    
    // Draw connector lines
    function drawConnector(x1, y1, x2, y2, label) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#6c7b6c';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Arrow
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const arrowSize = 10;
        
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - arrowSize * Math.cos(angle - Math.PI/6), y2 - arrowSize * Math.sin(angle - Math.PI/6));
        ctx.lineTo(x2 - arrowSize * Math.cos(angle + Math.PI/6), y2 - arrowSize * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = '#6c7b6c';
        ctx.fill();
        
        // Label
        if (label) {
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(midX - 40, midY - 10, 80, 20);
            
            ctx.fillStyle = '#6c7b6c';
            ctx.font = '12px Inter';
            ctx.fillText(label, midX - ctx.measureText(label).width / 2, midY + 5);
        }
    }
    
    // Core components
    drawBox(300, 100, 200, 100, 'Core Engine', '#2e7d32', 'Go-based processing engine with Delta Lake integration');
    
    // Data sources
    drawBox(100, 250, 150, 80, 'Data Sources', '#4caf50', 'Delta Lake Tables, Databricks, Cloud Storage');
    
    // Modules
    drawBox(300, 250, 200, 80, 'Modules', '#81c784', 'Schema, Quality, Lineage, Profiling, Alerting');
    
    // API layer
    drawBox(550, 250, 150, 80, 'API Layer', '#4caf50', 'REST API, GraphQL, CLI');
    
    // Clients
    drawBox(200, 380, 150, 80, 'Python Client', '#2e7d32', 'Python SDK for integration');
    drawBox(450, 380, 150, 80, 'Web UI', '#2e7d32', 'Dashboard and reports');
    
    // Connectors
    drawConnector(175, 250, 300, 150, 'Read');
    drawConnector(400, 200, 400, 250, 'Extend');
    drawConnector(500, 150, 625, 250, 'Expose');
    drawConnector(400, 330, 275, 380, 'Use');
    drawConnector(400, 330, 525, 380, 'Render');
    
    // Convert to PNG
    return canvas.toDataURL('image/png');
}

// Function to save the generated images
function saveGeneratedImages() {
    // Create links to download the images
    const dashboardLink = document.createElement('a');
    dashboardLink.href = generateDashboardPreview();
    dashboardLink.download = 'dashboard-preview.png';
    dashboardLink.click();
    
    const architectureLink = document.createElement('a');
    architectureLink.href = generateArchitectureDiagram();
    architectureLink.download = 'architecture-diagram.png';
    architectureLink.click();
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Create a button to generate images
    const generateButton = document.createElement('button');
    generateButton.textContent = 'Generate Images';
    generateButton.style.position = 'fixed';
    generateButton.style.bottom = '20px';
    generateButton.style.right = '20px';
    generateButton.style.zIndex = '9999';
    generateButton.style.padding = '10px 20px';
    generateButton.style.backgroundColor = '#2e7d32';
    generateButton.style.color = 'white';
    generateButton.style.border = 'none';
    generateButton.style.borderRadius = '4px';
    generateButton.style.cursor = 'pointer';
    
    generateButton.addEventListener('click', saveGeneratedImages);
    
    document.body.appendChild(generateButton);
});
