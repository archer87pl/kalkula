"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CalculatorIcon from "@/components/CalculatorIcon";
import { CALCULATORS } from "@/lib/calculators";

type RecentCalculatorsProps = {
  currentHref: string;
};

const STORAGE_KEY = "kalkula:last-used";
const MAX_RECENT = 4;

export default function RecentCalculators({ currentHref }: RecentCalculatorsProps) {
  const [recentHrefs, setRecentHrefs] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    let currentList: string[] = [];

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          currentList = parsed.filter((item): item is string => typeof item === "string");
        }
      } catch {
        currentList = [];
      }
    }

    const nextList = [currentHref, ...currentList.filter((item) => item !== currentHref)].slice(
      0,
      MAX_RECENT
    );

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
    setRecentHrefs(nextList.filter((item) => item !== currentHref));
  }, [currentHref]);

  const items = useMemo(
    () =>
      recentHrefs
        .map((href) => CALCULATORS.find((item) => item.href === href))
        .filter((item): item is (typeof CALCULATORS)[number] => Boolean(item)),
    [recentHrefs]
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="recent-block" aria-label="Ostatnio używane kalkulatory">
      <h2>Ostatnio używane kalkulatory</h2>
      <div className="related-links">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="related-link-card">
            <CalculatorIcon icon={item.icon} />
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
