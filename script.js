
    // Tab Switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const resultElement1 = document.getElementById('sp-result1');
    const resultElement2 = document.getElementById('sp-result2');
    const resultElement3 = document.getElementById('sp-result3');
    const resultElement4 = document.getElementById('sp-result4');
    const resultElement5 = document.getElementById('sp-result5');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
        resultElement1.textContent = ``;
        resultElement2.textContent = ``;
        resultElement3.textContent = ``;
        resultElement4.textContent = ``;
        resultElement5.textContent = ``;
      });
    });

    const toggleButtons = document.querySelectorAll('.toggle-buttons button');
    const fbInputs = document.querySelectorAll('.fb-inputs');
    const flatInputs = document.querySelectorAll('.flat-inputs');
    const results = [
      document.getElementById('sp-result1'),
      document.getElementById('sp-result2'),
      document.getElementById('sp-result3'),
      document.getElementById('sp-result4')
    ];

    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const mode = button.dataset.mode;
        const parent = button.parentElement;
        const buttons = parent.querySelectorAll('button');
        resultElement1.textContent = ``;
        resultElement2.textContent = ``;
        resultElement3.textContent = ``;
        resultElement4.textContent = ``;
        resultElement5.textContent = ``;
        // Toggle active button
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show or hide inputs based on mode
        if (mode === 'fb') {
          fbInputs.forEach(input => input.style.display = 'flex');
          flatInputs.forEach(input => input.style.display = 'none');
        } else if (mode === 'flat') {
          fbInputs.forEach(input => input.style.display = 'none');
          flatInputs.forEach(input => input.style.display = 'flex');
        }

        // Reset results when mode is changed
        results.forEach(result => {
          result.textContent = '';
        });
      });
    });


    // Calculations


    document.getElementById('sp-calculate-btn').addEventListener('click', () => {
      const isFB = document.querySelector('#selling-price .toggle-buttons .active').dataset.mode === 'fb';


      if (isFB) {
        const input1 = parseFloat(document.getElementById('sp-fb-input1').value);
        const input2 = parseFloat(document.getElementById('sp-fb-input2').value);
        const input3 = parseFloat(document.getElementById('sp-fb-input3').value);
        const input4 = parseFloat(document.getElementById('sp-fb-input4').value);
        const input5 = parseFloat(document.getElementById('sp-fb-input5').value);
        const input6 = parseFloat(document.getElementById('sp-fb-input6').value);
        const input7 = parseFloat(document.getElementById('sp-fb-input7').value);


        const z = Math.round((input2 * (1.18 / ((1 - input5 / 100) * (1 - input6 / 100)))) * 100) / 100;
        resultElement1.textContent = `Marketing Net = ${z}%`;
        resultElement2.textContent = `Logistics Effective = ₹${Math.round(((input3 * (1 - input6 / 100)) + (input4 * input6 / 100)) * 100) / 100}`;
        const x = Math.round(((input3 * (1 - input6 / 100)) + (input4 * input6 / 100)) * 100) / 100;
        const y = Math.round((x / (1 - input6 / 100)) * 100) / 100;
        resultElement3.textContent = `Logistics Net = ${y}%`;
        resultElement4.textContent = `Selling Price = ₹${Math.round(((input1 + y) / (1 - z / 100 - input7 / 100)) / 10) * 10 - 1}`;


      } else {
        const input1 = parseFloat(document.getElementById('sp-flat-input1').value);
        const input2 = parseFloat(document.getElementById('sp-flat-input2').value);
        const input3 = parseFloat(document.getElementById('sp-flat-input3').value);
        const input4 = parseFloat(document.getElementById('sp-flat-input4').value);
        const input5 = parseFloat(document.getElementById('sp-flat-input5').value);
        const input6 = parseFloat(document.getElementById('sp-flat-input6').value);



        const z = Math.round((input2 * (1.18 / ((1 - input4 / 100) * (1 - input5 / 100)))) * 100) / 100;
        resultElement1.textContent = `Marketing Net = ${z}%`;
        const x = Math.round(((input3 * (1 - input6 / 100)) + (input4 * input6 / 100)) * 100) / 100;
        const y = Math.round((input3 / (1 - input5 / 100)) * 100) / 100;
        resultElement2.textContent = `Logistics Net = ${y}%`;
        resultElement3.textContent = `Selling Price = ₹${Math.round(((input1 + y) / (1 - z / 100 - input6 / 100)) / 10) * 10 - 1}`;

      }
    });


    document.getElementById('be-calculate-btn').addEventListener('click', () => {
      const isFB = document.querySelector('#break-even .toggle-buttons .active').dataset.mode === 'fb';
      const resultElement1 = document.getElementById('sp-result1');
      const resultElement2 = document.getElementById('sp-result2');
      const resultElement3 = document.getElementById('sp-result3');
      const resultElement4 = document.getElementById('sp-result4');
      const resultElement5 = document.getElementById('sp-result5');


      if (isFB) {
        const input1 = parseFloat(document.getElementById('be-fb-input1').value);
        const input2 = parseFloat(document.getElementById('be-fb-input2').value);
        const input3 = parseFloat(document.getElementById('be-fb-input3').value);
        const input4 = parseFloat(document.getElementById('be-fb-input4').value);
        const input5 = parseFloat(document.getElementById('be-fb-input5').value);
        const input6 = parseFloat(document.getElementById('be-fb-input6').value);
        const input7 = parseFloat(document.getElementById('be-fb-input7').value);
        const cogs = input1 / input2 * 100;
        const le = input4 * (1 - input7 / 100) + input5 * input7 / 100;
        const ln = le / ((1 - input7 / 100) * input2) * 100;
        const mn = (input3 / 100) * (1.18 / ((1 - input6 / 100) * (1 - input7 / 100))) * 100;
        resultElement1.textContent = `COGS% = ${Math.round(cogs * 100) / 100}%`;
        resultElement2.textContent = `Marketing Net = ${Math.round(mn * 100) / 100}%`;
        resultElement3.textContent = `Logistics Effective = ₹${Math.round(le * 100) / 100}`;
        resultElement4.textContent = `Logistics Net = ${Math.round(ln * 100) / 100}%`;
        resultElement5.textContent = `Profit% = ${Math.round((1 - cogs / 100 - mn / 100 - ln / 100) * 10000) / 100}%`;




      } else {
        const input1 = parseFloat(document.getElementById('be-flat-input1').value);
        const input2 = parseFloat(document.getElementById('be-flat-input2').value);
        const input3 = parseFloat(document.getElementById('be-flat-input3').value);
        const input4 = parseFloat(document.getElementById('be-flat-input4').value);
        const input5 = parseFloat(document.getElementById('be-flat-input5').value);
        const input6 = parseFloat(document.getElementById('be-flat-input6').value);

        const cogs = input1 / input2 * 100;
        const ln = input4 / ((1 - input6 / 100) * input2) * 100;
        const mn = (input3 / 100) * (1.18 / ((1 - input5 / 100) * (1 - input6 / 100))) * 100;
        resultElement1.textContent = `COGS% = ${Math.round(cogs * 100) / 100}%`;
        resultElement2.textContent = `Marketing Net = ${Math.round(mn * 100) / 100}%`;
        resultElement3.textContent = `Logistics Net = ${Math.round(ln * 100) / 100}%`;
        resultElement4.textContent = `Profit% = ${Math.round((1 - cogs / 100 - mn / 100 - ln / 100) * 10000) / 100}%`;

      }
    });
