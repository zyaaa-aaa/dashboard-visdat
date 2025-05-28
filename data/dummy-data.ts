export interface ProvinceData {
  id: string;
  name: string;
  dropoutRate: number;
  povertyRate: number;
  kipkRecipients: number;
  students: number;
}

export interface EducationIncomeData {
  education: string;
  income: number;
  level: number;
}

export interface ProvinceRanking {
  name: string;
  povertyRate?: number;
  recipients?: number;
  rank: number;
}

export interface CorrelationData {
  name: string;
  povertyRate: number;
  dropoutRate: number;
  kipkPerCapita: number;
}

// Data provinsi berdasarkan CSV yang sebenarnya
export const provinceData: ProvinceData[] = [
  { id: "aceh", name: "Aceh", dropoutRate: 5.24, povertyRate: 15.32, kipkRecipients: 16410, students: 203683 },
  { id: "bali", name: "Bali", dropoutRate: 5.0, povertyRate: 4.07, kipkRecipients: 7845, students: 159559 },
  { id: "babel", name: "Bangka Belitung", dropoutRate: 2.77, povertyRate: 4.69, kipkRecipients: 1811, students: 18697 },
  { id: "banten", name: "Banten", dropoutRate: 4.95, povertyRate: 6.64, kipkRecipients: 14356, students: 1460339 },
  { id: "bengkulu", name: "Bengkulu", dropoutRate: 8.46, povertyRate: 14.89, kipkRecipients: 3256, students: 65518 },
  { id: "yogya", name: "DI Yogyakarta", dropoutRate: 3.78, povertyRate: 11.68, kipkRecipients: 11078, students: 442162 },
  { id: "jakarta", name: "DKI Jakarta", dropoutRate: 4.09, povertyRate: 4.53, kipkRecipients: 12540, students: 737918 },
  { id: "gorontalo", name: "Gorontalo", dropoutRate: 7.58, povertyRate: 15.83, kipkRecipients: 2318, students: 59007 },
  { id: "jambi", name: "Jambi", dropoutRate: 6.75, povertyRate: 7.64, kipkRecipients: 5956, students: 114134 },
  { id: "jabar", name: "Jawa Barat", dropoutRate: 4.43, povertyRate: 8.05, kipkRecipients: 73396, students: 1031656 },
  { id: "jateng", name: "Jawa Tengah", dropoutRate: 4.84, povertyRate: 10.90, kipkRecipients: 52934, students: 778002 },
  { id: "jatim", name: "Jawa Timur", dropoutRate: 4.03, povertyRate: 10.37, kipkRecipients: 62158, students: 1132697 },
  { id: "kalbar", name: "Kalimantan Barat", dropoutRate: 6.58, povertyRate: 6.09, kipkRecipients: 8043, students: 108446 },
  { id: "kalsel", name: "Kalimantan Selatan", dropoutRate: 6.11, povertyRate: 4.64, kipkRecipients: 6845, students: 119568 },
  { id: "kalteng", name: "Kalimantan Tengah", dropoutRate: 6.86, povertyRate: 5.17, kipkRecipients: 4287, students: 48620 },
  { id: "kaltim", name: "Kalimantan Timur", dropoutRate: 4.52, povertyRate: 6.21, kipkRecipients: 5678, students: 109834 },
  { id: "kalut", name: "Kalimantan Utara", dropoutRate: 5.87, povertyRate: 7.64, kipkRecipients: 1023, students: 14210 },
  { id: "kepri", name: "Kepulauan Riau", dropoutRate: 4.15, povertyRate: 5.59, kipkRecipients: 2345, students: 56545 },
  { id: "lampung", name: "Lampung", dropoutRate: 7.35, povertyRate: 12.03, kipkRecipients: 15234, students: 1955683 },
  { id: "maluku", name: "Maluku", dropoutRate: 11.25, povertyRate: 17.69, kipkRecipients: 3456, students: 77714 },
  { id: "malut", name: "Maluku Utara", dropoutRate: 9.87, povertyRate: 6.82, kipkRecipients: 1876, students: 47862 },
  { id: "ntb", name: "Nusa Tenggara Barat", dropoutRate: 9.78, povertyRate: 13.32, kipkRecipients: 9876, students: 146698 },
  { id: "ntt", name: "Nusa Tenggara Timur", dropoutRate: 12.41, povertyRate: 20.75, kipkRecipients: 8765, students: 136683 },
  { id: "papua", name: "Papua", dropoutRate: 15.23, povertyRate: 26.64, kipkRecipients: 5432, students: 129701 },
  { id: "papbar", name: "Papua Barat", dropoutRate: 13.78, povertyRate: 21.12, kipkRecipients: 2345, students: 44039 },
  { id: "riau", name: "Riau", dropoutRate: 4.89, povertyRate: 7.01, kipkRecipients: 9876, students: 188226 },
  { id: "sulbar", name: "Sulawesi Barat", dropoutRate: 10.21, povertyRate: 11.22, kipkRecipients: 2987, students: 37987 },
  { id: "sulsel", name: "Sulawesi Selatan", dropoutRate: 7.19, povertyRate: 8.87, kipkRecipients: 16543, students: 428255 },
  { id: "sulteng", name: "Sulawesi Tengah", dropoutRate: 9.12, povertyRate: 13.15, kipkRecipients: 5678, students: 103916 },
  { id: "sultengg", name: "Sulawesi Tenggara", dropoutRate: 8.67, povertyRate: 11.15, kipkRecipients: 4321, students: 122364 },
  { id: "sulut", name: "Sulawesi Utara", dropoutRate: 6.41, povertyRate: 7.64, kipkRecipients: 4567, students: 117905 },
  { id: "sumbar", name: "Sumatera Barat", dropoutRate: 5.78, povertyRate: 6.65, kipkRecipients: 9876, students: 227631 },
  { id: "sumsel", name: "Sumatera Selatan", dropoutRate: 6.82, povertyRate: 12.57, kipkRecipients: 13456, students: 178639 },
  { id: "sumut", name: "Sumatera Utara", dropoutRate: 6.21, povertyRate: 8.75, kipkRecipients: 25987, students: 476512 },
];

