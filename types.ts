
export type Language = 'en' | 'hi';

export enum AssetType {
  STOCKS = 'Stocks',
  MUTUAL_FUNDS = 'Mutual Funds',
  BANK = 'Bank',
  INSURANCE = 'Insurance',
  CRYPTO = 'Crypto',
  PROPERTY = 'Property'
}

export interface Asset {
  id: string;
  type: AssetType;
  institutionName: string;
  accountNo: string;
  notes?: string;
  proofUrl?: string;
  value?: number;
}

export interface Nominee {
  id: string;
  name: string;
  relation: string;
  mobile: string;
  aadharNo: string;
  verified: boolean;
  sharePercentage: number;
  idProofUrl?: string;
}

export interface EmergencyRule {
  inactivityDays: number;
  requireDeathProof: boolean;
}

export type View = 'login' | 'dashboard' | 'assets' | 'nominees' | 'emergency' | 'kit' | 'support' | 'settings';
