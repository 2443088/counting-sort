document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Numbers tab functionality
    const numbers = [2, 1, 2, 4, 3, 5, 4];
    let currentStep = 0;
    const steps = document.querySelectorAll('#numbers .step');
    let countArray = [];
    
    // Initialize number boxes
    const numberBoxes = document.querySelector('.number-boxes');
    numbers.forEach(num => {
        const box = document.createElement('div');
        box.className = 'number-box';
        box.textContent = num;
        numberBoxes.appendChild(box);
    });
    
    // Next/Previous step controls
    document.getElementById('next-step').addEventListener('click', nextStep);
    document.getElementById('prev-step').addEventListener('click', prevStep);
    document.getElementById('restart').addEventListener('click', restartAnimation);
    
    function nextStep() {
        if (currentStep < steps.length) {
            if (currentStep > 0) steps[currentStep - 1].classList.remove('active');
            steps[currentStep].classList.add('active');
            animateStep(currentStep);
            currentStep++;
        }
    }
    
    function prevStep() {
        if (currentStep > 1) {
            steps[currentStep - 1].classList.remove('active');
            currentStep--;
            steps[currentStep - 1].classList.add('active');
            // Would need to reset animation state here
        }
    }
    
    function restartAnimation() {
        steps.forEach(step => step.classList.remove('active'));
        currentStep = 0;
        // Reset all animations
    }
    
    function animateStep(stepIndex) {
        switch(stepIndex) {
            case 0: // Find max value
                animateMaxValue();
                break;
            case 1: // Create count array
                createCountArray();
                break;
            case 2: // Count occurrences
                countOccurrences();
                break;
            case 3: // Modify count array
                modifyCountArray();
                break;
            case 4: // Create output array
                createOutputArray();
                break;
            case 5: // Build output array
                buildOutputArray();
                break;
            case 6: // Final sorted array
                showFinalArray();
                break;
        }
    }
    
    function animateMaxValue() {
        const boxes = document.querySelectorAll('.number-box');
        let currentMax = -Infinity;
        let maxIndex = -1;
        
        boxes.forEach((box, i) => {
            setTimeout(() => {
                boxes.forEach(b => b.classList.remove('highlight'));
                box.classList.add('highlight');
                
                const value = parseInt(box.textContent);
                if (value > currentMax) {
                    currentMax = value;
                    if (maxIndex >= 0) boxes[maxIndex].classList.remove('max');
                    maxIndex = i;
                    box.classList.add('max');
                }
                
                document.querySelector('.max-value-display').innerHTML = 
                    `<p>Current Maximum: <span class="highlight">${currentMax}</span></p>`;
                
                if (i === boxes.length - 1) {
                    setTimeout(() => {
                        document.querySelector('.max-value-display').innerHTML += 
                            `<p>Final Maximum Value: <strong>${currentMax}</strong></p>`;
                    }, 500);
                }
            }, i * 850);
        });
    }

    function createCountArray() {
        const step2 = document.getElementById('step2');
        step2.innerHTML = `
            <h3 style="font-family: 'Comic Sans MS', cursive, sans-serif;">Step 2: Create Count Array</h3>
            <div class="code">count = [0] * (max_val + 1)  # max_val = ${Math.max(...numbers)}</div>
            <div class="visualization">
                <div class="array-display">
                    <div class="original-array"></div>
                    <div class="count-array"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        const originalArrayDisplay = step2.querySelector('.original-array');
        const countArrayDisplay = step2.querySelector('.count-array');
        const processingText = step2.querySelector('.processing-text');
        const maxVal = Math.max(...numbers);

        // Display original array
        originalArrayDisplay.innerHTML = `
            <h4>Original Array</h4>
            <div class="boxes">
                ${numbers.map((num, i) => `
                    <div class="box" data-index="${i}" data-value="${num}">
                        <div class="index">${i}</div>
                        <div class="value">${num}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Initialize count array display
        const countArray = Array(maxVal + 1).fill(0);
        countArrayDisplay.innerHTML = `
            <h4>Count Array</h4>
            <div class="boxes">
                ${countArray.map((count, i) => `
                    <div class="box empty" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Show explanation
        processingText.innerHTML = `
            Created count array with size ${maxVal + 1} initialized to zeros
            <div class="final-result">[${countArray.join(', ')}]</div>
        `;

        // Highlight the code
        document.querySelector('#step2 .code').classList.add('executing');
    }

    function countOccurrences() {
        const step3 = document.getElementById('step3');
        step3.innerHTML = `
            <h3 style="font-family: 'Comic Sans MS', cursive, sans-serif;">Step 3: Count Occurrences</h3>
            <div class="code">for num in arr:<br>&nbsp;&nbsp;count[num] += 1</div>
            <div class="visualization">
                <div class="array-display">
                    <div class="original-array"></div>
                    <div class="count-array"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        const originalArrayDisplay = step3.querySelector('.original-array');
        const countArrayDisplay = step3.querySelector('.count-array');
        const processingText = step3.querySelector('.processing-text');
        const maxVal = Math.max(...numbers);
        let countArray = Array(maxVal + 1).fill(0);

        // Display arrays
        originalArrayDisplay.innerHTML = `
            <h4>Original Array</h4>
            <div class="boxes">
                ${numbers.map((num, i) => `
                    <div class="box original-box" data-index="${i}" data-value="${num}">
                        <div class="index">${i}</div>
                        <div class="value">${num}</div>
                    </div>
                `).join('')}
            </div>
        `;

        countArrayDisplay.innerHTML = `
            <h4>Count Array</h4>
            <div class="boxes">
                ${countArray.map((count, i) => `
                    <div class="box count-box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Process each number
        const originalBoxes = step3.querySelectorAll('.original-box');
        const countBoxes = step3.querySelectorAll('.count-box');

        numbers.forEach((num, index) => {
            setTimeout(() => {
                // Reset highlights
                originalBoxes.forEach(box => box.classList.remove('active'));
                countBoxes.forEach(box => box.classList.remove('active', 'updated'));

                // Highlight current number
                originalBoxes[index].classList.add('active');
                
                // Update count array
                countArray[num]++;
                countBoxes[num].querySelector('.value').textContent = countArray[num];
                countBoxes[num].classList.add('active', 'updated');

                // Update processing text
                processingText.innerHTML = `
                    Processing: arr[${index}] = ${num} → count[${num}] = ${countArray[num]}
                `;

                // Show final result
                if (index === numbers.length - 1) {
                    processingText.innerHTML += `
                        <div class="final-result">
                            Final Count Array: [${countArray.join(', ')}]
                        </div>
                    `;
                }
            }, index * 850);
        });

        // Highlight the code
        document.querySelector('#step3 .code').classList.add('executing');
    }

    function modifyCountArray() {
        const step4 = document.getElementById('step4');
        step4.innerHTML = `
            <h3 style="font-family: 'Comic Sans MS', cursive, sans-serif;">Step 4: Modify Count Array</h3>
            <div class="code">for i in range(1, len(count)):<br>&nbsp;&nbsp;count[i] += count[i-1]</div>
            <div class="visualization">
                <div class="array-display">
                    <div class="count-array"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        const countArrayDisplay = step4.querySelector('.count-array');
        const processingText = step4.querySelector('.processing-text');
        const maxVal = Math.max(...numbers);
        
        // Initialize count array from previous step
        let countArray = Array(maxVal + 1).fill(0);
        numbers.forEach(num => countArray[num]++);

        // Display count array
        countArrayDisplay.innerHTML = `
            <h4>Count Array</h4>
            <div class="boxes">
                ${countArray.map((count, i) => `
                    <div class="box count-box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Process each element
        const countBoxes = countArrayDisplay.querySelectorAll('.count-box');

        for (let i = 1; i <= maxVal; i++) {
            setTimeout(() => {
                // Reset highlights
                countBoxes.forEach(box => box.classList.remove('active', 'previous', 'updated'));

                // Highlight current and previous boxes
                countBoxes[i].classList.add('active');
                countBoxes[i-1].classList.add('previous');
                
                // Update count value
                const prevValue = parseInt(countBoxes[i-1].querySelector('.value').textContent);
                const currentValue = parseInt(countBoxes[i].querySelector('.value').textContent);
                countArray[i] = currentValue + prevValue;
                countBoxes[i].querySelector('.value').textContent = countArray[i];
                countBoxes[i].classList.add('updated');

                // Update processing text
                processingText.innerHTML = `
                    count[${i}] += count[${i-1}] → ${currentValue} + ${prevValue} = ${countArray[i]}
                    <br>${countArray[i]} elements will be ≤ ${i}
                `;

                // Show final result
                if (i === maxVal) {
                    processingText.innerHTML += `
                        <div class="final-result">
                            Modified Count Array: [${countArray.join(', ')}]
                        </div>
                    `;
                }
            }, i * 850);
        }

        // Highlight the code
        document.querySelector('#step4 .code').classList.add('executing');
    }

    function createOutputArray() {
        const step5 = document.getElementById('step5');
        step5.innerHTML = `
            <h3 style="font-family: 'Comic Sans MS', cursive, sans-serif;">Step 5: Create Output Array</h3>
            <div class="code">output = [0] * len(arr)  # Initialize output array</div>
            <div class="visualization">
                <div class="array-display">
                    <div class="original-array"></div>
                    <div class="count-array"></div>
                    <div class="output-array"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        const originalArrayDisplay = step5.querySelector('.original-array');
        const countArrayDisplay = step5.querySelector('.count-array');
        const outputArrayDisplay = step5.querySelector('.output-array');
        const processingText = step5.querySelector('.processing-text');

        // Initialize arrays
        const maxVal = Math.max(...numbers);
        const countArray = Array(maxVal + 1).fill(0);
        numbers.forEach(num => countArray[num]++);
        for (let i = 1; i <= maxVal; i++) {
            countArray[i] += countArray[i - 1];
        }

        // Display original array
        originalArrayDisplay.innerHTML = `
            <h4>Original Array</h4>
            <div class="boxes">
                ${numbers.map((num, i) => `
                    <div class="box" data-index="${i}" data-value="${num}">
                        <div class="index">${i}</div>
                        <div class="value">${num}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Display count array
        countArrayDisplay.innerHTML = `
            <h4>Count Array</h4>
            <div class="boxes">
                ${countArray.map((count, i) => `
                    <div class="box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Initialize empty output array
        const outputArray = Array(numbers.length).fill(null);
        outputArrayDisplay.innerHTML = `
            <h4>Output Array</h4>
            <div class="boxes">
                ${outputArray.map((_, i) => `
                    <div class="box empty" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value"></div>
                    </div>
                `).join('')}
            </div>
        `;

        // Show initialization explanation
        processingText.innerHTML = `
            Initialized output array with ${numbers.length} empty slots
        `;

        // Highlight the code being executed
        document.querySelector('#step5 .code').classList.add('executing');
    }

    function buildOutputArray() {
        const step6 = document.getElementById('step6');
        step6.innerHTML = `
            <h3 style="font-family: 'Comic Sans MS', cursive, sans-serif;">Step 6: Build Output Array</h3>
            <div class="code">for num in reversed(arr):<br>
            &nbsp;&nbsp;output[count[num] - 1] = num<br>
            &nbsp;&nbsp;count[num] -= 1</div>
            <div class="visualization">
                <div class="array-display">
                    <div class="original-array"></div>
                    <div class="count-array"></div>
                    <div class="output-array"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        const originalArrayDisplay = step6.querySelector('.original-array');
        const countArrayDisplay = step6.querySelector('.count-array');
        const outputArrayDisplay = step6.querySelector('.output-array');
        const processingText = step6.querySelector('.processing-text');

        // Initialize arrays
        const maxVal = Math.max(...numbers);
        let countArray = Array(maxVal + 1).fill(0);
        numbers.forEach(num => countArray[num]++);
        for (let i = 1; i <= maxVal; i++) {
            countArray[i] += countArray[i - 1];
        }
        const outputArray = Array(numbers.length).fill(null);

        // Display arrays
        originalArrayDisplay.innerHTML = `
            <h4>Original Array</h4>
            <div class="boxes">
                ${numbers.map((num, i) => `
                    <div class="box original-box" data-index="${i}" data-value="${num}">
                        <div class="index">${i}</div>
                        <div class="value">${num}</div>
                    </div>
                `).join('')}
            </div>
        `;

        countArrayDisplay.innerHTML = `
            <h4>Count Array</h4>
            <div class="boxes">
                ${countArray.map((count, i) => `
                    <div class="box count-box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        outputArrayDisplay.innerHTML = `
            <h4>Output Array</h4>
            <div class="boxes">
                ${outputArray.map((_, i) => `
                    <div class="box output-box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value"></div>
                    </div>
                `).join('')}
            </div>
        `;

        // Highlight the code
        document.querySelector('#step6 .code').classList.add('executing');

        // Process in reverse order
        const originalBoxes = step6.querySelectorAll('.original-box');
        const countBoxes = step6.querySelectorAll('.count-box');
        const outputBoxes = step6.querySelectorAll('.output-box');

        [...numbers].reverse().forEach((num, reverseIndex) => {
            const originalIndex = numbers.length - 1 - reverseIndex;
            
            setTimeout(() => {
                // Reset highlights
                originalBoxes.forEach(box => box.classList.remove('active'));
                countBoxes.forEach(box => box.classList.remove('active'));
                outputBoxes.forEach(box => box.classList.remove('active', 'updated'));

                // Highlight current original array element
                originalBoxes[originalIndex].classList.add('active');

                // Highlight count array
                countBoxes[num].classList.add('active');

                // Calculate position
                const position = countArray[num] - 1;
                
                // Update output array
                outputArray[position] = num;
                outputBoxes[position].querySelector('.value').textContent = num;
                outputBoxes[position].classList.add('active', 'updated');
                outputBoxes[position].classList.remove('empty');

                // Update count array
                countArray[num]--;
                countBoxes[num].querySelector('.value').textContent = countArray[num];
                countBoxes[num].classList.add('updated');

                // Update processing text
                processingText.innerHTML = `
                    Processing: arr[${originalIndex}] = ${num}<br>
                    → output[count[${num}] - 1] = output[${countArray[num]}] = ${num}<br>
                    → count[${num}] decreased to ${countArray[num]}
                `;

                // Show final result
                if (reverseIndex === numbers.length - 1) {
                    processingText.innerHTML += `
                        <div class="final-result">
                            Final Sorted Array: [${outputArray.join(', ')}]
                        </div>
                    `;
                }
            }, reverseIndex * 1800);
        });
    }

    function showFinalArray() {
        const step7 = document.getElementById('step7');
        step7.innerHTML = `
            <h3 style="font-family: 'Comic Sans MS', cursive, sans-serif;">Step 7: Final Sorted Array</h3>
            <div class="code"># Sorting complete!</div>
            <div class="final-array-container">
                <div class="final-array"></div>
                <div class="celebration"></div>
                <div class="complexity">
                    <p>Time Complexity: O(n + k)</p>
                    <p>Space Complexity: O(n + k)</p>
                    <p>Where n is number of elements and k is range of input</p>
                </div>
            </div>
        `;

        // Get the sorted array from step 6's output
        const outputArray = [...numbers].sort((a, b) => a - b);
        const finalArrayDisplay = step7.querySelector('.final-array');
        
        // Display final array with celebration
        finalArrayDisplay.innerHTML = `
            <h4>Sorted Array</h4>
            <div class="boxes">
                ${outputArray.map((num, i) => `
                    <div class="box" data-value="${num}" style="animation-delay: ${i * 0.2}s">
                        <div class="value">${num}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add celebration effects
        const celebration = step7.querySelector('.celebration');
        celebration.innerHTML = `
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
        `;

        // Highlight the code
        document.querySelector('#step7 .code').classList.add('executing');
    }

    
    // Add this to your existing script.js file, replacing the Naruto tab functionality

    // Naruto tab functionality - improved version
    const narutoCharacters = [
        { name: "Hyuga Hinata", clan: "hyuga" },
        { name: "Hyuga Neji", clan: "hyuga" },
        { name: "Namikaze Minato", clan: "namikaze" },
        { name: "Otsutsuki Hagoromo", clan: "otsutsuki" },
        { name: "Otsutsuki Kaguya", clan: "otsutsuki" },
        { name: "Sarutobi Asuma", clan: "sarutobi" },
        { name: "Sarutobi Hiruzen", clan: "sarutobi" },
        { name: "Sarutobi Konohamaru", clan: "sarutobi" },
        { name: "Sarutobi Kurenai", clan: "sarutobi" },
        { name: "Senju Hashirama", clan: "senju" },
        { name: "Senju Tobirama", clan: "senju" },
        { name: "Senju Tsunade", clan: "senju" },
        { name: "Uchiha Itachi", clan: "uchiha" },
        { name: "Uchiha Izumi", clan: "uchiha" },
        { name: "Uchiha Madara", clan: "uchiha" },
        { name: "Uchiha Obito", clan: "uchiha" },
        { name: "Uchiha Sasuke", clan: "uchiha" },
        { name: "Uzumaki Kushina", clan: "uzumaki" },
        { name: "Uzumaki Mito", clan: "uzumaki" },
        { name: "Uzumaki Nagato", clan: "uzumaki" },
        { name: "Uzumaki Naruto", clan: "uzumaki" }
    ];

    // Clan information with order for counting sort
    const clans = {
        "hyuga": { name: "Hyuga", order: 1 },
        "namikaze": { name: "Namikaze", order: 2 },
        "otsutsuki": { name: "Otsutsuki", order: 3 },
        "sarutobi": { name: "Sarutobi", order: 4 },
        "senju": { name: "Senju", order: 5 },
        "uchiha": { name: "Uchiha", order: 6 },
        "uzumaki": { name: "Uzumaki", order: 7 }
    };

    // Initialize Naruto tab
    let currentNarutoStep = 0;
    let narutoOriginalArray = [];
    let clanCounts = {};
    let isSortingComplete = false;
    let countnArray = [];
    let outputArray = [];

    function initializeNarutoTab() {
        initializeClans();
        initializeCharacters();
        resetNarutoSteps();
        currentNarutoStep = 0;
        isSortingComplete = false;
        document.getElementById('next-naruto-step').disabled = true;
    }

    function initializeClans() {
        const clansContainer = document.querySelector('.clans-container');
        clansContainer.innerHTML = '';
        
        Object.keys(clans).forEach(clanKey => {
            const clan = clans[clanKey];
            const clanElement = document.createElement('div');
            clanElement.className = 'clan';
            clanElement.dataset.clan = clanKey;
            clanElement.dataset.order = clan.order;
            clanElement.innerHTML = `
                <img src="assets/clans/${clanKey}.png" alt="${clan.name}">
                <h4>${clan.name}</h4>
                <div class="clan-count">0</div>
                <div class="clan-members"></div>
            `;
            clansContainer.appendChild(clanElement);
        });
    }

    function initializeCharacters() {
        const charactersContainer = document.querySelector('.characters-container');
        charactersContainer.innerHTML = '';
        
        narutoCharacters.forEach(char => {
            const charElement = document.createElement('div');
            charElement.className = 'character';
            charElement.dataset.clan = char.clan;
            charElement.dataset.name = char.name;
            charElement.innerHTML = `<img src="assets/characters/${char.name.toLowerCase().replace(/ /g, '_')}.png" alt="${char.name}" title="${char.name}">`;
            charactersContainer.appendChild(charElement);
        });
    }

    function resetNarutoSteps() {
        document.querySelectorAll('.step-content').forEach(step => {
            step.style.display = 'none';
        });
        document.getElementById('naruto-step1').style.display = 'block';
    }

    // Naruto animation controls
    document.getElementById('start-naruto').addEventListener('click', startNarutoSorting);
    document.getElementById('reset-naruto').addEventListener('click', initializeNarutoTab);
    document.getElementById('next-naruto-step').addEventListener('click', nextNarutoStep);

    function startNarutoSorting() {
        // Reset state
        document.querySelectorAll('.clan .clan-count').forEach(el => el.textContent = '0');
        document.querySelectorAll('.clan-members').forEach(el => el.innerHTML = '');
        document.querySelectorAll('.character').forEach(char => {
            char.style.transform = '';
            char.style.opacity = '1';
            char.classList.remove('profile-pic');
        });
        
        // Create original array representation
        narutoOriginalArray = narutoCharacters.map(char => clans[char.clan].order);
        
        // Group characters by clan
        const clanGroups = {};
        narutoCharacters.forEach(char => {
            if (!clanGroups[char.clan]) clanGroups[char.clan] = [];
            clanGroups[char.clan].push(char);
        });
        
        // Calculate clan counts
        clanCounts = {};
        Object.keys(clans).forEach(clanKey => {
            clanCounts[clanKey] = clanGroups[clanKey] ? clanGroups[clanKey].length : 0;
        });
        
        // Animate characters moving to their clans
        let delay = 0;
        Object.keys(clanGroups).forEach(clan => {
            clanGroups[clan].forEach((char, i) => {
                const charElement = document.querySelector(`.character[data-name="${char.name}"]`);
                const clanElement = document.querySelector(`.clan[data-clan="${clan}"]`);
                const clanMembersContainer = clanElement.querySelector('.clan-members');
                
                setTimeout(() => {
                    // Create profile pic version
                    charElement.classList.add('profile-pic');
                    
                    // Calculate movement
                    const clanRect = clanElement.getBoundingClientRect();
                    const charRect = charElement.getBoundingClientRect();
                    const deltaX = clanRect.left + clanRect.width/2 - charRect.left - charRect.width/2;
                    const deltaY = clanRect.top + clanRect.height/2 - charRect.top - charRect.height/2;
                    
                    // Animate movement
                    charElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                    charElement.style.opacity = '0.7';
                    charElement.style.zIndex = '10';
                    
                    // Update clan count
                    const countElement = clanElement.querySelector('.clan-count');
                    countElement.textContent = parseInt(countElement.textContent) + 1;
                    
                    // Add to clan members container
                    setTimeout(() => {
                        const profilePic = charElement.cloneNode(true);
                        profilePic.classList.add('profile-pic');
                        profilePic.style.transform = '';
                        profilePic.style.opacity = '1';
                        profilePic.style.margin = '5px';
                        clanMembersContainer.appendChild(profilePic);
                        charElement.style.display = 'none';
                    }, 500);
                    
                }, delay);
                
                delay += 300;
            });
        });
        
        // After grouping, enable next step button and show initial array
        setTimeout(() => {
            isSortingComplete = true;
            document.getElementById('next-naruto-step').disabled = false;
            
            // Show initial array display (before step 1)
            const step1 = document.getElementById('naruto-step1');
            step1.innerHTML = `
                <h3>Initial Clan Counts</h3>
                <div class="initial-counts-display">
                    <div class="clan-counts-container">
                        ${Object.keys(clans).map(clan => `
                            <div class="clan-count-box" data-clan="${clan}">
                                <div class="clan-name">${clans[clan].name}</div>
                                <div class="count-value">${clanCounts[clan] || 0}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="original-array-note">
                        <p>Original Array: [${narutoOriginalArray.join(', ')}]</p>
                        <p>Clan Mapping: Hyuga=1, Namikaze=2, Otsutsuki=3, Sarutobi=4, Senju=5, Uchiha=6, Uzumaki=7</p>
                    </div>
                </div>
            `;
        }, delay + 1000);
    }

    function nextNarutoStep() {
        if (!isSortingComplete) return;
        
        // Hide current step
        const currentStep = document.getElementById(`naruto-step${currentNarutoStep}`);
        if (currentStep) currentStep.style.display = 'none';
        
        // Move to next step
        currentNarutoStep++;
        if (currentNarutoStep > 7) currentNarutoStep = 1;
        
        // Show next step
        const nextStep = document.getElementById(`naruto-step${currentNarutoStep}`);
        if (nextStep) {
            nextStep.style.display = 'block';
            animateNarutoStep(currentNarutoStep);
        }
    }

    function animateNarutoStep(stepIndex) {
        switch(stepIndex) {
            case 1:
                animateNarutoStep1();
                break;
            case 2:
                animateNarutoStep2();
                break;
            case 3:
                animateNarutoStep3();
                break;
            case 4:
                animateNarutoStep4();
                break;
            case 5:
                animateNarutoStep5();
                break;
            case 6:
                animateNarutoStep6();
                break;
            case 7:
                animateNarutoStep7();
                break;
        }
    }

    function animateNarutoStep1() {
        const step1 = document.getElementById('naruto-step1');
        step1.innerHTML = `
            <h3>Step 1: Find Most Populated Clan</h3>
            <div class="code">max_clan = max(clans) <span class="comment"># Finds the clan with most members</span></div>
            <div class="original-array-display">
                <h4>Original Array</h4>
                <div class="clan-counts-display"></div>
            </div>
        `;
        
        const clanCountsDisplay = step1.querySelector('.clan-counts-display');
        
        // Calculate clan counts
        const clanCounts = {};
        narutoCharacters.forEach(char => {
            clanCounts[char.clan] = (clanCounts[char.clan] || 0) + 1;
        });
        
        // Display clan counts
        clanCountsDisplay.innerHTML = `
            <div class="clan-counts-container">
                ${Object.keys(clans).map(clan => `
                    <div class="clan-count-box" data-clan="${clan}" data-count="${clanCounts[clan] || 0}">
                        <div class="clan-name">${clans[clan].name}</div>
                        <div class="count-value">${clanCounts[clan] || 0}</div>
                    </div>
                `).join('')}
            </div>
            <div class="max-clan-display">
                Searching for most populated clan...
            </div>
        `;
        
        // Animate finding max clan
        const clanBoxes = clanCountsDisplay.querySelectorAll('.clan-count-box');
        let currentMax = 0;
        let maxClan = '';
        
        clanBoxes.forEach((box, index) => {
            setTimeout(() => {
                // Reset previous highlights
                clanBoxes.forEach(b => {
                    b.classList.remove('highlight', 'current-max');
                });
                
                // Highlight current box
                box.classList.add('highlight');
                
                const count = parseInt(box.dataset.count);
                
                // Update max if current count is higher
                if (count > currentMax) {
                    currentMax = count;
                    maxClan = box.dataset.clan;
                    
                    // Update max display
                    clanCountsDisplay.querySelector('.max-clan-display').innerHTML = `
                        Current max: <strong>${clans[maxClan].name}</strong> with ${currentMax} members
                    `;
                }
                
                // On last element, show final result
                if (index === clanBoxes.length - 1) {
                    setTimeout(() => {
                        // Highlight final max clan
                        clanBoxes.forEach(b => {
                            b.classList.remove('highlight', 'current-max');
                            if (b.dataset.clan === maxClan) {
                                b.classList.add('current-max');
                            }
                        });
                        
                        clanCountsDisplay.querySelector('.max-clan-display').innerHTML = `
                            Most populated clan: <strong>${clans[maxClan].name}</strong> with ${currentMax} members
                        `;
                    }, 1000);
                }
            }, index * 1000); // 1 second delay between each box
        });
    }

    function animateNarutoStep2() {
        const step2 = document.getElementById('naruto-step2');
        step2.innerHTML = `
            <h3>Step 2: Create Count Array</h3>
            <div class="code">count = [0] * (max_val + 1)</div>
            <div class="visualization">
                <div class="array-display">
                    <div class="original-array"></div>
                    <div class="count-array"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        const originalArrayDisplay = step2.querySelector('.original-array');
        const countArrayDisplay = step2.querySelector('.count-array');
        const processingText = step2.querySelector('.processing-text');
        
        // Get max value from Step 1 (should be 5 based on clan counts)
        const maxVal = 5; // Because Uchiha=6 but max count value is 5 (from the correct PNG)
        
        // Display original array in clan count format (like the correct PNG)
        originalArrayDisplay.innerHTML = `
            <h4>Original Array (Clan Counts)</h4>
            <div class="clan-counts-container">
                ${Object.keys(clans).map(clan => `
                    <div class="clan-count-box" data-clan="${clan}">
                        <div class="clan-name">${clans[clan].name}</div>
                        <div class="count-value">${clanCounts[clan] || 0}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Initialize count array display (size should be 6 since max value is 5)
        countArray = Array(maxVal + 1).fill(0); // Creates [0, 0, 0, 0, 0, 0]
        countArrayDisplay.innerHTML = `
            <h4>Count Array (size ${maxVal + 1})</h4>
            <div class="boxes">
                ${countArray.map((count, i) => `
                    <div class="box empty" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Show correct explanation
        processingText.innerHTML = `
            Created count array with size ${maxVal + 1} (max value ${maxVal} + 1)
            <div class="final-result">Initialized to zeros: [${countArray.join(', ')}]</div>
        `;
    }

    function animateNarutoStep3() {
        const step3 = document.getElementById('naruto-step3');
        step3.innerHTML = `
            <h3>Step 3: Count Occurrences</h3>
            <div class="code">
                for num in arr:<br>
                &nbsp;&nbsp;count[num] += 1
            </div>
            <div class="visualization">
                <div class="array-display">
                    <div class="original-array"></div>
                    <div class="count-array"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        const originalArrayDisplay = step3.querySelector('.original-array');
        const countArrayDisplay = step3.querySelector('.count-array');
        const processingText = step3.querySelector('.processing-text');
        
        // CORRECT original array values
        const originalValues = [2, 1, 2, 4, 3, 5, 4];
        // Initialize count array with correct size (max value 5 + 1 = 6)
        countArray = [0, 0, 0, 0, 0, 0];
        
        // Display original array with boxes
        originalArrayDisplay.innerHTML = `
            <h4>Original Array</h4>
            <div class="array-note">
                <p>Clan mapping: Hyuga=1, Namikaze=2, Otsutsuki=3, Sarutobi=4, Senju=5, Uchiha=6, Uzumaki=7</p>
            </div>
            <div class="boxes">
                ${originalValues.map((num, i) => `
                    <div class="box" data-index="${i}" data-value="${num}">
                        <div class="index">${i}</div>
                        <div class="value">${num}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Initialize count array display
        countArrayDisplay.innerHTML = `
            <h4>Count Array</h4>
            <div class="boxes">
                ${countArray.map((count, i) => `
                    <div class="count-box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Get all box elements
        const originalBoxes = originalArrayDisplay.querySelectorAll('.box');
        const countBoxes = countArrayDisplay.querySelectorAll('.count-box');
        let currentIndex = 0;

        function processNextNumber() {
            if (currentIndex >= originalValues.length) {
                // Animation complete
                processingText.innerHTML += `
                    <div class="final-result">
                        Final Count Array: [${countArray.join(', ')}]
                    </div>
                `;
                return;
            }

            const num = originalValues[currentIndex];
            
            // Highlight current original array box
            originalBoxes[currentIndex].classList.add('active');
            
            // Highlight corresponding count box
            countBoxes[num].classList.add('active');
            
            processingText.innerHTML = `
                Processing: arr[${currentIndex}] = ${num} → count[${num}] = ${countArray[num] + 1}
            `;

            // Update count array after a short delay
            setTimeout(() => {
                countArray[num]++;
                countBoxes[num].querySelector('.value').textContent = countArray[num];
                countBoxes[num].classList.add('updated');
                
                // Reset highlights after update
                setTimeout(() => {
                    originalBoxes[currentIndex].classList.remove('active');
                    countBoxes[num].classList.remove('active', 'updated');
                    currentIndex++;
                    processNextNumber();
                }, 800);
            }, 500);
        }

        // Start processing
        processNextNumber();
    }

    function animateNarutoStep4() {
        const step4 = document.getElementById('naruto-step4');
        step4.innerHTML = `
            <h3>Step 4: Modify Count Array</h3>
            <div class="code">
                for i in range(1, len(count)):<br>
                &nbsp;&nbsp;count[i] += count[i-1]
            </div>
            <div class="visualization">
                <div class="array-display">
                    <div class="count-array-before"></div>
                    <div class="count-array-after"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        const countArrayBefore = step4.querySelector('.count-array-before');
        const countArrayAfter = step4.querySelector('.count-array-after');
        const processingText = step4.querySelector('.processing-text');
        
        // Initialize with CORRECT values from Step 3 result
        countArray = [0, 1, 2, 1, 2, 1]; // From previous step
        const modifiedCountArray = [...countArray];
        
        // Display initial count array
        countArrayBefore.innerHTML = `
            <h4>Count Array (Before)</h4>
            <div class="boxes">
                ${countArray.map((count, i) => `
                    <div class="count-box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Display array that will be modified
        countArrayAfter.innerHTML = `
            <h4>Count Array (After)</h4>
            <div class="boxes">
                ${countArray.map((count, i) => `
                    <div class="count-box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Get all box elements
        const beforeBoxes = countArrayBefore.querySelectorAll('.count-box');
        const afterBoxes = countArrayAfter.querySelectorAll('.count-box');
        let currentIndex = 1; // Start from index 1

        function processNextIndex() {
            if (currentIndex >= countArray.length) {
                // Animation complete
                processingText.innerHTML += `
                    <div class="final-result">
                        Modified Count Array: [${modifiedCountArray.join(', ')}]
                    </div>
                `;
                return;
            }

            // Highlight current and previous boxes in BEFORE array
            beforeBoxes[currentIndex].classList.add('current');
            beforeBoxes[currentIndex-1].classList.add('previous');
            
            // Highlight corresponding boxes in AFTER array
            afterBoxes[currentIndex].classList.add('current');
            afterBoxes[currentIndex-1].classList.add('previous');
            
            processingText.innerHTML = `
                count[${currentIndex}] += count[${currentIndex-1}]<br>
                → ${modifiedCountArray[currentIndex]} + ${modifiedCountArray[currentIndex-1]} = ${modifiedCountArray[currentIndex] + modifiedCountArray[currentIndex-1]}
            `;

            // Update after array after a short delay
            setTimeout(() => {
                modifiedCountArray[currentIndex] += modifiedCountArray[currentIndex-1];
                afterBoxes[currentIndex].querySelector('.value').textContent = modifiedCountArray[currentIndex];
                afterBoxes[currentIndex].classList.add('updated');
                
                // Reset highlights after update
                setTimeout(() => {
                    beforeBoxes[currentIndex].classList.remove('current');
                    beforeBoxes[currentIndex-1].classList.remove('previous');
                    afterBoxes[currentIndex].classList.remove('current', 'updated');
                    afterBoxes[currentIndex-1].classList.remove('previous');
                    
                    currentIndex++;
                    processNextIndex();
                }, 800);
            }, 500);
        }

        // Start processing
        processNextIndex();
    }

    function animateNarutoStep5() {
        const step5 = document.getElementById('naruto-step5');
        step5.innerHTML = `
            <h3>Step 5: Create Output Array</h3>
            <div class="code">output = [None] * len(arr) <span class="comment"># Initialize empty output array</span></div>
            <div class="visualization">
                <div class="array-display">
                    <div class="original-array"></div>
                    <div class="count-array"></div>
                    <div class="output-array"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        const originalArrayDisplay = step5.querySelector('.original-array');
        const countArrayDisplay = step5.querySelector('.count-array');
        const outputArrayDisplay = step5.querySelector('.output-array');
        const processingText = step5.querySelector('.processing-text');
        
        // CORRECT values from previous steps
        const originalValues = [2, 1, 2, 4, 3, 5, 4];
        const modifiedCountArray = [0, 1, 3, 4, 6, 7]; // From Step 4
        const outputArray = Array(originalValues.length).fill(null);
        
        // Display original array
        originalArrayDisplay.innerHTML = `
            <h4>Original Array</h4>
            <div class="boxes">
                ${originalValues.map((num, i) => `
                    <div class="box" data-index="${i}" data-value="${num}">
                        <div class="index">${i}</div>
                        <div class="value">${num}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Display modified count array (from Step 4)
        countArrayDisplay.innerHTML = `
            <h4>Count Array (Modified)</h4>
            <div class="boxes">
                ${modifiedCountArray.map((count, i) => `
                    <div class="count-box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Initialize empty output array
        outputArrayDisplay.innerHTML = `
            <h4>Output Array (${outputArray.length} empty slots)</h4>
            <div class="boxes">
                ${outputArray.map((_, i) => `
                    <div class="output-box empty" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value"></div>
                    </div>
                `).join('')}
            </div>
        `;

        // Show explanation
        processingText.innerHTML = `
            Initialized output array with ${outputArray.length} empty slots
            <div class="final-result">[${outputArray.map(() => '∅').join(', ')}]</div>
        `;

        // Get all box elements for future steps
        const originalBoxes = originalArrayDisplay.querySelectorAll('.box');
        const countBoxes = countArrayDisplay.querySelectorAll('.count-box');
        const outputBoxes = outputArrayDisplay.querySelectorAll('.output-box');
        
        // Prepare for Step 6 by storing references
        window.narutoSortingData = {
            originalBoxes,
            countBoxes,
            outputBoxes,
            originalValues,
            modifiedCountArray,
            outputArray
        };
    }

    function animateNarutoStep6() {
        const step6 = document.getElementById('naruto-step6');
        step6.innerHTML = `
            <h3>Step 6: Build Output Array</h3>
            <div class="code">
                for num in reversed(arr):<br>
                &nbsp;&nbsp;output[count[num] - 1] = num<br>
                &nbsp;&nbsp;count[num] -= 1
            </div>
            <div class="visualization">
                <div class="array-display">
                    <div class="original-array"></div>
                    <div class="count-array"></div>
                    <div class="output-array"></div>
                </div>
                <div class="processing-text"></div>
            </div>
        `;

        // Retrieve data stored from Step 5
        const {
            originalBoxes,
            countBoxes,
            outputBoxes,
            originalValues,
            modifiedCountArray,
            outputArray
        } = window.narutoSortingData || {};

        // Make copies to avoid modifying originals directly
        const currentCountArray = [...modifiedCountArray];
        const currentOutputArray = [...outputArray];
        const processingText = step6.querySelector('.processing-text');

        // Display arrays (reusing existing elements)
        step6.querySelector('.original-array').innerHTML = `
            <h4>Original Array</h4>
            <div class="boxes">
                ${originalValues.map((num, i) => `
                    <div class="box" data-index="${i}" data-value="${num}">
                        <div class="index">${i}</div>
                        <div class="value">${num}</div>
                    </div>
                `).join('')}
            </div>
        `;

        step6.querySelector('.count-array').innerHTML = `
            <h4>Count Array</h4>
            <div class="boxes">
                ${currentCountArray.map((count, i) => `
                    <div class="count-box" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        step6.querySelector('.output-array').innerHTML = `
            <h4>Output Array</h4>
            <div class="boxes">
                ${currentOutputArray.map((val, i) => `
                    <div class="output-box ${val === null ? 'empty' : 'filled'}" data-index="${i}">
                        <div class="index">${i}</div>
                        <div class="value">${val || ''}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Get fresh references to boxes
        const originalBoxesNew = step6.querySelectorAll('.box');
        const countBoxesNew = step6.querySelectorAll('.count-box');
        const outputBoxesNew = step6.querySelectorAll('.output-box');

        // Process in reverse order
        let currentIndex = originalValues.length - 1;

        function processNextElement() {
            if (currentIndex < 0) {
                processingText.innerHTML += `
                    <div class="final-result">
                        Final Output Array: [${currentOutputArray.join(', ')}]
                    </div>
                `;
                return;
            }

            const num = originalValues[currentIndex];
            const position = currentCountArray[num] - 1;

            // Highlight current original array element
            originalBoxesNew[currentIndex].classList.add('active');

            // Highlight corresponding count array element
            countBoxesNew[num].classList.add('active');

            processingText.innerHTML = `
                Processing: arr[${currentIndex}] = ${num}<br>
                → position = count[${num}] - 1 = ${position}<br>
                → output[${position}] = ${num}
            `;

            setTimeout(() => {
                // Update output array
                currentOutputArray[position] = num;
                outputBoxesNew[position].querySelector('.value').textContent = num;
                outputBoxesNew[position].classList.remove('empty');
                outputBoxesNew[position].classList.add('filled', 'updated');

                // Update count array
                currentCountArray[num]--;
                countBoxesNew[num].querySelector('.value').textContent = currentCountArray[num];
                countBoxesNew[num].classList.add('updated');

                // Reset highlights after delay
                setTimeout(() => {
                    originalBoxesNew[currentIndex].classList.remove('active');
                    countBoxesNew[num].classList.remove('active', 'updated');
                    outputBoxesNew[position].classList.remove('updated');

                    currentIndex--;
                    processNextElement();
                }, 1000);
            }, 800);
        }

        // Start processing
        processNextElement();
    }

    function animateNarutoStep7() {
        const step7 = document.getElementById('naruto-step7');
        step7.innerHTML = `
            <h3>Step 7: Final Sorted Characters</h3>
            <div class="code"># Sorting complete!</div>
            <div class="final-result-container">
                <div class="sorted-characters"></div>
                <div class="celebration"></div>
                <div class="complexity">
                    <p>Time Complexity: O(n + k)</p>
                    <p>Space Complexity: O(n + k)</p>
                    <p>Where n is number of elements and k is range of input</p>
                </div>
            </div>
        `;

        const sortedCharactersContainer = step7.querySelector('.sorted-characters');
        const celebrationContainer = step7.querySelector('.celebration');
        
        // Get sorted output from Step 6
        const { outputArray, originalValues } = window.narutoSortingData || {};
        
        // Clan order mapping (update this if your clan numbering is different)
        const clanOrderMap = {
            1: 'Hyuga',
            2: 'Namikaze', 
            3: 'Otsutsuki',
            4: 'Sarutobi',
            5: 'Senju',
            6: 'Uchiha',
            7: 'Uzumaki'
        };

        // Group characters by clan from the original data
        const clanGroups = {};
        narutoCharacters.forEach(char => {
            if (!clanGroups[char.clan]) {
                clanGroups[char.clan] = [];
            }
            clanGroups[char.clan].push(char);
        });

        // Sort clans by their numeric order
        const sortedClans = Object.keys(clanGroups).sort((a, b) => {
            return clans[a].order - clans[b].order;
        });

        // Display sorted characters by clan
        sortedCharactersContainer.innerHTML = `
            <h4>Final Sorted Characters by Clan</h4>
            <div class="clan-groups">
                ${sortedClans.map(clanKey => {
                    const clan = clans[clanKey];
                    return `
                    <div class="clan-group" data-clan="${clanKey}">
                        <div class="clan-header">
                            <img src="assets/clans/${clanKey}.png" alt="${clan.name}">
                            <h5>${clan.name}</h5>
                        </div>
                        <div class="clan-members">
                            ${clanGroups[clanKey].map(char => {
                                const imgName = char.name.replace(/ /g, '_') + '.png';
                                return `
                                <div class="character-card">
                                    <img src="assets/characters/${imgName}" alt="${char.name}">
                                    <div class="character-name">${char.name}</div>
                                </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;

        // Add celebration effects
        celebrationContainer.innerHTML = `
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
        `;

        // Animate character appearances
        const characterCards = sortedCharactersContainer.querySelectorAll('.character-card');
        characterCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }


    // Initialize when tab is shown
    document.querySelector('[data-tab="naruto"]').addEventListener('click', initializeNarutoTab);

    // Initialize on load
    initializeNarutoTab();
}
)
