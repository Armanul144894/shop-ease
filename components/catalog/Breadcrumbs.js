import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="transition hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-stone-900">{item.label}</span>
          )}
          {index < items.length - 1 ? <ChevronRight size={14} /> : null}
        </div>
      ))}
    </div>
  );
}
