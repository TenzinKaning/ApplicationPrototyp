// Mock-Datenquelle "Stellen". Im echten Betrieb würde dies aus einer
// Datenbank/API kommen (siehe src/services/jobsService.js).
export const mockJobs = [
  {
    id: 'j1',
    companyId: 'c1',
    title: 'Disponent:in Lager & Transport',
    description:
      'Du planst Transportrouten, koordinierst unser Lagerteam und sorgst dafür, dass Lieferungen pünktlich ankommen. Erfahrung in der Logistik ist von Vorteil, aber kein Muss – wir bringen dir das nötige Fachwissen bei.',
    requiredSkills: ['Logistik', 'Organisation', 'MS Excel', 'Teamarbeit'],
    location: 'Hamburg',
    careerChangeFriendly: true,
    createdAt: '2026-06-02',
  },
  {
    id: 'j2',
    companyId: 'c1',
    title: 'Lagerleitung (m/w/d)',
    description:
      'Du übernimmst die fachliche Führung unseres Lagerteams, verantwortest Bestandskontrollen und optimierst Abläufe im Wareneingang und -ausgang.',
    requiredSkills: ['Logistik', 'Führungserfahrung', 'Organisation', 'MS Excel'],
    location: 'Hamburg',
    careerChangeFriendly: false,
    createdAt: '2026-05-20',
  },
  {
    id: 'j3',
    companyId: 'c2',
    title: 'Frontend-Entwickler:in (React)',
    description:
      'Du baust gemeinsam mit unserem Team moderne, responsive Weboberflächen für unsere Kund:innen aus verschiedenen Branchen. Sauberer Code und gutes Design sind dir wichtig.',
    requiredSkills: ['JavaScript', 'React', 'CSS', 'Teamarbeit'],
    location: 'Berlin',
    careerChangeFriendly: false,
    createdAt: '2026-06-10',
  },
  {
    id: 'j4',
    companyId: 'c2',
    title: 'UI/UX Designer:in',
    description:
      'Von der Wireframe-Skizze bis zum fertigen Interface: Du gestaltest nutzerfreundliche Oberflächen und arbeitest eng mit unseren Entwickler:innen zusammen.',
    requiredSkills: ['UI/UX Design', 'Kommunikation', 'CSS'],
    location: 'Berlin',
    careerChangeFriendly: true,
    createdAt: '2026-06-15',
  },
  {
    id: 'j5',
    companyId: 'c3',
    title: 'Verkaufsberater:in Filiale',
    description:
      'Du berätst unsere Kundschaft rund um unser Bio-Sortiment, sorgst für ein einladendes Ladenbild und unterstützt an der Kasse. Quereinstieg ausdrücklich erwünscht!',
    requiredSkills: ['Verkauf', 'Kundenservice', 'Teamarbeit'],
    location: 'München',
    careerChangeFriendly: true,
    createdAt: '2026-06-18',
  },
  {
    id: 'j6',
    companyId: 'c3',
    title: 'Filialleitung Naturkost',
    description:
      'Du führst dein Team eigenverantwortlich, planst Dienstpläne und bist verantwortlich für Warenwirtschaft und Kund:innenzufriedenheit in deiner Filiale.',
    requiredSkills: ['Verkauf', 'Führungserfahrung', 'Organisation', 'Kundenservice'],
    location: 'München',
    careerChangeFriendly: false,
    createdAt: '2026-05-28',
  },
  {
    id: 'j7',
    companyId: 'c4',
    title: 'Junior Data Analyst',
    description:
      'Du wertest Kundendaten aus, erstellst Reportings in SQL/Python und unterstützt unser Beratungsteam bei der Aufbereitung von Analysen für Finanzdienstleister.',
    requiredSkills: ['SQL', 'Python', 'Datenanalyse', 'Kommunikation'],
    location: 'Zürich',
    careerChangeFriendly: true,
    createdAt: '2026-06-05',
  },
  {
    id: 'j8',
    companyId: 'c4',
    title: 'Business Intelligence Consultant',
    description:
      'Du berätst unsere Kund:innen zu BI-Strategien, baust Dashboards und arbeitest eng mit Fachabteilungen zusammen, um datengetriebene Entscheidungen zu ermöglichen.',
    requiredSkills: ['SQL', 'Datenanalyse', 'Kommunikation', 'Organisation'],
    location: 'Zürich',
    careerChangeFriendly: false,
    createdAt: '2026-04-30',
  },
]
