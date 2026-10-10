const links = [
  { label: 'GitHub', href: 'https://github.com/sunnykim23', emoji: '🐙' },
  { label: 'Instagram', href: 'https://www.instagram.com/deir.finity/', emoji: '📱' },
  { label: 'Email', href: 'mailto:boyrukim@gmail.com', emoji: '📮' },
];

export default function HomePage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.82),transparent_48%),linear-gradient(145deg,#fbf5e9_0%,#f9e5d8_54%,#f4ddd1_100%)] px-4 py-12 text-stone-900 sm:px-6">
      <div className="sparkle-field" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span className="sparkle" key={index}>✦</span>
        ))}
      </div>
      <section className="relative z-10 w-full max-w-[480px] px-2 py-4 sm:px-6 sm:py-8">
        <div className="flex justify-center">
          <div className="profile-glow rounded-full bg-white/75 p-1.5 ring-1 ring-amber-200/80">
            <img
              src="/profile.png"
              alt="프로필 사진"
              className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36"
              style={{ objectPosition: 'center 18%' }}
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold tracking-[-0.04em] text-stone-900 sm:text-[2rem]">
            김민성
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-7 text-stone-600 sm:text-base">
            몽환적 감각자, 꿈 제작자 : 요즘에는 AI 코딩에 관심이 많아요
          </p>
        </div>

        <nav aria-label="프로필 링크" className="mt-9 space-y-3.5 sm:mt-10 sm:space-y-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[68px] items-center justify-center rounded-[20px] border border-white/75 bg-white/55 px-5 py-4 text-center shadow-[0_8px_24px_rgba(120,82,59,0.12)] backdrop-blur-xl transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-[0_12px_28px_rgba(120,82,59,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8e8dc]"
            >
              <span className="text-base font-semibold tracking-[-0.02em] text-stone-800 sm:text-[17px]">
                <span className="mr-2.5" aria-hidden="true">{link.emoji}</span>
                {link.label}
              </span>
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
