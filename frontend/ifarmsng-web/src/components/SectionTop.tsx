export default function SectionTop({
  eyebrow, kicker, light = false,
}: { eyebrow: string; kicker: string; light?: boolean }) {
  return (
    <div className="section-top">
      <p className={light ? "eyebrow eyebrow-light" : "eyebrow"}><span></span> {eyebrow}</p>
      <p className={light ? "section-kicker light-kicker" : "section-kicker"}>{kicker}</p>
    </div>
  );
}