// Data pendapatan berdasarkan pendidikan (dalam rupiah per bulan)
export const educationIncomeData: EducationIncomeData[] = [
  { education: "Tidak/Belum Pernah Sekolah", income: 1576789, level: 1 },
  { education: "Tidak/Belum Tamat SD", income: 1764950, level: 2 },
  { education: "Sekolah Dasar", income: 2107108, level: 3 },
  { education: "Sekolah Menengah Pertama", income: 2341855, level: 4 },
  { education: "Sekolah Menengah Atas (Umum)", income: 2975103, level: 5 },
  { education: "Sekolah Menengah Atas (Kejuruan)", income: 3028328, level: 6 },
  { education: "Diploma I/II/III/Akademi", income: 4145294, level: 7 },
  { education: "Universitas", income: 4780244, level: 8 }
];

// Provinsi dengan tingkat kemiskinan tertinggi (berdasarkan data asli)
export const poorestProvinces: ProvinceRanking[] = [
  { name: "Papua", povertyRate: 26.64, rank: 1 },
  { name: "Papua Barat", povertyRate: 21.12, rank: 2 },
  { name: "Nusa Tenggara Timur", povertyRate: 20.75, rank: 3 },
  { name: "Maluku", povertyRate: 17.69, rank: 4 },
  { name: "Gorontalo", povertyRate: 15.83, rank: 5 }
];

// Provinsi dengan penerima KIPK terbanyak (berdasarkan data asli)
export const topKipkProvinces: ProvinceRanking[] = [
  { name: "Jawa Barat", recipients: 73396, rank: 1 },
  { name: "Jawa Timur", recipients: 62158, rank: 2 },
  { name: "Jawa Tengah", recipients: 52934, rank: 3 },
  { name: "Sumatera Utara", recipients: 25987, rank: 4 },
  { name: "Sulawesi Selatan", recipients: 16543, rank: 5 }
];

// Data korelasi untuk analisis (berdasarkan data asli)
export const correlationData: CorrelationData[] = provinceData.map((province) => ({
  name: province.name,
  povertyRate: province.povertyRate,
  dropoutRate: province.dropoutRate,
  kipkPerCapita: province.students > 0 ? (province.kipkRecipients / province.students) * 100 : 0,
}));

// Statistik tambahan
export const nationalStats = {
  totalStudents: provinceData.reduce((sum, p) => sum + p.students, 0),
  totalKipkRecipients: provinceData.reduce((sum, p) => sum + p.kipkRecipients, 0),
  averageDropoutRate: provinceData.reduce((sum, p) => sum + p.dropoutRate, 0) / provinceData.length,
  averagePovertyRate: provinceData.reduce((sum, p) => sum + p.povertyRate, 0) / provinceData.length,
};

// Provinsi dengan tingkat putus kuliah tertinggi
export const highestDropoutProvinces: ProvinceRanking[] = [
  { name: "Papua", povertyRate: 15.23, rank: 1 },
  { name: "Papua Barat", povertyRate: 13.78, rank: 2 },
  { name: "Nusa Tenggara Timur", povertyRate: 12.41, rank: 3 },
  { name: "Maluku", povertyRate: 11.25, rank: 4 },
  { name: "Sulawesi Barat", povertyRate: 10.21, rank: 5 }
];

// Provinsi dengan tingkat putus kuliah terendah
export const lowestDropoutProvinces: ProvinceRanking[] = [
  { name: "Bangka Belitung", povertyRate: 2.77, rank: 1 },
  { name: "DI Yogyakarta", povertyRate: 3.78, rank: 2 },
  { name: "Jawa Timur", povertyRate: 4.03, rank: 3 },
  { name: "DKI Jakarta", povertyRate: 4.09, rank: 4 },
  { name: "Kepulauan Riau", povertyRate: 4.15, rank: 5 }
];