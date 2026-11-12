import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "framer-motion";
import { Crown, Scale } from "lucide-react";
import ParticipantIdentity from "./ParticipantIdentity";
import StatusPill from "./StatusPill";

/**
 * One candidate's share of a position's votes.
 *
 *   <VoteShareBar candidate={row} leader={row.vote_count === max} />
 */
export default function VoteShareBar({ candidate, leader = false, rank }) {
  const reduceMotion = useReducedMotion();
  const share = Math.max(0, Math.min(100, Number(candidate?.vote_percentage ?? 0)));
  const disqualified = candidate?.status && candidate.status !== "active";

  return (
    <div className={`d-flex flex-column gap-2 p-2 rounded-3 ${candidate?.is_winner ? "bg-primary-50" : ""}`}>
      <div className="d-flex flex-row align-items-center gap-2">
        {rank && <span className="text-iron-400 font-size-xs fw-semibold" style={{ width: "1.25rem" }}>#{rank}</span>}
        <div className="flex-grow-1" style={{ minWidth: 0 }}>
          <ParticipantIdentity
            person={candidate?.participant}
            name={candidate?.name}
            type={candidate?.candidate_type}
            size="2rem"
            trailing={
              <div className="d-flex flex-row align-items-center gap-1">
                {candidate?.is_winner && (
                  <StatusPill tone="primary">
                    <Crown size={11} /> Winner
                  </StatusPill>
                )}
                {candidate?.is_tied && (
                  <StatusPill tone="warning">
                    <Scale size={11} /> Tied
                  </StatusPill>
                )}
                {disqualified && <StatusPill tone="danger">{candidate.status === "withdrawn" ? "Withdrawn" : "Disqualified"}</StatusPill>}
              </div>
            }
          />
        </div>
        <div className="d-flex flex-column align-items-end flex-shrink-0" style={{ minWidth: "4rem" }}>
          <span className="fw-semibold font-size-sm">
            <NumberFlow value={candidate?.vote_count ?? 0} />
          </span>
          <span className="text-iron-400" style={{ fontSize: "0.68rem" }}>{share.toFixed(1)}%</span>
        </div>
      </div>
      <div className="rounded-pill overflow-hidden bg-iron-100" style={{ height: 6 }}>
        <motion.div
          className={`h-100 rounded-pill ${disqualified ? "bg-iron-300" : leader ? "bg-primary-500" : "bg-primary-300"}`}
          initial={{ width: 0 }}
          animate={{ width: `${share}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.2, 0, 0, 1] }}
        />
      </div>
    </div>
  );
}
