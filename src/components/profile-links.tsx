'use client';

import { useEffect, useState } from 'react';
import { links, type LinkId } from '@/src/lib/links';

type LinkCounts = Record<LinkId, number>;

const initialCounts = Object.fromEntries(links.map((link) => [link.id, 0])) as LinkCounts;

function isCountsResponse(value: unknown): value is { counts: LinkCounts } {
  if (typeof value !== 'object' || value === null || !('counts' in value)) {
    return false;
  }

  const counts = value.counts;
  if (typeof counts !== 'object' || counts === null) {
    return false;
  }

  const countMap = counts as Record<string, unknown>;
  return links.every(
    (link) => Number.isSafeInteger(countMap[link.id]) && (countMap[link.id] as number) >= 0,
  );
}

export function ProfileLinks() {
  const [counts, setCounts] = useState<LinkCounts>(initialCounts);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    let active = true;

    async function loadCounts() {
      try {
        const response = await fetch('/api/links', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Click-count request failed with status ${response.status}`);
        }

        const payload: unknown = await response.json();
        if (!isCountsResponse(payload)) {
          throw new Error('Click-count response has an invalid shape');
        }

        if (active) {
          setCounts(payload.counts);
          setStatusMessage('');
        }
      } catch (error) {
        console.error('Unable to load link click counts', error);
        if (active) {
          setStatusMessage('클릭 수를 불러오지 못했습니다.');
        }
      }
    }

    void loadCounts();

    return () => {
      active = false;
    };
  }, []);

  async function recordClick(id: LinkId) {
    setCounts((current) => ({ ...current, [id]: current[id] + 1 }));
    setStatusMessage('');

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
        keepalive: true,
      });

      if (!response.ok) {
        throw new Error(`Click-count update failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`Unable to record click for link "${id}"`, error);
      setCounts((current) => ({ ...current, [id]: Math.max(0, current[id] - 1) }));
      setStatusMessage('클릭 수를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  return (
    <>
      <nav aria-label="프로필 링크" className="mt-9 space-y-3.5 sm:mt-10 sm:space-y-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => void recordClick(link.id)}
            className="group relative flex min-h-[68px] items-center justify-center rounded-[20px] border border-white/75 bg-white/55 px-14 py-4 text-center shadow-[0_8px_24px_rgba(120,82,59,0.12)] backdrop-blur-xl transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-[0_12px_28px_rgba(120,82,59,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8e8dc]"
          >
            <span className="text-base font-semibold tracking-[-0.02em] text-stone-800 sm:text-[17px]">
              <span className="mr-2.5" aria-hidden="true">{link.emoji}</span>
              {link.label}
            </span>
            <span className="absolute right-4 text-xs font-medium tabular-nums text-stone-500 sm:right-5">
              {counts[link.id].toLocaleString('ko-KR')}회
            </span>
          </a>
        ))}
      </nav>
      {statusMessage && (
        <p aria-live="polite" className="mt-3 text-center text-xs text-red-700">
          {statusMessage}
        </p>
      )}
    </>
  );
}
