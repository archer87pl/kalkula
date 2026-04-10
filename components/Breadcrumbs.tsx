import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className="breadcrumbs">
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li
            key={index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {item.href ? (
              <Link href={item.href} itemProp="item">
                <span itemProp="name">{item.name}</span>
              </Link>
            ) : (
              <span itemProp="name" className="current">
                {item.name}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
            {index < items.length - 1 && <span className="separator"> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
