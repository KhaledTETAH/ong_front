import "./SimpleFooter.css";

export default function SimpleFooter({ note }: { note: string }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-note mb-0 border-0 pt-0">{note}</p>
      </div>
    </footer>
  );
}
