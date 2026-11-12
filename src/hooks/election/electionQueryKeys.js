// Query keys for the election feature. Mutations invalidate by prefix, so
// e.g. ["electionApplications"] refreshes every filtered application list.
export const electionKeys = {
  elections: (filters = {}) => ["elections", filters],
  election: (electionId) => ["election", electionId],
  participants: (electionId, params = {}) => ["electionParticipants", electionId, params],
  results: (electionId) => ["electionResults", electionId],
  history: (filters = {}) => ["electionHistory", filters],
  stats: (year) => ["electionStats", year],
  applications: (filters = {}) => ["electionApplications", filters],
  application: (applicationId) => ["electionApplication", applicationId],
  candidates: (filters = {}) => ["electionCandidates", filters],
  candidate: (candidateId) => ["electionCandidate", candidateId],
  ballot: (electionId) => ["electionBallot", electionId],
  roles: (filters = {}) => ["electionRoles", filters],
  rolesByElection: (electionId) => ["electionRolesByElection", electionId],
  role: (electionRoleId) => ["electionRole", electionRoleId],
  officeHolders: (filters = {}) => ["officeHolders", filters],
  officeHolder: (holderId) => ["officeHolder", holderId],
  participantHistory: (type, id) => ["participantElectionHistory", type, id],
};

// Prefixes refreshed after anything that changes an election's state.
export const ELECTION_STATE_KEYS = [
  ["elections"],
  ["election"],
  ["electionResults"],
  ["electionHistory"],
];
