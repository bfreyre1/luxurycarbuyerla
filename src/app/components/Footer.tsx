export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="font-display text-2xl text-white">Luxury Car Buyer LA</p>
        <p className="mt-2 text-sm text-muted">
          Discreet acquisition backed by{" "}
          <span className="text-gold-light">Jin Falk Lexus of Beverly Hills</span> standards
        </p>
        <p className="mt-6 text-xs text-zinc-600">
          © {new Date().getFullYear()} Luxury Car Buyer LA · Los Angeles & Southern California
        </p>
      </div>
    </footer>
  );
}
