async function loadDisplay() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Tampilan Game</h2>
        <div id="game-board"></div>
    `;
    updateGame();
}
async function updateGame() {
    const question = await (await fetch('/display/question')).json();
    const board = document.getElementById('game-board');
    if (!question) {
        board.innerHTML = 'Menunggu pertanyaan...';
        setTimeout(updateGame, 2000);
        return;
    }
    if (question.session == 1) {
        board.innerHTML = `
            <h3>${question.question_text}</h3>
            ${question.options.map((opt, i) => `<button onclick="submitAnswer(${question.id}, '${opt}')">${opt}</button>`).join('')}
        `;
    } else if (question.session == 2) {
        board.innerHTML = `
            <h3>${question.question_text}</h3>
            <p>Petunjuk: ${question.hint}</p>
            <input id="answer" type="text">
            <button onclick="submitAnswer(${question.id}, document.getElementById('answer').value)">Kirim</button>
        `;
    } else if (question.session == 3) {
        board.innerHTML = `
            <h3>${question.question_text}</h3>
            <input id="answer" type="text">
            <button onclick="submitAnswer(${question.id}, document.getElementById('answer').value)">Kirim</button>
        `;
    }
}
async function submitAnswer(questionId, answer) {
    await fetch('/display/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, answer })
    });
}
