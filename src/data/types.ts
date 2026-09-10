export type Semester = 1 | 2;

export type FlowPhase =
  | "açılış"
  | "anımsama"
  | "anlatım"
  | "gösteri"
  | "uygulama"
  | "paylaşım"
  | "değerlendirme"
  | "temizlik";

export type FlowStep = {
  min: number;
  phase: FlowPhase;
  title: string;
  teacher: string;
  student: string;
};

export type Trouble = {
  problem: string;
  cause: string;
  fix: string;
};

export type SampleCode = {
  title: string;
  lang: "cpp" | "blocks";
  code: string;
  notes?: string;
};

export type Wiring = {
  title: string;
  items: string[];
};

export type LessonHour = {
  hour: 1 | 2;
  title: string;
  aim: string;
  outcomes: string[];
  materials: string[];
  prep: string[];
  safety: string[];
  flow: FlowStep[];
  keyPoints: string[];
  steps: string[];
  code?: SampleCode;
  wiring?: Wiring;
  troubleshooting: Trouble[];
  exitTicket: string[];
  support: string;
  extension: string;
  ortaokul: string;
  lise: string;
  homework?: string;
  tips: string[];
  altArduino: string;
  altMbot?: string;
  altSpike?: string;
};

export type WeekPlan = {
  week: number;
  month: string;
  dates: string;
  semester: Semester;
  unit: string;
  title: string;
  why: string;
  prior: string[];
  weekGoal: string;
  hours: [LessonHour, LessonHour];
};

export type BomItem = {
  item: string;
  qtyPerTeam: string;
  teamsOf8: string;
  note: string;
  phase: string;
};
