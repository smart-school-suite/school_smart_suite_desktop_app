import { Award, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import OfficeHolderCard from "../../components/Election/OfficeHolderCard";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import SearchInput from "../../components/input/search";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import AppointOfficeHolder from "../../DrawerContent/ElectionOffice/AppointOfficeHolder";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useGetOfficeHolders } from "../../hooks/electionOffice/useGetOfficeHolders";
import {
  APPOINTMENT_TYPE,
  OFFICE_HOLDER_STATUS,
  matchesQuery,
  participantTypeLabel,
  serverErrorCopy,
} from "../../utils/election/electionDisplay";

const MASCOT_HEIGHT = "7rem";

const STATUS_TABS = [
  { key: "current", label: "In office", statuses: ["active", "scheduled"] },
  { key: "completed", label: "Completed", statuses: ["completed"] },
  { key: "terminated", label: "Ended early", statuses: ["terminated"] },
  { key: "all", label: "All", statuses: null },
];

function AppointTrigger({ children }) {
  return (
    <DrawerTrigger title="Appoint Office Holder" placement="right" drawerChildren={AppointOfficeHolder}>
      {children}
    </DrawerTrigger>
  );
}

export default function ElectionOfficeHolders() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("current");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const { data, isLoading, error } = useGetOfficeHolders();
  const holders = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        STATUS_TABS.map((item) => [item.key, item.statuses ? holders.filter((h) => item.statuses.includes(h.status)).length : holders.length]),
      ),
    [holders],
  );

  const visible = useMemo(() => {
    const statuses = STATUS_TABS.find((item) => item.key === tab)?.statuses;
    return holders.filter(
      (holder) =>
        (!statuses || statuses.includes(holder.status)) &&
        matchesQuery(
          [
            holder.name,
            holder.position?.name,
            holder.election?.title,
            participantTypeLabel(holder.holder_type),
            APPOINTMENT_TYPE[holder.appointment_type]?.label,
            OFFICE_HOLDER_STATUS[holder.status]?.label,
          ],
          debouncedSearch,
        ),
    );
  }, [holders, tab, debouncedSearch]);

  // Group current holders by position so each office reads as a unit.
  const grouped = useMemo(() => {
    const map = new Map();
    visible.forEach((holder) => {
      const key = holder.position?.id ?? "none";
      if (!map.has(key)) map.set(key, { position: holder.position, holders: [] });
      map.get(key).holders.push(holder);
    });
    return [...map.values()];
  }, [visible]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="teacher-card-grid">
          {[...Array(6)].map((_, index) => <RectangleSkeleton key={index} height="15rem" />)}
        </div>
      );
    }
    if (error) {
      return <EmptyState mascot="error" height="100%" mascotHeight={MASCOT_HEIGHT} {...serverErrorCopy(error, "Unable to load office holders", "Something went wrong while loading the office holders.")} />;
    }
    if (holders.length === 0) {
      return (
        <EmptyState
          mascot="sad"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No office holders yet"
          description="Office holders are created when election results are published. You can also appoint someone directly, for example when a position was not contested."
          actions={
            <>
              <AppointTrigger>
                <EmptyStateButton icon={UserPlus}>Appoint Office Holder</EmptyStateButton>
              </AppointTrigger>
              <EmptyStateButton variant="secondary" icon={Award} onClick={() => navigate("/elections")}>
                Go to Elections
              </EmptyStateButton>
            </>
          }
        />
      );
    }
    if (visible.length === 0) {
      return (
        <EmptyState
          mascot="notFound"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title={debouncedSearch ? "No matching office holders" : "Nobody in this list"}
          description={debouncedSearch ? `No office holder matches "${debouncedSearch}". Try a name, position or election.` : "Choose another tab to see other office holders."}
          actions={
            <EmptyStateButton
              variant="secondary"
              onClick={() => {
                setSearch("");
                setTab("all");
              }}
            >
              Show everyone
            </EmptyStateButton>
          }
        />
      );
    }
    return (
      <div className="d-flex flex-column gap-3">
        {grouped.map(({ position, holders: list }) => (
          <div key={position?.id ?? "none"} className="d-flex flex-column gap-2">
            <div className="d-flex flex-row align-items-center gap-2 font-size-sm">
              <span className="fw-semibold">{position?.name ?? "Position"}</span>
              <span className="text-iron-400 font-size-xs">
                {list.length} holder{list.length > 1 ? "s" : ""}
                {position?.seats ? ` · ${position.seats} seat${position.seats > 1 ? "s" : ""}` : ""}
              </span>
            </div>
            <div className="teacher-card-grid">
              {list.map((holder) => (
                <OfficeHolderCard key={holder.id} holder={holder} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="d-flex flex-column gap-2 h-100" style={{ minHeight: 0 }}>
      <div className="d-flex flex-row align-items-center justify-content-between gap-2 flex-shrink-0">
        <div className="d-flex flex-row align-items-center gap-1 bg-white border rounded-3 p-1" role="tablist" aria-label="Office holder status">
          {STATUS_TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={tab === item.key}
              onClick={() => setTab(item.key)}
              className={`border-none rounded-2 font-size-xs px-2 py-1 d-flex flex-row gap-1 ${tab === item.key ? "bg-primary-50 text-primary-600 fw-semibold" : "bg-transparent text-iron-500"}`}
            >
              <span>{item.label}</span>
              <span className={tab === item.key ? "text-primary-500" : "text-iron-400"}>{counts[item.key] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="d-flex flex-row align-items-center gap-2" style={{ width: "45%" }}>
          <SearchInput
            placeholder="Search by name, position or election"
            value={search}
            onChange={(value) => setSearch(value ?? "")}
            disabled={holders.length === 0}
          />
          <AppointTrigger>
            <button type="button" className="border-none rounded-3 font-size-sm px-3 primary-background text-white text-nowrap d-flex flex-row align-items-center gap-1" style={{ padding: "0.38rem" }}>
              <UserPlus size={14} /> Appoint
            </button>
          </AppointTrigger>
        </div>
      </div>
      <div className="flex-grow-1 scroll-bar-sm over-flow-y-auto over-flow-x-hidden pe-1 pb-2" style={{ minHeight: 0 }}>
        {renderContent()}
      </div>
    </div>
  );
}
