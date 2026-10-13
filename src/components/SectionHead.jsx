/** Eyebrow label + heading + optional intro, laid out side by side on wide screens. */
export default function SectionHead({ eyebrow, title, id, intro, children, level = 2, className = '' }) {
  const H = `h${level}`;
  return (
    <div className={`section-head ${className}`}>
      <div className="section-head-main">
        {eyebrow && (
          <p className="eyebrow" data-reveal="">
            {eyebrow}
          </p>
        )}
        <H id={id} className="section-title" data-reveal="">
          {title}
        </H>
      </div>
      {intro && (
        <p className="section-intro" data-reveal="">
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}
