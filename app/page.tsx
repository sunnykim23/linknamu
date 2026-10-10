const links = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Blog', href: 'https://velog.io' },
  { label: 'Portfolio', href: 'https://behance.net' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
          <section className="mx-auto w-full max-w-[680px] rounded-[28px] border-[3px] border-slate-900 bg-white p-5 shadow-[8px_8px_0_0_rgba(15,23,42,0.05)] sm:p-8">
            <div className="flex items-center justify-center pt-2">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-slate-900 bg-white sm:h-40 sm:w-40">
                <img
                  src="/profile.png"
                  alt="프로필 사진"
                  className="h-full w-full rounded-full object-cover"
                  style={{ objectPosition: 'center 18%' }}
                />
              </div>
            </div>

            <div className="mt-7 text-center">
              <h1 className="text-3xl font-medium tracking-tight text-slate-900">김민성</h1>
              <p className="mt-4 text-lg text-slate-700">몽환적 감각자, 꿈 제작자</p>
            </div>

            <div className="mt-8 space-y-4">
              {links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[18px] border-[3px] border-slate-900 bg-white px-4 py-4 text-center transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(15,23,42,0.08)]"
                >
                  <span className="text-lg font-medium text-slate-900">{link.label}</span>
                  {index === links.length - 1 && <span className="ml-2 text-sm text-slate-500">...</span>}
                </a>
              ))}
            </div>
          </section>
    </main>
  );
}
