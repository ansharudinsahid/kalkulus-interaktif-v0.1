import { LessonChapter } from '../types';

export const COURSE_CHAPTERS: LessonChapter[] = [
  {
    id: 'chapter-1',
    title: 'Pelajaran 1: Eksplorasi Turunan Pertama (f\')',
    subtitle: 'Mengenal Laju Perubahan, Kemiringan, dan Garis Singgung',
    description: 'Pelajari bagaimana turunan membantu kita mengidentifikasi perilaku fungsi dari fungsi linear hingga polinomial.',
    badge: 'f\'',
    totalXp: 90,
    steps: [
      {
        id: 'c1-step-1',
        type: 'linear_slider_intro',
        title: "Melihat Lebih Dekat $f'$",
        subtitle: 'Mari kita jelajahi bagaimana turunan membantu kita mengidentifikasi perilaku suatu fungsi.',
        content: [
          'Pertama, mari kita mulai dengan fungsi linear sederhana:',
          'f(x) = mx'
        ],
        explanation: {
          title: 'Fungsi Linear & Gradien',
          text: 'Nilai $m$ adalah gradien atau kemiringan garis. Nilai $m$ menentukan apakah garis naik, datar, atau turun.',
          formula: 'f(x) = mx'
        },
        xpReward: 10,
        initialSliderValue: 1
      },
      {
        id: 'c1-step-2',
        type: 'question_linear_slope',
        question: 'Nilai $m$ berapakah yang membuat $f$ bertambah (naik) dari kiri ke kanan?',
        options: [
          { id: 'opt-1', label: 'm < 0', isCorrect: false },
          { id: 'opt-2', label: 'm = 0', isCorrect: false },
          { id: 'opt-3', label: 'm > 0', isCorrect: true }
        ],
        correctOptionId: 'opt-3',
        explanation: {
          title: 'Penjelasan',
          text: 'Karena gradien $m$ mengukur perubahan vertikal terhadap perubahan horizontal (rise over run), sebuah garis akan naik dari kiri ke kanan (yaitu, bertambah) jika $m > 0$ dan turun (berkurang) jika $m < 0$.',
          formula: 'f(x) = mx',
          graphType: 'linear',
          graphParams: { defaultM: 0.5 }
        },
        xpReward: 15
      },
      {
        id: 'c1-step-3',
        type: 'text',
        title: 'Perilaku Fungsi Non-Linear',
        content: [
          'Jika gradien suatu fungsi linear positif, fungsi tersebut naik (bertambah), dan jika negatif, fungsi tersebut turun (berkurang).',
          'Namun bagaimana jika $f$ bukanlah fungsi linear?'
        ],
        explanation: {
          title: 'Fungsi Non-Linear',
          text: 'Pada fungsi non-linear, kemiringan berubah di setiap titik, sehingga kita memerlukan turunan untuk mengetahui laju perubahan sesaat.'
        },
        xpReward: 10
      },
      {
        id: 'c1-step-4',
        type: 'parabola_tangent_question',
        question: "Ketika $f$ sedang turun (berkurang) pada $x = a$, berapakah nilai $f'(a)$?",
        options: [
          { id: 'p-neg', label: 'Negatif', isCorrect: true },
          { id: 'p-zero', label: 'Nol', isCorrect: false },
          { id: 'p-pos', label: 'Positif', isCorrect: false }
        ],
        correctOptionId: 'p-neg',
        explanation: {
          title: 'Penjelasan',
          text: "Ketika fungsi $f$ menurun pada titik $x = a$, garis singgung miring ke bawah dari kiri ke kanan. Oleh karena itu, turunan $f'(a)$ bernilai negatif.",
          formula: "f'(a) = -0.3",
          graphType: 'parabola',
          graphParams: { targetA: 3.2, showTangent: true }
        },
        xpReward: 15
      },
      {
        id: 'c1-step-5',
        type: 'text',
        title: 'Tanda dari Turunan',
        content: [
          'Turunan bernilai positif pada $x = a$ ketika $f$ sedang naik, dan bernilai negatif ketika $f$ sedang turun.',
          'Mari kita perhatikan sebuah contoh. Ambil fungsi:',
          'f(x) = -x^2 + 4x + 1',
          'yang memiliki turunan:',
          "f'(x) = -2x + 4"
        ],
        explanation: {
          title: 'Konsep Dasar',
          text: "Hubungan penting: $f'(x) > 0$ berarti grafik $f(x)$ naik, dan $f'(x) < 0$ berarti grafik $f(x)$ turun."
        },
        xpReward: 10
      },
      {
        id: 'c1-step-6',
        type: 'text',
        title: 'Definisi Turunan sebagai Limit',
        content: [
          'Nantinya kita akan mengembangkan rumus-rumus praktis untuk menghitung turunan dengan cepat.',
          "Untuk saat ini, kita mengandalkan definisi formal $f'(x)$ sebagai limit kemiringan garis sekan:",
          "f'(x) = \\lim_{b \\to x} \\frac{f(b) - f(x)}{b - x}"
        ],
        explanation: {
          title: 'Definisi Formal',
          text: 'Limit garis sekan ketika titik $b$ mendekati titik $x$ menghasilkan garis singgung sesaat.'
        },
        xpReward: 10
      },
      {
        id: 'c1-step-7',
        type: 'text',
        title: 'Penyederhanaan Aljabar',
        content: [
          'Pertama, mari sederhanakan pembilang $f(b) - f(x)$:',
          'f(b) - f(x) = (-b^2 + 4b + 1) - (-x^2 + 4x + 1)',
          '= x^2 - b^2 + 4(b - x)',
          '= -(b - x)(x + b) + 4(b - x)'
        ],
        explanation: {
          title: 'Faktorisasi',
          text: 'Dengan memfaktorkan $(b - x)$, kita dapat membaginya dengan penyebut tanpa terjadi pembagian dengan nol saat $b$ mendekati $x$.'
        },
        xpReward: 10
      },
      {
        id: 'c1-step-8',
        type: 'derivative_graph_question',
        content: [
          'Membagi $f(b) - f(x)$ dengan $b - x$ memberikan kita:',
          '\\frac{f(b) - f(x)}{b - x} = -(x + b) + 4',
          'yang nilainya menjadi sangat dekat dengan $-2x + 4$ saat $b$ mendekati $x$. Sehingga:',
          "f'(x) = -2x + 4"
        ],
        question: "Dengan menggunakan turunan $f'$, kapankah fungsi $f(x) = -x^2 + 4x + 1$ menurun?",
        options: [
          { id: 'opt-x-less', label: 'x < 2', isCorrect: false },
          { id: 'opt-x-eq', label: 'x = 2', isCorrect: false },
          { id: 'opt-x-greater', label: 'x > 2', isCorrect: true }
        ],
        correctOptionId: 'opt-x-greater',
        explanation: {
          title: 'Penjelasan',
          text: "Ketika fungsi menurun, nilai turunannya harus negatif ($f'(x) < 0$). Dari grafik $f'(x) = -2x + 4$, garis berada di bawah sumbu horizontal ketika $x > 2$.",
          formula: "f'(x) = -2x + 4",
          graphType: 'linear',
          graphParams: { isDerivativeLine: true }
        },
        xpReward: 15
      },
      {
        id: 'c1-step-9',
        type: 'highest_point_tangent_question',
        content: [
          'Grafik $f$ menunjukkan bahwa fungsi menurun saat $x > 2$ dan naik saat $x < 2$.'
        ],
        question: "Apa yang benar mengenai $f'(2)$, yaitu turunan $f$ pada titik tertingginya?",
        options: [
          { id: 'hp-pos', label: 'Bernilai positif', isCorrect: false },
          { id: 'hp-neg', label: 'Bernilai negatif', isCorrect: false },
          { id: 'hp-zero', label: 'Bernilai nol', isCorrect: true }
        ],
        correctOptionId: 'hp-zero',
        explanation: {
          title: 'Penjelasan',
          text: "Garis singgung pada titik puncak $x = 2$ adalah garis horizontal — sehingga kemiringannya bernilai nol.\nKita juga dapat memasukkan $x = 2$ ke dalam turunan:\n$f'(2) = -2(2) + 4 = -4 + 4 = 0$.",
          formula: "f'(2) = 0"
        },
        xpReward: 15
      },
      {
        id: 'c1-step-10',
        type: 'polynomial_roots_question',
        content: [
          'Perhatikan fungsi $f(x) = x^4 - 2x^2 + 1$, yang memiliki turunan:',
          "f'(x) = 4x^3 - 4x"
        ],
        question: 'Pada nilai $x$ berapakah $f$ memiliki nilai minimum atau maksimum?',
        options: [
          { id: 'poly-1', label: 'x = -2', isCorrect: false },
          { id: 'poly-2', label: 'x = -\\frac{1}{3}', isCorrect: false },
          { id: 'poly-3', label: 'x = 1', isCorrect: true },
          { id: 'poly-4', label: 'x = 2', isCorrect: false }
        ],
        correctOptionId: 'poly-3',
        explanation: {
          title: 'Penjelasan',
          text: "Pada titik maksimum atau minimum, turunan $f'$ harus bernilai 0.\nJika kita substitusikan masing-masing pilihan, kita temukan hanya $x = 1$ yang menghasilkan nol:\n$f'(1) = 4(1)^3 - 4(1) = 4 - 4 = 0$.",
          formula: "f'(1) = 4(1)^3 - 4(1) = 0"
        },
        xpReward: 15
      },
      {
        id: 'c1-step-11',
        type: 'text',
        title: 'Tiga Titik Kritis',
        content: [
          "Ternyata ada tiga titik pada $f$ di mana $f'(x) = 0$ (yaitu pada $x = -1$, $x = 0$, dan $x = 1$).",
          'Dua titik di antaranya adalah minimum, dan satu titik adalah maksimum relatif terhadap titik-titik sekitarnya.',
          "Selanjutnya, kita akan memeriksa bagaimana $f' = 0$ memberikan wawasan mendalam terhadap perilaku fungsi."
        ],
        explanation: {
          title: 'Titik Kritis',
          text: "Titik di mana turunan bernilai nol ($f'(x) = 0$) atau tidak terdefinisi disebut sebagai titik kritis fungsi."
        },
        xpReward: 10
      },
      {
        id: 'c1-step-12',
        type: 'lesson_complete',
        title: 'Pelajaran Selesai!',
        subtitle: 'Selamat! Kamu telah memahami konsep turunan pertama dan garis singgung.',
        explanation: { title: '', text: '' },
        xpReward: 30
      }
    ]
  },
  {
    id: 'chapter-2',
    title: 'Pelajaran 2: Titik Kritis & Nilai Ekstrim',
    subtitle: 'Maksimum dan Minimum Lokal vs Absolut',
    description: 'Jelajahi perbedaan antara nilai ekstrim lokal dan absolut, serta selesaikan uji kemampuan kalkulus.',
    badge: '⚡',
    totalXp: 95,
    steps: [
      {
        id: 'c2-step-1',
        type: 'critical_points_intro_question',
        title: 'Titik Kritis (Critical Points)',
        subtitle: "Titik ketika $f' = 0$ adalah contoh dari titik kritis.",
        content: [
          'Perhatikan fungsi $f$ berikut dengan tiga titik kritis:',
          'f(x) = x^4 - 2x^2 + 1'
        ],
        question: 'Berapakah nilai terbesar dari $f$ secara keseluruhan (global/absolut)?',
        options: [
          { id: 'cp-0', label: '0', isCorrect: false },
          { id: 'cp-1', label: '1', isCorrect: false },
          { id: 'cp-none', label: 'Tidak ada nilai terbesar.', isCorrect: true }
        ],
        correctOptionId: 'cp-none',
        explanation: {
          title: 'Penjelasan',
          text: 'Fungsi memiliki maksimum lokal ketika $x = 0$, di mana nilai-nilai di sekitarnya lebih rendah dari $f(0) = 1$, namun jika kita menjauh cukup jauh dari titik asal, nilai $f$ terus bertambah menuju tak hingga ($\\infty$). Oleh karena itu, $f$ tidak memiliki nilai terbesar (tidak ada maksimum absolut).',
          formula: 'f(0) = 1 \\text{ (Lokal)}',
          graphType: 'polynomial'
        },
        xpReward: 15
      },
      {
        id: 'c2-step-2',
        type: 'extrema_count_question',
        content: [
          'Terkadang, titik kritis bukanlah nilai terbesar atau terkecil dari suatu fungsi.'
        ],
        tags: [
          'Maksimum atau minimum lokal memiliki nilai $f$ terbesar atau terkecil dibandingkan dengan titik-titik di sekitarnya.',
          'Maksimum atau minimum absolut memiliki nilai $f$ terbesar atau terkecil secara keseluruhan di seluruh domain fungsi.'
        ],
        question: 'Berapa banyak maksimum atau minimum absolut yang dimiliki fungsi pada grafik di atas?',
        options: [
          { id: 'ext-0', label: '0', isCorrect: false },
          { id: 'ext-1', label: '1', isCorrect: true },
          { id: 'ext-2', label: '2', isCorrect: false },
          { id: 'ext-3', label: '3', isCorrect: false }
        ],
        correctOptionId: 'ext-1',
        explanation: {
          title: 'Penjelasan',
          text: 'Hanya ada satu minimum absolut dari fungsi ini (pada lembah terendah). Dua titik kritis lainnya adalah ekstrim lokal, tetapi bukan absolut.',
          formula: '\\text{1 Titik Ekstrim Absolut}',
          graphType: 'extrema',
          graphParams: { highlightAbsolute: true }
        },
        xpReward: 15
      },
      {
        id: 'c2-step-3',
        type: 'factored_derivative_question',
        question: "Berapa banyak titik kritis yang dimiliki $f$ jika $f' = (x - 3)(x + 2)(x - 1)$?",
        options: [
          { id: 'fc-0', label: '0', isCorrect: false },
          { id: 'fc-1', label: '1', isCorrect: false },
          { id: 'fc-2', label: '2', isCorrect: false },
          { id: 'fc-3', label: '3', isCorrect: true }
        ],
        correctOptionId: 'fc-3',
        explanation: {
          title: 'Penjelasan',
          text: "Terdapat tiga titik kritis, karena $f' = 0$ terjadi ketika $x = -2$, $x = 1$, dan $x = 3$.\n\nKetika $f' = (x - 3)(x + 2)(x - 1)$, jika salah satu faktor bernilai nol ($(x - 3)$, $(x + 2)$, atau $(x - 1) = 0$), maka $f' = 0$.",
          formula: "f'(x) = (x - 3)(x + 2)(x - 1) = 0"
        },
        xpReward: 15
      },
      {
        id: 'c2-step-4',
        type: 'text',
        title: 'Menghubungkan Konsep',
        content: [
          'Kita dapat menemukan titik kritis dari suatu fungsi dengan mencari saat laju perubahannya (turunannya) bernilai nol.',
          'Selanjutnya, mari kita terapkan apa yang telah kita pelajari melalui uji kemampuan!'
        ],
        explanation: {
          title: 'Kunci Kalkulus',
          text: "Mencari titik di mana $f'(x) = 0$ adalah langkah pertama terpenting dalam persoalan optimasi matematika."
        },
        xpReward: 10
      },
      {
        id: 'c2-step-5',
        type: 'skill_check_intro',
        title: 'Uji Kemampuan',
        subtitle: 'Skill check',
        content: [
          'Saatnya menguji pemahaman konsep titik kritis dan nilai ekstrim!'
        ],
        explanation: { title: '', text: '' },
        xpReward: 10
      },
      {
        id: 'c2-step-6',
        type: 'skill_check_inverted_curve',
        question: 'Berapakah nilai minimum absolut dari grafik fungsi ini?',
        options: [
          { id: 'sk1-0', label: '0', isCorrect: false },
          { id: 'sk1-1', label: '1', isCorrect: false },
          { id: 'sk1-none', label: 'Tidak ada minimum absolut.', isCorrect: true }
        ],
        correctOptionId: 'sk1-none',
        explanation: {
          title: 'Penjelasan',
          text: 'Fungsi memiliki minimum lokal ketika $x = 0$, namun jika kita bergerak semakin jauh dari titik asal, grafik terus mengarah ke bawah tanpa batas ($-\\infty$), sehingga $f$ tidak memiliki nilai minimum terkecil.',
          formula: 'f(0) = 1 \\text{ (Lokal)}',
          graphType: 'polynomial',
          graphParams: { inverted: true }
        },
        xpReward: 15
      },
      {
        id: 'c2-step-7',
        type: 'skill_check_single_peak',
        question: 'Berapa banyak maksimum atau minimum absolut yang dimiliki fungsi ini?',
        options: [
          { id: 'sk2-0', label: '0', isCorrect: false },
          { id: 'sk2-1', label: '1', isCorrect: true },
          { id: 'sk2-2', label: '2', isCorrect: false },
          { id: 'sk2-3', label: '3', isCorrect: false }
        ],
        correctOptionId: 'sk2-1',
        explanation: {
          title: 'Penjelasan',
          text: 'Hanya ada satu maksimum absolut (pada puncak tertingginya) dan tidak ada minimum absolut untuk fungsi ini karena grafiknya menurun ke -∞ di kedua ujungnya.',
          formula: '\\text{1 Titik Maksimum Absolut}',
          graphType: 'extrema',
          graphParams: { singlePeak: true }
        },
        xpReward: 15
      },
      {
        id: 'c2-step-8',
        type: 'skill_check_two_factors',
        content: [
          "f'(x) = (x - 3)(x + 2)"
        ],
        question: 'Berapa banyak titik kritis yang dimiliki $f(x)$?',
        options: [
          { id: 'sk3-0', label: '0', isCorrect: false },
          { id: 'sk3-1', label: '1', isCorrect: false },
          { id: 'sk3-2', label: '2', isCorrect: true },
          { id: 'sk3-3', label: '3', isCorrect: false }
        ],
        correctOptionId: 'sk3-2',
        explanation: {
          title: 'Penjelasan',
          text: "Titik kritis terjadi ketika turunan bernilai nol.\nTurunan $f'(x) = (x - 3)(x + 2)$ bernilai nol saat $x = 3$ atau $x = -2$. Jadi, $f(x)$ memiliki 2 titik kritis.",
          formula: "f'(x) = (x - 3)(x + 2) = 0 \\implies x = 3,\\; x = -2"
        },
        xpReward: 15
      },
      {
        id: 'c2-step-9',
        type: 'lesson_complete',
        title: 'Pelajaran Selesai!',
        subtitle: 'Luar biasa! Kamu telah menguasai konsep titik kritis dan nilai ekstrim kalkulus.',
        explanation: { title: '', text: '' },
        xpReward: 35
      }
    ]
  },
  {
    id: 'chapter-3',
    title: 'Pelajaran 3: Laju Perubahan Linier Interaktif (Contoh HTML)',
    subtitle: 'Simulasi Dinamis g(t) = -20t + 200 dengan Handle Titik Geser',
    description: 'Eksplorasi interaktif grafik laju perubahan dengan manipulasi koordinat dan perhitungan gradien.',
    badge: 'g(t)',
    totalXp: 80,
    steps: [
      {
        id: 'c3-step-1',
        type: 'html_linear_rate_question',
        title: 'Laju Perubahan Fungsi Linier',
        subtitle: 'Geser titik handle pada sumbu $t$ untuk mengamati perubahan koordinat $g(t)$.',
        content: [
          'g(t) = -20t + 200'
        ],
        question: 'Berapakah laju perubahan untuk fungsi ini?',
        options: [
          { id: 'h-opt-1', label: '-20', isCorrect: true },
          { id: 'h-opt-2', label: '-10', isCorrect: false },
          { id: 'h-opt-3', label: '10', isCorrect: false },
          { id: 'h-opt-4', label: '20', isCorrect: false }
        ],
        correctOptionId: 'h-opt-1',
        explanation: {
          title: 'Penjelasan',
          text: 'Laju perubahan adalah gradien (kemiringan) dari garis lurus. Gradien dihitung dari perubahan $g$ dibagi perubahan $t$:\n$(-200) / 10 = -20$.\nGradien bernilai negatif karena fungsi $g$ terus berkurang (menurun) seiring bertambahnya waktu $t$.',
          formula: 'g(t) = -20t + 200 \\implies \\text{Laju} = -20',
          graphType: 'html_rate'
        },
        xpReward: 25
      },
      {
        id: 'c3-step-2',
        type: 'text',
        title: 'Interpretasi Fisik Laju Perubahan',
        content: [
          'Pada fungsi $g(t) = -20t + 200$:',
          '• Nilai awal pada $t = 0$ adalah $g(0) = 200$.',
          '• Setiap penambahan 1 satuan $t$, nilai $g(t)$ berkurang sebesar 20 satuan.',
          '• Ketika $t = 10$, nilai fungsi mencapai nol: $g(10) = -20(10) + 200 = 0$.'
        ],
        explanation: {
          title: 'Aplikasi Nyata',
          text: 'Contoh aplikasi: Mengosongkan tangki air berkapasitas 200 liter dengan laju pengeluaran konstan 20 liter per menit, sehingga tangki kosong setelah 10 menit.'
        },
        xpReward: 20
      },
      {
        id: 'c3-step-3',
        type: 'lesson_complete',
        title: 'Pelajaran Selesai!',
        subtitle: 'Kamu telah menuntaskan modul grafik interaktif laju perubahan.',
        explanation: { title: '', text: '' },
        xpReward: 35
      }
    ]
  }
];
