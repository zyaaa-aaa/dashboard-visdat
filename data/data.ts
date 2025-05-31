export interface ProvinceData {
  id: string;
  name: string;
  dropoutRate: number;
  povertySum: number;
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
  povertySum?: number;
  recipients?: number;
  rank: number;
}

export interface CorrelationData {
  name: string;
  povertySum: number;
  dropoutRate: number;
  kipkPerCapita: number;
}

// Data provinsi berdasarkan CSV yang sebenarnya
export const provinceData: ProvinceData[] = [
  { id: "aceh", name: "Aceh", dropoutRate: 5.24, povertySum: 806750, kipkRecipients: 29607, students: 203683 },
  { id: "bali", name: "Bali", dropoutRate: 5.0, povertySum: 193780, kipkRecipients: 6941, students: 159559 },
  { id: "babel", name: "Bangka Belitung", dropoutRate: 2.77, povertySum: 68690, kipkRecipients: 2272, students: 18697 },
  { id: "banten", name: "Banten", dropoutRate: 1.79, povertySum: 826130, kipkRecipients: 14356, students: 1460339 },
  { id: "bengkulu", name: "Bengkulu", dropoutRate: 4.15, povertySum: 288460, kipkRecipients: 7573, students: 65518 },
  { id: "yogya", name: "DI Yogyakarta", dropoutRate: 3.82, povertySum: 448470, kipkRecipients: 11078, students: 442162 },
  { id: "jakarta", name: "DKI Jakarta", dropoutRate: 6.52, povertySum: 477830, kipkRecipients: 12540, students: 737918 },
  { id: "gorontalo", name: "Gorontalo", dropoutRate: 2.71, povertySum: 183710, kipkRecipients: 5839, students: 59007 },
  { id: "jambi", name: "Jambi", dropoutRate: 6.77, povertySum: 280680, kipkRecipients: 7044, students: 114134 },
  { id: "jabar", name: "Jawa Barat", dropoutRate: 3.84, povertySum: 3888600, kipkRecipients: 73396, students: 1031656 },
  { id: "jateng", name: "Jawa Tengah", dropoutRate: 3.54, povertySum: 3791500, kipkRecipients: 52934, students: 778002 },
  { id: "jatim", name: "Jawa Timur", dropoutRate: 4.91, povertySum: 4188810, kipkRecipients: 75951, students: 1132697 },
  { id: "kalbar", name: "Kalimantan Barat", dropoutRate: 5.61, povertySum: 353350, kipkRecipients: 10740, students: 108446 },
  { id: "kalsel", name: "Kalimantan Selatan", dropoutRate: 6.62, povertySum: 188930, kipkRecipients: 8976, students: 119568 },
  { id: "kalteng", name: "Kalimantan Tengah", dropoutRate: 4.96, povertySum: 142170, kipkRecipients: 4398, students: 48620 },
  { id: "kaltim", name: "Kalimantan Timur", dropoutRate: 4.50, povertySum: 231070, kipkRecipients: 10562, students: 109834 },
  { id: "kalut", name: "Kalimantan Utara", dropoutRate: 3.53, povertySum: 47970, kipkRecipients: 2878, students: 14210 },
  { id: "kepri", name: "Kepulauan Riau", dropoutRate: 6.55, povertySum: 142500, kipkRecipients: 3294, students: 56545 },
  { id: "lampung", name: "Lampung", dropoutRate: 2.41, povertySum: 970670, kipkRecipients: 14281, students: 195683 },
  { id: "maluku", name: "Maluku", dropoutRate: 4.20, povertySum: 301610, kipkRecipients: 8581, students: 77714 },
  { id: "malut", name: "Maluku Utara", dropoutRate: 5.36, povertySum: 83800, kipkRecipients: 5483, students: 47862 },
  { id: "ntb", name: "Nusa Tenggara Barat", dropoutRate: 3.07, povertySum: 751230, kipkRecipients: 18935, students: 146698 },
  { id: "ntt", name: "Nusa Tenggara Timur", dropoutRate: 4.80, povertySum: 1141110, kipkRecipients: 20322, students: 136683 },
  { id: "papua", name: "Papua", dropoutRate: 2.17, povertySum: 915150, kipkRecipients: 10886, students: 129701 },
  { id: "papbar", name: "Papua Barat", dropoutRate: 9.58, povertySum: 214980, kipkRecipients: 5712, students: 44039 },
  { id: "riau", name: "Riau", dropoutRate: 3.12, povertySum: 485660, kipkRecipients: 12071, students: 188226 },
  { id: "sulbar", name: "Sulawesi Barat", dropoutRate: 3.54, povertySum: 164140, kipkRecipients: 9799, students: 37987 },
  { id: "sulsel", name: "Sulawesi Selatan", dropoutRate: 4.40, povertySum: 788850, kipkRecipients: 27071, students: 428255 },
  { id: "sulteng", name: "Sulawesi Tengah", dropoutRate: 5.50, povertySum: 395660, kipkRecipients: 10218, students: 103916 },
  { id: "sultengg", name: "Sulawesi Tenggara", dropoutRate: 2.84, povertySum: 321530, kipkRecipients: 12076, students: 122364 },
  { id: "sulut", name: "Sulawesi Utara", dropoutRate: 6.64, povertySum: 189000, kipkRecipients: 10893, students: 117905 },
  { id: "sumbar", name: "Sumatera Barat", dropoutRate: 2.77, povertySum: 340370, kipkRecipients: 23639, students: 227631 },
  { id: "sumsel", name: "Sumatera Selatan", dropoutRate: 3.29, povertySum: 1045680, kipkRecipients: 15733, students: 178639 },
  { id: "sumut", name: "Sumatera Utara", dropoutRate: 4.30, povertySum: 1239710, kipkRecipients: 40709, students: 476512 },
];

