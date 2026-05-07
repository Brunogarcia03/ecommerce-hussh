import Hero from "@/components/Hero";
import About from "@/components/home/About";
import ProductGrid from "@/components/home/ProductsGrid";
import HeroTime from "@/components/ui/HeroTime";
import ParallaxImage from "@/components/ui/Images";

import NavLink from "@/components/ui/NavLink";
import VideoSection from "@/components/VideoSection";

function Home() {
  return (
    <main className="bg-black h-full">
      <Hero />
      <section className="hero inset-0 w-screen overflow-x-hidden min-h-svh p-6 bg-black text-white text-center scale-[0.75] transition-colors duration-500 will-change-transform z-1">
        <div
          className="preloader-revealer absolute inset-0 w-full h-full bg-white"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            willChange: "clip-path",
          }}
        />
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-x-3 md:gap-5 w-full mx-auto">
          <h1 className="text-white">Hussh</h1>

          <div className="hero-meta flex flex-col justify-between md:w-1/2 opacity-0">
            <div className="flex flex-col sm:flex-row items-center md:items-start justify-between gap-2 md:w-full">
              <p className="text-white leading-relaxed text-center sm:text-left">
                Hussh is a clothing brand focused in
                <br />
                minimal design and natural fabrics.
                <br />
                Crafted for those who move in silence.
              </p>
              <div className="flex flex-col">
                <HeroTime />
              </div>
            </div>

            <div className="flex items-end justify-between w-full">
              <div className="hidden md:block text-left mt-2">
                <div className="mt-3 text-gray leading-relaxed">
                  <p>Location:</p>
                  <p className="text-white">Buenos Aires, AR</p>
                </div>
                <div className="flex items-center justify-between mt-1 text-gray leading-relaxed">
                  <div className="flex gap-px">
                    <span className="text-white font-barlow text-2xl font-extrabold leading-none">
                      2026
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p>Season:</p>
                    <p className="text-gray">SS — 26</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:block text-right text-gray leading-relaxed">
                <div className="mt-3">
                  <p>Inquiries:</p>
                  <NavLink href="mailto:hello@hussh.com" external>
                    Email
                  </NavLink>
                </div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2 md:mt-5 w-full uppercase">
              <p className="hidden lg:block font-spline text-[0.65rem] text-gray">
                Links:
              </p>
              <NavLink href="/" icon={false}>
                Home
              </NavLink>
              <NavLink href="/catalog">Catalog</NavLink>
              <NavLink href="/collections">Collections</NavLink>
              <NavLink href="/about">About</NavLink>
            </nav>
          </div>
        </div>
        <ParallaxImage />
        <ProductGrid />
        <VideoSection />
        {/* <About /> */}
      </section>
    </main>
  );
}

export default Home;
