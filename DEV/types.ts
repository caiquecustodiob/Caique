
export interface LyricLine {
  time: number; // Seconds
  text: string;
  isStrong?: boolean;
}

export interface PlayerState {
  currentTime: number;
  isPlaying: boolean;
  duration: number;
}
