import { ProfileLinks } from '@/src/components/profile-links';

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

        <ProfileLinks />
      </section>
    </main>
  );
}
