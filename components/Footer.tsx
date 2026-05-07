import Link from "next/link";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12px"
    height="12px"
    className="fill-gray group-hover:fill-white transition-colors text-[0.6rem] md:text-[0.75rem]"
    viewBox="0 0 256 256"
  >
    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
  </svg>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-2 border border-dashed border-gray text-gray hover:border-white hover:text-white transition-colors px-3 py-1 uppercase text-[0.5rem] md:text-[0.75rem]"
  >
    <span>{children}</span>
    <ArrowIcon />
  </a>
);

export default function Footer() {
  return (
    <footer className="hidden w-full bg-black text-white pt-20">
      <div className="p-6 flex flex-col gap-12">
        {/* Footer top */}
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          <div className="flex flex-col md:flex-row justify-between w-full md:w-1/2">
            <div className="flex flex-col gap-3">
              <p className="text-gray">Contact:</p>
              <p className="text-white leading-relaxed max-w-xs">
                Reach out for orders, collaborations,
                <br />
                or just to say hi :)
              </p>
              <div className="md:mt-5">
                <FooterLink href="mailto:hello@hussh.com">Email</FooterLink>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3 mt-8 md:mt-0">
              <p className="text-gray">Socials:</p>
              <div className="flex flex-wrap md:flex-col gap-2">
                <FooterLink href="https://instagram.com/hussh">
                  Instagram
                </FooterLink>
                <FooterLink href="https://x.com/hussh">Twitter</FooterLink>
                <FooterLink href="https://pinterest.com/hussh">
                  Pinterest
                </FooterLink>
                <FooterLink href="https://tiktok.com/@hussh">TikTok</FooterLink>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-3">
            {/* Plate */}
            <div className="flex flex-col justify-between items-end">
              <div className="border-x border-t border-dashed border-gray text-[0.65rem] text-gray leading-relaxed text-center">
                <p className="text-white border-b border-gray border-dashed p-2">
                  SS COLLECTION 26
                </p>
                <div className="flex items-center gap-2 border-gray border-dashed p-4">
                  <div className="relative w-16 h-16">
                    <img
                      className="absolute inset-0 w-full h-full"
                      src="/logo.svg"
                      alt="Logo Hussh"
                    />
                  </div>{" "}
                  <div className="text-white text-right">
                    <p>MINIMAL DESIGN</p>
                    <p>NATURAL FABRICS</p>
                    <p>
                      BASED IN
                      <br /> BUENOS AIRES (AR)
                    </p>
                  </div>
                </div>
              </div>
              <span className="text-[0.75rem] bg-gray text-black w-full text-center">
                Hussh__©2026
              </span>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex items-center justify-between gap-4 pt-6">
          <p className="text-gray text-[0.75rem]">All rights reserved.</p>
          <div className="flex items-center gap-3 text-gray text-[0.75rem]">
            <div className="flex gap-1">
              <span className="text-gray">▊</span>
              <span className="text-white">▊</span>
            </div>
            <Link
              href={"https://brunog.com.ar/"}
              className="text-[.6rem] sm:text-[.8rem] text-end w-full"
            >
              Hecho por{" "}
              <span className="text-white relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right md:after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">
                Bruno G.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
