export interface SessionInfo {
  daf: boolean;
  tom: boolean;
}

export type Sessions = Record<string, SessionInfo>;

export type Person = 'daf' | 'tom';
