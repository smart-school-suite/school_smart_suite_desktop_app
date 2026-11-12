/**
 * White rounded panel with a header used across the election workspace.
 *
 *   <SectionCard title="Positions" description="..." actions={<button/>}>...</SectionCard>
 */
export default function SectionCard({ title, description, actions, children, className = "", bodyClassName = "" }) {
  return (
    <section className={`bg-white border rounded-4 d-flex flex-column ${className}`} style={{ minWidth: 0 }}>
      {(title || actions) && (
        <header className="d-flex flex-row align-items-start justify-content-between gap-2 px-3 pt-3">
          <div className="d-flex flex-column" style={{ minWidth: 0 }}>
            {title && <span className="fw-semibold font-size-sm">{title}</span>}
            {description && <span className="text-iron-500 font-size-xs">{description}</span>}
          </div>
          {actions && <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">{actions}</div>}
        </header>
      )}
      <div className={`p-3 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
