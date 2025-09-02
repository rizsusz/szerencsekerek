document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('spinBtn');
    const addOptionBtn = document.getElementById('addOptionBtn');
    const inputList = document.getElementById('inputList');
    
    let options = [];
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
 
    // Pörgető funkció
    function spinWheel() {
        options = Array.from(document.querySelectorAll('.option-input'))
                       .map(input => input.value.trim())
                       .filter(value => value !== '');
 
        if (options.length < 2) {
            alert("Kérlek adj meg legalább 2 opciót!");
            return;
        }
 
        const spins = Math.floor(Math.random() * 5) + 5;
        const totalRotation = spins * 360 + (Math.random() * 360);
        const arcSize = 360 / options.length;
 
        // Eltalált szegmens kiszámítása
        const winningAngle = 360 - (totalRotation % 360);
        const winningIndex = Math.floor(winningAngle / arcSize);
        
        spinBtn.disabled = true;
 
        canvas.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        canvas.style.transform = `rotate(${totalRotation}deg)`;
 
        setTimeout(() => {
            alert(`A nyertes: ${options[winningIndex]}`);
            spinBtn.disabled = false;
            // A kerék visszaállítása, hogy ne torzuljon az ismételt pörgetésnél
            canvas.style.transition = 'none';
            canvas.style.transform = `rotate(${totalRotation % 360}deg)`;
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
