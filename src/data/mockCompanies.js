// Mock-Datenquelle "Firmen". Im echten Betrieb würde dies aus einer
// Datenbank/API kommen (siehe src/services/companiesService.js).
export const mockCompanies = [
  {
    id: 'c1',
    name: 'Nordwind Logistik AG',
    location: 'Hamburg',
    description:
      'Wir organisieren Transport- und Lagerlogistik für den Mittelstand und setzen dabei zunehmend auf digitale Prozesse.',
    coreSkills: ['Logistik', 'Organisation', 'MS Excel', 'Teamarbeit'],
  },
  {
    id: 'c2',
    name: 'PixelForge Studios',
    location: 'Berlin',
    description:
      'Digitalagentur für Webentwicklung und Produktdesign mit Fokus auf moderne Frontend-Technologien.',
    coreSkills: ['JavaScript', 'React', 'UI/UX Design', 'CSS'],
  },
  {
    id: 'c3',
    name: 'GreenLeaf Naturkost',
    location: 'München',
    description:
      'Regionaler Bio-Lebensmittelhändler mit mehreren Filialen und eigenem Onlineshop.',
    coreSkills: ['Verkauf', 'Kundenservice', 'Teamarbeit', 'Organisation'],
  },
  {
    id: 'c4',
    name: 'Alpine DataWorks',
    location: 'Zürich',
    description:
      'Beratungsunternehmen für Datenanalyse und Business Intelligence in der Finanzbranche.',
    coreSkills: ['SQL', 'Python', 'Datenanalyse', 'Kommunikation'],
  },
]
