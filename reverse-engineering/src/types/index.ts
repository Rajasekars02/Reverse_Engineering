export type ChallengeStatus = 'available' | 'inprogress' | 'completed' | 'locked';

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface Challenge {
  id: number;
  number: string;
  title: string;
  marks: number;
  difficulty: Difficulty;
  description: string;
  status: ChallengeStatus;
  problemStatement: string;
  requirements: string[];
  components: string[];
  expectedBehavior: string[];
  submissionInstructions: string;
}

export interface Participant {
  id: string;
  name: string;
  teamName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  registeredAt: string;
  score: number;
  challengesCompleted: number;
  challengesAttempted: number;
}

export interface Submission {
  id: string;
  participantId: string;
  participantName: string;
  challengeId: number;
  challengeTitle: string;
  solutionLink: string;
  notes: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'accepted' | 'rejected';
  submittedAt: string;
  score?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  teamName: string;
  isAdmin: boolean;
}

export interface ChallengeProgress {
  challengeId: number;
  status: ChallengeStatus;
  startedAt?: string;
  completedAt?: string;
}
