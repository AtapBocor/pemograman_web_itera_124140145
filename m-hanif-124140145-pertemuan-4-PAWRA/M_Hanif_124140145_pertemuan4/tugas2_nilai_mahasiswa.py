
mahasiswa = [
    {
        "nama": "Andi",
        "nim": "124140101",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88
    },
    {
        "nama": "Budi",
        "nim": "124140102",
        "nilai_uts": 70,
        "nilai_uas": 75,
        "nilai_tugas": 80
    },
    {
        "nama": "Citra",
        "nim": "124140103",
        "nilai_uts": 90,
        "nilai_uas": 95,
        "nilai_tugas": 92
    },
    {
        "nama": "Dina",
        "nim": "124140104",
        "nilai_uts": 60,
        "nilai_uas": 65,
        "nilai_tugas": 70
    },
    {
        "nama": "Eko",
        "nim": "124140105",
        "nilai_uts": 45,
        "nilai_uas": 50,
        "nilai_tugas": 55
    }
]

for data in mahasiswa:
    nilai_akhir = (
        0.30 * data["nilai_uts"]
        + 0.40 * data["nilai_uas"]
        + 0.30 * data["nilai_tugas"]
    )

    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"

    data["nilai_akhir"] = nilai_akhir
    data["grade"] = grade

print("========== DATA NILAI MAHASISWA ==========")
print(f"{'Nama':<10} {'NIM':<12} {'UTS':<6} {'UAS':<6} {'Tugas':<7} {'Akhir':<8} {'Grade':<5}")
print("-" * 65)

for data in mahasiswa:
    print(
        f"{data['nama']:<10} "
        f"{data['nim']:<12} "
        f"{data['nilai_uts']:<6} "
        f"{data['nilai_uas']:<6} "
        f"{data['nilai_tugas']:<7} "
        f"{data['nilai_akhir']:<8.2f} "
        f"{data['grade']:<5}"
    )

nilai_tertinggi = max(mahasiswa, key=lambda x: x["nilai_akhir"])
nilai_terendah = min(mahasiswa, key=lambda x: x["nilai_akhir"])

print("\n========== HASIL NILAI ==========")
print(
    f"Nilai tertinggi: {nilai_tertinggi['nama']} "
    f"({nilai_tertinggi['nilai_akhir']:.2f}) "
    f"- Grade {nilai_tertinggi['grade']}"
)

print(
    f"Nilai terendah : {nilai_terendah['nama']} "
    f"({nilai_terendah['nilai_akhir']:.2f}) "
    f"- Grade {nilai_terendah['grade']}"
)