// Data pendapatan berdasarkan pendidikan (dalam rupiah per bulan)
export const educationIncomeData: EducationIncomeData[] = [
  { education: "Tidak Sekolah", income: 1576789, level: 1 },
  { education: "Tidak Tamat SD", income: 1764950, level: 2 },
  { education: "SD", income: 2107108, level: 3 },
  { education: "SMP", income: 2341855, level: 4 },
  { education: "SMA", income: 2975103, level: 5 },
  { education: "SMK", income: 3028328, level: 6 },
  { education: "Diploma", income: 4145294, level: 7 },
  { education: "Universitas", income: 4780244, level: 8 }
];

// Provinsi dengan tingkat kemiskinan tertinggi (berdasarkan data asli)
export const poorestProvinces: ProvinceRanking[] = [
  { name: "Jawa Timur", povertySum: 4188810, rank: 1 },
  { name: "Jawa Barat", povertySum: 3888600, rank: 2 },
  { name: "Jawa Tengah", povertySum: 3791500, rank: 3 },
  { name: "Sumatera Utara", povertySum: 1239710, rank: 4 },
];

// Provinsi dengan penerima KIPK terbanyak (berdasarkan data asli)
export const topKipkProvinces: ProvinceRanking[] = [
  { name: "Jawa Timur", recipients: 75951, rank: 1 },
  { name: "Jawa Barat", recipients: 73396, rank: 2 },
  { name: "Jawa Tengah", recipients: 52934, rank: 3 },
  { name: "Sumatera Utara", recipients: 40709, rank: 4 },
];

// Data korelasi untuk analisis (berdasarkan data asli)
export const correlationData: CorrelationData[] = provinceData.map((province) => ({
  name: province.name,
  povertySum: province.povertySum,
  dropoutRate: province.dropoutRate,
  kipkPerCapita: province.students > 0 ? (province.kipkRecipients / province.students) * 100 : 0,
}));

// Statistik tambahan
export const nationalStats = {
  totalStudents: provinceData.reduce((sum, p) => sum + p.students, 0),
  totalKipkRecipients: provinceData.reduce((sum, p) => sum + p.kipkRecipients, 0),
  averageDropoutRate: provinceData.reduce((sum, p) => sum + p.dropoutRate, 0) / provinceData.length,
  averagePovertyRate: provinceData.reduce((sum, p) => sum + p.povertySum, 0) / provinceData.length,
};

// Provinsi dengan tingkat putus kuliah tertinggi
export const highestDropoutProvinces: ProvinceRanking[] = [
  { name: "Jawa Timur", povertySum: 4188810, rank: 1 },
  { name: "DKI Jakarta", povertySum: 13.78, rank: 2 },
  { name: "Jawa Barat", povertySum: 12.41, rank: 3 },
  { name: "Jawa Tengah", povertySum: 11.25, rank: 4 },
  { name: "Banten", povertySum: 10.21, rank: 5 }
];

// Provinsi dengan tingkat putus kuliah terendah
export const lowestDropoutProvinces: ProvinceRanking[] = [
  { name: "Kalimantan Utara", povertySum: 47970, rank: 1 },
  { name: "Bangka Belitung", povertySum: 68690, rank: 2 },
  { name: "Sulawesi Barat", povertySum: 340370, rank: 3 },
  { name: "Gorontalo", povertySum: 183710, rank: 4 },
  { name: "Kalimantan Tengah", povertySum: 142170, rank: 5 }
];