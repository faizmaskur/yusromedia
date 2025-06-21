async function loadJury() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Juri</h2>
        <div id="question"></div>
        <div id="groups"></div>
    `;
    updateJuryMC();
}
async function loadMC() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>MC</h2>
        <div id="question"></div>
        <div id="groups"></div>
    `;
    updateJuryMC();
}
async function updateJuryMC() {
    const question = await (await fetch('/jury/question')).json();
    const groups = await (await fetch('/jury/groups')).json();
    document.getElementById('question').innerHTML = question ? `<h3>${question.question_text}</h3>` : 'Belum ada pertanyaan';
    document.getElementById('groups').innerHTML = groups.map(g => `<p>${g.group_name}: ${g.score || 0}</p>`).join('');
    setTimeout(updateJuryMC, 5000); // Refresh setiap 5 detik
}
