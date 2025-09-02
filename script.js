document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('spinBtn');
    const addOptionBtn = document.getElementById('addOptionBtn');
    const inputList = document.getElementById('inputList');
    
    let options = [];
    // Színek palettája a kerék cikkelyeihez
    const colors = ['#f1c40f', '#e67e22', '#e74c3c', '#9b59b6', '#3498db', '#1abc9c', '#2ecc71', '#f39c12'];
 
    // Fő rajzoló funkció
    function drawWheel() {
        options = Array.from(document.querySelectorAll('.option-input'))
                       .map(input => input.value.trim())
                       .filter(value => value !== '');
 
        if (options.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
 
        const arcSize = (2 * Math.PI) / options.length;
        let startAngle = 0;
 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < options.length; i++) {
            const endAngle = startAngle + arcSize;
            
            ctx.beginPath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
            ctx.fill();
            
            // Szöveg rajzolása
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(startAngle + arcSize / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px Arial';
            ctx.fillText(options[i], canvas.width / 2 - 20, 10);
            ctx.restore();
            
            startAngle = endAngle;
        }
    }
 
    // Pörgető funkció - ÚJ, MEGBÍZHATÓ LOGIKÁVAL
      function spinWheel() {
        // Készítünk egy pillanatfelvételt az opciókról a pörgetés előtt
        const currentOptions = Array.from(document.querySelectorAll('.option-input'))
            .map(input => input.value.trim())
            .filter(value => value !== '');
 
        if (currentOptions.length < 2) {
            alert("Kérlek adj meg legalább 2 opciót!");
            return;
        }
 
        // 1. Válasszunk ki egy véletlenszerű nyertest a pörgetés előtt
        const winningOptionIndex = Math.floor(Math.random() * currentOptions.length);
        const winningOption = currentOptions[winningOptionIndex];
        
        // 2. Számítsuk ki a szükséges forgást
        const arcSizeInDegrees = 360 / currentOptions.length;
        const middleOfSegment = (winningOptionIndex * arcSizeInDegrees) + (arcSizeInDegrees / 2);
        
        // 3. A mutató a 12 órás pozíción van, ami 270 fok a rajzolási rendszernél
        // Tehát 270 fokkal el kell tolni a forgást, hogy a mutatóhoz igazodjon
        const spinToAngle = 270 - middleOfSegment;
        
        // 4. Adjunk hozzá extra fordulatokat, hogy a pörgetés látványos legyen
        const extraSpins = Math.floor(Math.random() * 5) + 5;
        const totalRotation = spinToAngle + (extraSpins * 360);
        
        spinBtn.disabled = true;
 
        canvas.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        canvas.style.transform = `rotate(${totalRotation}deg)`;
 
        setTimeout(() => {
            alert(`A nyertes: ${winningOption}`);
            spinBtn.disabled = false;
        }, 5000);
    }
    
    // Új opció beviteli mező hozzáadása
    function addOption() {
        const inputCount = document.querySelectorAll('.option-input').length;
        const newGroup = document.createElement('div');
        newGroup.classList.add('input-group');
        newGroup.innerHTML = `<input type="text" class="option-input" placeholder="Opció ${inputCount + 1}">`;
        inputList.appendChild(newGroup);
        newGroup.querySelector('input').focus();
        drawWheel();
    }
 
    // Eseményfigyelők
    spinBtn.addEventListener('click', spinWheel);
    addOptionBtn.addEventListener('click', addOption);
    inputList.addEventListener('input', drawWheel);
    
    // Kezdeti állapot rajzolása
    drawWheel();
});
