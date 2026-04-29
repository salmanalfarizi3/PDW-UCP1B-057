// AMBIL DATA DARI LOCALSTORAGE (Supaya tidak hilang saat refresh)
let members = JSON.parse(localStorage.getItem("techMembers")) || [
    { nama: "Salman Alfarizi", email: "salman@example.com", minat: "Cyber Security" }
];

// INDEX.HTML — Render tabel anggota
function renderMemberTable() {
    const tbody = document.getElementById("memberTableBody"); // Pastikan ID sesuai dengan di HTML (memberTableBody)
    const countEl = document.getElementById("memberCount");
    if (!tbody) return;

    if (countEl) countEl.textContent = members.length;

    if (members.length === 0) {
        tbody.innerHTML = `
            <tr class="no-data">
                <td colspan="4" class="text-center py-4">Belum ada anggota terdaftar.</td>
            </tr>`;
        return;
    }

    tbody.innerHTML = members.map((m, i) => `
        <tr>
            <td style="color:var(--text-muted)">${i + 1}</td>
            <td>${escapeHtml(m.nama)}</td>
            <td style="color:var(--text-muted)">${escapeHtml(m.email)}</td>
            <td><span class="badge-interest">${escapeHtml(m.minat)}</span></td>
        </tr>
    `).join("");
}

// FORM.HTML — Submit form & simpan ke LocalStorage
function submitForm(event) {
    if (event) event.preventDefault(); // Mencegah halaman refresh otomatis

    const nama  = document.getElementById("nama")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const minat = document.getElementById("minat")?.value;

    // Validasi
    if (!nama) {
        shakeField("nama");
        return alert("Mohon isi nama lengkap Anda.");
    }
    if (!email || !isValidEmail(email)) {
        shakeField("email");
        return alert("Mohon masukkan alamat email yang valid.");
    }
    if (!minat) {
        return alert("Mohon pilih bidang minat Anda.");
    }

    // Cek duplikat email
    const isDuplicate = members.some(m => m.email.toLowerCase() === email.toLowerCase());
    if (isDuplicate) {
        return alert("Email ini sudah terdaftar sebagai anggota.");
    }

    // Simpan ke array
    members.push({ nama, email, minat });

    // SIMPAN KE LOCALSTORAGE (Penting!)
    localStorage.setItem("techMembers", JSON.stringify(members));

    // Tampilkan hasil di bawah form
    const resultArea = document.getElementById("resultArea");
    if (resultArea) {
        document.getElementById("resNama").textContent  = nama;
        document.getElementById("resEmail").textContent = email;
        document.getElementById("resMinat").textContent = minat;
        resultArea.classList.add("show");
    }

    alert("Pendaftaran Berhasil!");

    // Reset form
    document.getElementById("nama").value  = "";
    document.getElementById("email").value = "";
    document.getElementById("minat").value = "";
}//