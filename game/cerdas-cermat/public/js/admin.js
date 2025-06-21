async function loadAdmin() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Admin Panel</h2>
        <div>
            <h3>Tambah Peserta</h3>
            <input id="name" placeholder="Nama Peserta">
            <input id="group_name" placeholder="Nama Grup">
            <input id="group_origin" placeholder="Asal Grup">
            <button onclick="addParticipant()">Tambah</button>
        </div>
        <div>
            <h3>Tambah Pertanyaan</h3>
            <select id="session">
                <option value="1">Sesi 1: Pilihan Ganda</option>
                <option value="2">Sesi 2: Tebak Kata</option>
                <option value="3">Sesi 3: Puzzle</option>
            </select>
            <input id="question_text" placeholder="Pertanyaan">
            <input id="correct_answer" placeholder="Jawaban Benar">
            <input id="options" placeholder="Pilihan (A,B,C,D untuk sesi 1, kosongkan untuk lainnya)">
            <input id="hint" placeholder="Petunjuk (untuk sesi 2)">
            <button onclick="addQuestion()">Tambah</button>
        </div>
        <div>
            <h3>Pilih Pertanyaan</h3>
            <select id="question_list"></select>
            <button onclick="displayQuestion()">Tampilkan</button>
        </div>
    `;
    const questions = await (await fetch('/admin/questions')).json();
    const questionList = document.getElementById('question_list');
    questions.forEach(q => {
        const option = document.createElement('option');
        option.value = q.id;
        option.textContent = q.question_text;
        questionList.appendChild(option);
    });
}

async function addParticipant() {
    const name = document.getElementById('name').value;
    const group_name = document.getElementById('group_name').value;
    const group_origin = document.getElementById('group_origin').value;
    await fetch('/admin/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, group_name, group_origin })
    });
    alert('Peserta ditambahkan');
}

async function addQuestion() {
    const session = document.getElementById('session').value;
    const question_text = document.getElementById('question_text').value;
    const correct_answer = document.getElementById('correct_answer').value;
    const options = document.getElementById('options').value.split(',');
    const hint = document.getElementById('hint').value;
    await fetch('/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session, question_text, answer_type: session == 1 ? 'multiple_choice' : session == 2 ? 'text' : 'puzzle', correct_answer, options, hint })
    });
    alert('Pertanyaan ditambahkan');
}
