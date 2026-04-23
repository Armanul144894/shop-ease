'use client';

import { useState } from 'react';

export default function BrandLogo({
  brand,
  wrapperClassName = '',
  imageClassName = '',
  textClassName = '',
}) {
  const [failed, setFailed] = useState(false);
  const hasLogo = brand.logoUrl && !failed;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-white ${wrapperClassName}`.trim()}
    >
      {hasLogo ? (
        <img
          src={brand.logoUrl}
          alt={`${brand.name} logo`}
          className={`h-full w-full object-contain ${imageClassName}`.trim()}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className={`block text-center font-semibold uppercase tracking-[0.28em] text-stone-700 ${textClassName}`.trim()}
        >
          {brand.name}
        </span>
      )}
    </div>
  );
}
