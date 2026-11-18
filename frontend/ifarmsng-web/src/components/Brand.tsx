import Link from "next/link";

export default function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={footer ? "brand brand-footer" : "brand"} href="/#top" aria-label="iFarmsNG home">
      <span className="brand-mark" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
      <span className="brand-name">
        iFarms<span>NG</span>
        <small>AGRO BUSINESS TECHNOLOGY</small>
      </span>
    </Link>
  );
}
