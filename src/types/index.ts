export type GuidanceArea = 'pribadi' | 'sosial' | 'belajar' | 'karir';

export interface GuidanceProgram {
  id: string;
  area: GuidanceArea;
  title: string;
  shortDesc: string;
  description: string;
  objectives: string[];
  topics: string[];
  targetClass: string;
  duration: string;
  format: string;
}

export interface BookingFormState {
  fullName: string;
  grade: string;
  classGroup: string;
  contactNumber: string;
  counselingArea: GuidanceArea;
  mode: 'tatap-muka' | 'online' | 'tertulis';
  date: string;
  timeSlot: string;
  confidentialNotes: string;
  urgentFlag: boolean;
}

export interface ScheduledSession {
  id: string;
  studentName: string;
  grade: string;
  area: GuidanceArea;
  mode: 'tatap-muka' | 'online' | 'tertulis';
  date: string;
  timeSlot: string;
  status: 'Dikonfirmasi' | 'Menunggu' | 'Selesai';
  notes?: string;
  referenceCode: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: 'Senang' | 'Tenang' | 'Cemas' | 'Lelah' | 'Semangat';
  promptTitle: string;
  content: string;
  shareWithCounselor: boolean;
}

export type RplServiceType = 'Klasikal' | 'Kelompok' | 'Individu' | 'Kolaborasi' | 'Home Visit';

export interface RplItem {
  id: string;
  code: string;
  semester: 'Ganjil' | 'Genap';
  serviceType: RplServiceType;
  topic: string;
  guidanceArea: GuidanceArea;
  targetGrade: 'Kelas X' | 'Kelas XI' | 'Kelas XII' | 'Semua Tingkat';
  pancasilaProfile: string;
  durationMinutes: number;
  status: 'Terlaksana' | 'Terjadwal' | 'Tersusun';
  evalSummary: string;
}

export interface CareerQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
    scoreText: string;
  }[];
}

export interface StudentAssessmentRecord {
  id: string;
  timestamp: string;
  studentName: string;
  gradeClass: string;
  testType: 'akpd' | 'minat-bakat' | 'sosiometri' | 'gaya-belajar';
  resultSummary: string;
  detailScore?: string;
  followUp: string;
}

export interface AssessmentTool {
  id: 'akpd' | 'minat-bakat' | 'sosiometri' | 'gaya-belajar';
  title: string;
  shortTitle: string;
  appSource: string;
  desc: string;
  benefits: string[];
  outputType: string;
  linkText: string;
  testFormUrl: string;
  googleSheetUrl: string;
  sheetName: string;
}

export interface StudentTestimonial {
  id: string;
  anonymousLabel: string;
  gradeGroup: string;
  guidanceArea: GuidanceArea;
  serviceType: string;
  datePeriod: string;
  quote: string;
  outcomeHighlight: string;
  helpfulnessRating: number;
  confidentialityNote: string;
}
