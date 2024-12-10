// Utility Functions
const clearResults = (results) => results.forEach(result => (result.textContent = ''));

const toggleDisplay = (inputs, displayStyle) => 
    inputs.forEach(input => (input.style.display = displayStyle));

const calculateMarketingNet = (input2, input4, input5) =>
    Math.round((input2 * (1.18 / ((1 - input4 / 100) * (1 - input5 / 100)))) * 100) / 100;

const calculateLogisticsNet = (input3, input5) => 
    Math.round((input3 / (1 - input5 / 100)) * 100) / 100;

// DOM Element Selection
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const toggleButtons = document.querySelectorAll('.toggle-buttons button');
const fbInputs = document.querySelectorAll('.fb-inputs');
const flatInputs = document.querySelectorAll('.flat-inputs');
const results = [
    document.getElementById('sp-result1'),
    document.getElementById('sp-result2'),
    document.getElementById('sp-result3'),
    document.getElementById('sp-result4'),
    document.getElementById('sp-result5')
];

// Tab Switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
        clearResults(results);
    });
});

// Mode Toggling
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mode = button.dataset.mode;
        const parent = button.parentElement;
        parent.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        toggleDisplay(fbInputs, mode === 'fb' ? 'flex' : 'none');
        toggleDisplay(flatInputs, mode === 'flat' ? 'flex' : 'none');
        clearResults(results);
    });
});

// Selling Price Calculation
document.getElementById('sp-calculate-btn').addEventListener('click', () => {
    const isFB = document.querySelector('#selling-price .toggle-buttons .active').dataset.mode === 'fb';

    const inputs = isFB
        ? Array.from({ length: 7 }, (_, i) => parseFloat(document.getElementById(`sp-fb-input${i + 1}`).value))
        : Array.from({ length: 6 }, (_, i) => parseFloat(document.getElementById(`sp-flat-input${i + 1}`).value));

    if (isFB) {
        const [input1, input2, input3, input4, input5, input6, input7] = inputs;
        const z = calculateMarketingNet(input2, input5, input6);
        const x = Math.round(((input3 * (1 - input6 / 100)) + (input4 * input6 / 100)) * 100) / 100;
        const y = Math.round((x / (1 - input6 / 100)) * 100) / 100;
        results[0].textContent = `Marketing Net = ${z}%`;
        results[1].textContent = `Logistics Effective = ₹${x}`;
        results[2].textContent = `Logistics Net = ${y}%`;
        results[3].textContent = `Selling Price = ₹${Math.round(((input1 + y) / (1 - z / 100 - input7 / 100)) / 10) * 10 - 1}`;
    } else {
        const [input1, input2, input3, input4, input5, input6] = inputs;
        const z = calculateMarketingNet(input2, input4, input5);
        const y = calculateLogisticsNet(input3, input5);
        results[0].textContent = `Marketing Net = ${z}%`;
        results[1].textContent = `Logistics Net = ${y}%`;
        results[2].textContent = `Selling Price = ₹${Math.round(((input1 + y) / (1 - z / 100 - input6 / 100)) / 10) * 10 - 1}`;
    }
});

// Break-Even Calculation
document.getElementById('be-calculate-btn').addEventListener('click', () => {
    const isFB = document.querySelector('#break-even .toggle-buttons .active').dataset.mode === 'fb';

    const inputs = isFB
        ? Array.from({ length: 7 }, (_, i) => parseFloat(document.getElementById(`be-fb-input${i + 1}`).value))
        : Array.from({ length: 6 }, (_, i) => parseFloat(document.getElementById(`be-flat-input${i + 1}`).value));

    if (isFB) {
        const [input1, input2, input3, input4, input5, input6, input7] = inputs;
        const cogs = Math.round((input1 / input2) * 100 * 100) / 100;
        const le = Math.round((input4 * (1 - input7 / 100) + input5 * input7 / 100) * 100) / 100;
        const ln = Math.round((le / ((1 - input7 / 100) * input2)) * 100) / 100;
        const mn = Math.round((input3 * (1.18 / ((1 - input6 / 100) * (1 - input7 / 100)))) * 100) / 100;
        results[0].textContent = `COGS% = ${cogs}%`;
        results[1].textContent = `Marketing Net = ${mn}%`;
        results[2].textContent = `Logistics Effective = ₹${le}`;
        results[3].textContent = `Logistics Net = ${ln}%`;
        results[4].textContent = `Profit% = ${Math.round((1 - cogs / 100 - mn / 100 - ln / 100) * 10000) / 100}%`;
    } else {
        const [input1, input2, input3, input4, input5, input6] = inputs;
        const cogs = Math.round((input1 / input2) * 100 * 100) / 100;
        const ln = calculateLogisticsNet(input4, input6);
        const mn = calculateMarketingNet(input3, input5, input6);
        results[0].textContent = `COGS% = ${cogs}%`;
        results[1].textContent = `Marketing Net = ${mn}%`;
        results[2].textContent = `Logistics Net = ${ln}%`;
        results[3].textContent = `Profit% = ${Math.round((1 - cogs / 100 - mn / 100 - ln / 100) * 10000) / 100}%`;
    }
});
