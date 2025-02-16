//  start Menambahkan animasi mengetik pada teks
const btnKirim = document.querySelector('.btn-kirim');
const inputNama = document.getElementById('nama');
const frame1 = document.querySelector('.frame1');
const frame2 = document.querySelector('.frame2');
const frame3 = document.querySelector('.frame3');
const typingTextElementFrame2 = document.querySelector('.frame2 .typing-text-frame2');
const typingTextElementFrame3 = document.querySelector('.frame3 .typing-text-frame3');

// Tambahkan event listener untuk tombol kirim
btnKirim.addEventListener('click', () => {
    if (inputNama.value.trim() !== '') { // Pastikan input tidak kosong
        showFrame2();
    }
});

// Tambahkan event listener untuk input
inputNama.addEventListener('input', () => {
    // Aktifkan tombol jika input tidak kosong
    btnKirim.disabled = inputNama.value.trim() === '';
});

let index = 0;
let lines = []; // Deklarasikan variabel lines di luar fungsi

// Fungsi untuk memulai animasi mengetik
function typeLine(typingElement, index = 0, callback) {
    if (index < lines.length) {
        const line = lines[index]; // Ambil baris yang sesuai
        let charIndex = 0; // Indeks karakter untuk baris saat ini

        function typeCharacter() {
            if (charIndex < line.length) {
                typingElement.textContent += line[charIndex];
                charIndex++;
                setTimeout(typeCharacter, 150); // Kecepatan mengetik (ms)
            } else {
                // Setelah selesai mengetik baris, tunggu sejenak sebelum melanjutkan ke baris berikutnya
                setTimeout(() => {
                    typingElement.textContent = ''; // Kosongkan teks untuk baris berikutnya
                    index++; // Pindah ke baris berikutnya
                    typeLine(typingElement, index, callback); // Mulai mengetik dengan baris berikutnya
                }, 1000); // Tunggu 1 detik sebelum melanjutkan ke baris berikutnya
            }
        }

        typeCharacter(); // Mulai mengetik karakter
    } else {
        // Semua baris sudah ditampilkan, panggil callback jika ada
        if (callback) {
            callback();
        }
    }
}

// Fungsi untuk menampilkan frame2 dan memulai animasi mengetik
function showFrame2() {
    const text = `Halo Selamat datang di web Valentineku!\nKami harap web ini bisa menjadi bagian\ndari perayaan cinta dan kasih sayangmu di hari Valentine ini.\n✨ ❤️ 💕 Selamat menikmati!  💕 ❤️ ✨`;
    lines = text.split('\n'); // Memecah teks menjadi array baris
    frame1.style.display = 'none'; // Sembunyikan frame1
    frame2.style.display = 'flex'; // Tampilkan frame2
    typingTextElementFrame2.textContent = ''; // Kosongkan teks sebelumnya
    typeLine(typingTextElementFrame2, 0, () => {
        // Menyembunyikan frame2 dan menampilkan frame3 tanpa delay
        const nama = inputNama.value.trim();
        frame2.style.display = 'none'; // Sembunyikan frame2
        showFrame3(nama); // Tampilkan frame3
    });
}

// Fungsi untuk menampilkan frame3 dan memulai animasi mengetik
function showFrame3(nama) {
    const text = `Hai ${nama}! Aku mau nunjukin sesuatu nih...\nPasti bikin kamu penasaran deh!`;
    lines = text.split('\n'); // Memecah teks menjadi array baris
    
    frame3.style.display = 'flex'; // Tampilkan frame3
    typingTextElementFrame3.textContent = ''; // Kosongkan teks sebelumnya
    
    // Mulai mengetik dengan baris pertama
    typeLine(typingTextElementFrame3, 0, () => {
        // Tampilkan tombol setelah animasi selesai tanpa delay
        const btnLihat = document.querySelector('.btn-lihat');
        btnLihat.style.display = 'block'; // Tampilkan tombol
    });
}