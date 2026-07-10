export type WindowModuleId =
  | "home"
  | "cryodeath-vr"
  | "press-kit"
  | "contact"
  | "cryodeath-quest"
  | "analytics"
  | "world"
  | "compliance";

export interface OSWindow {
  id: string;
  moduleId: WindowModuleId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
}

export interface ConsentState {
  video: boolean;
  analytics: boolean;
  translator: boolean;
}

export interface NavShortcut {
  id: WindowModuleId;
  label: string;
  icon: string;
  title: string;
  defaultWidth: number;
  defaultHeight: number;
}

export interface BootLine {
  text: string;
  delay: number;
}

export interface RoadmapMilestone {
  label: string;
  status: "complete" | "development";
}

export interface MetricStat {
  value: number;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  steam: string;
  discord: string;
  message: string;
  businessEnquiry: boolean;
  lookingForWork: boolean;
  support: boolean;
  consent: boolean;
}
