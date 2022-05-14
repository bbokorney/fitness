export interface Activity {
  id: string;
  data: {
    duration?: number;
    distance?: number;
    elevation?: number;
    startTime?: Date;
  }
}
