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
    const text = `Halo Selamat datang di web Valentineku!\nKami harap web ini bisa menjadi bagian\ndari perayaan cinta dan kasih sayangmu di hari Valentine ini.\nSelamat menikmati!`;
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

let currentContentIndex = 0; // Inisialisasi indeks konten
const contents = document.querySelectorAll('.frame4-content1, .frame4-content2, .frame4-content3, .frame4-content4, .frame4-content5, .frame4-content6'); // Ambil semua konten di frame4

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

        // Tambahkan event listener untuk tombol "Lihat"
        btnLihat.addEventListener('click', () => {
            frame3.style.display = 'none'; // Sembunyikan frame3
            showFrame4(nama); // Tampilkan frame4
        });
    });
}

// Fungsi untuk menampilkan frame4
function showFrame4(nama) {
    const content1Text = document.getElementById('content1Text');
    content1Text.textContent = `Hai ${nama}! Aku mau nunjukin sesuatu nih, spesial buat kamu di hari Valentine.`; // Set teks konten 1
    content1Text.parentElement.style.display = 'block'; // Tampilkan konten 1

    const frame4 = document.querySelector('.frame4'); // Ambil elemen frame4
    frame4.style.display = 'flex'; // Tampilkan frame4

    // Tampilkan konten 1 dan sembunyikan konten lainnya
    currentContentIndex = 0; // Reset indeks konten
    const contents = document.querySelectorAll('.frame4-content1, .frame4-content2, .frame4-content3, .frame4-content4, .frame4-content5, .frame4-content6');
    contents.forEach((content, index) => {
        content.style.display = index === currentContentIndex ? 'block' : 'none'; // Hanya tampilkan konten 1
    });

    // Tambahkan event listener untuk tombol "Engak" dan "Mau"
    document.getElementById('btnEngak').addEventListener('click', showNextContent);
    document.getElementById('btnMau').addEventListener('click', showFrame5);
}

// Fungsi untuk menampilkan konten berikutnya
function showNextContent() {
    // Sembunyikan konten saat ini
    contents[currentContentIndex].style.display = 'none';
    
    // Increment indeks konten
    currentContentIndex++;
    
    // Jika indeks masih dalam batas, tampilkan konten berikutnya
    if (currentContentIndex < contents.length) {
        const currentContent = contents[currentContentIndex];
        const img = currentContent.querySelector('img'); // Ambil gambar dari konten saat ini

        if (img) {
            img.style.display = 'block'; // Tampilkan gambar
            setTimeout(() => {
                img.style.display = 'none'; // Sembunyikan gambar setelah 500ms
                currentContent.querySelector('p').style.display = 'block'; // Tampilkan teks
            }, 500); // Tampilkan gambar selama 500ms
        } else {
            currentContent.querySelector('p').style.display = 'block'; // Tampilkan teks jika tidak ada gambar
        }
        
        currentContent.style.display = 'block'; // Tampilkan konten berikutnya
    } else {
        // Jika sudah tidak ada konten lagi, bisa menambahkan logika lain di sini
 alert("Semua konten telah ditampilkan!");
    }
}

// Fungsi untuk menampilkan frame 5
function showFrame5() {
    const frame4 = document.querySelector('.frame4'); // Ambil elemen frame4
    frame4.style.display = 'none'; // Sembunyikan frame4
    const frame5 = document.querySelector('.frame5'); // Ambil elemen frame5
    frame5.style.display = 'flex'; // Tampilkan frame5
}