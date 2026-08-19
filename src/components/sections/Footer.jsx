import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__meta">
          <a
            className="footer__cert-link"
            href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=0260EB688F05E48B3BFE24B059E080847706425D434AE5188255131EB60F75AA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oracle Certified Professional, Java SE 11
            <span className="footer__cert-verify mono-label">verify →</span>
          </a>
          <span className="footer__sep">·</span> Pittsburgh, PA
        </p>
      </div>
    </footer>
  )
}
