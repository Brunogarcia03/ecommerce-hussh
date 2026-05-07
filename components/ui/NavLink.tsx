import Link from "next/link";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    className="fill-gray group-hover:fill-white transition-colors shrink-0"
    viewBox="0 0 256 256"
  >
    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
  </svg>
);

const NavLink = ({
  href,
  children,
  external = false,
  icon = true,
}: {
  href: string;
  children: string;
  external?: boolean;
  icon?: boolean;
}) => {
  const className =
    "group inline-flex items-center gap-2 border border-dashed border-gray text-gray hover:border-white hover:text-white transition-all duration-300 px-3 py-1 font-spline text-[0.65rem] uppercase";

  const inner = (
    <>
      <span className="relative overflow-hidden inline-block">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {icon && <ArrowIcon />}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
};

export default NavLink;
