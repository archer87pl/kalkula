import Link from "next/link";
import Image from "next/image";

type PageHeaderProps = {
  showBack?: boolean;
};

export default function PageHeader({ showBack = true }: PageHeaderProps) {
  return (
    <header className={`site-header ${showBack ? "" : "site-header-home"}`.trim()}>
      <Link href="/" className="brand logo-link" aria-label="Przejdź do strony głównej">
        <Image src="/logo.svg" alt="kalkula.pl" width={220} height={92} priority />
      </Link>
      {showBack && (
        <Link href="/" className="back-link">
          Wróć na stronę główną
        </Link>
      )}
    </header>
  );
}
