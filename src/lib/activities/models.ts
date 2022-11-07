export interface Activity {
  id?: string;
  type?: string;
  subType?: string;
  source?: string;
  duration?: number;
  distance?: number;
  elevation?: number;
  startTime?: number;
  notes?: string;
  additionalWeight?: number;
}
