const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2020', '2021', '2023', '2024'],
        datasets: [{
            label: 'Sales',
            data: [0, 0, 0, 0], // Initial values
            backgroundColor: '#0000FF',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            tension: 0.4
        }, {
            label: 'Profit',
            data: [0, 0, 0, 0], // Initial values
            backgroundColor: 'green',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            tension: 0.4
        }, {
            label: 'Turnover',
            data: [0, 0, 0, 0], // Initial values
            backgroundColor: 'red',
            borderColor: 'rgba(75, 122, 192, 1)',
            borderWidth: 1,
            tension: 0.4
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// Function to fetch data and update the chart
function fetchData() {
    const randomData = Array(4).fill(0).map(() => Math.floor(Math.random() * 100));
    myChart.data.datasets[0].data = randomData; // Random values for Sales
    myChart.data.datasets[1].data = randomData.map(value => Math.floor(value * 0.5)); // Example for Profit
    myChart.data.datasets[2].data = randomData.map(value => Math.floor(value * 2)); // Example for Turnover
    myChart.update();
}

// Function to format the current date and time
function getFormattedDateTime() {
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');
return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`; // Format as YYYY-MM-DD_HH-MM-SS
}
// Function to download the chart as a PDF
document.getElementById('downloadPDF').addEventListener('click', () => {
// Increase scale and handle CORS
html2canvas(document.getElementById('myChart'), {
scale: 2, // Increase scale for higher resolution
useCORS: true, // Enable CORS for images from other domains
}).then(canvas => {
const imgData = canvas.toDataURL('image/png');
const pdf = new jsPDF();
pdf.addImage(imgData, 'PNG', 10, 10);
// Generate the filename with current date and time
const filename = `Chart_${getFormattedDateTime()}.pdf`;
// Save the PDF with the dynamic filename
pdf.save(filename);
});
});

document.getElementById('downloadjpg').addEventListener('click', () => {
html2canvas(document.getElementById('myChart')).then(canvas => {
// Change the format to 'image/jpeg'
const imgData = canvas.toDataURL('image/jpeg');
// Create a link element to facilitate the download
const link = document.createElement('a');
link.href = imgData; // Set the href to the image data
link.download = `Chart_${getFormattedDateTime()}.jpg`; // Set the name for the downloaded file
// Append the link to the body (it won't be visible)
document.body.appendChild(link);
// Programmatically click the link to trigger the download
link.click();
// Remove the link from the document
document.body.removeChild(link);
});
});
// Fetch data every second
setInterval(fetchData, 2000);
// Initial fetch
fetchData();
