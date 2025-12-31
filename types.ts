export enum RiskLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  WARNING = 'WARNING'
}

export enum ProcessStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  CLOSED = 'CLOSED'
}

export interface MonitorObject {
  id: string;
  name: string;
  module: string;
  riskLevel: RiskLevel;
  stats: {
    totalExceptions: number;
    newToday: number;
  };
}

export interface RiskEvent {
  id: string;
  riskLevel: RiskLevel;
  status: ProcessStatus;
  owner: string;
  snCount: number;
  impact: number;
  updatedAt: string;
  slaPercent: number;
}