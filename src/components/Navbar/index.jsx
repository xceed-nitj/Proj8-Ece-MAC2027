import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// ─── Nav data ─────────────────────────────────────────────────────────────────

const navigationLeft = [
  { name: "Home", href: "/" },
  { name: "Tracks", href: "/69cc7e9d993a5edc16baf1c0" },
  {
    name: "Committees",
    href: "",
    subItems: [
      { name: "Organising Heads", href: "/69cc7e87993a5edc16baf0d8" },
      // { name: "International Advisory Committee", href: "/69cc7e8c993a5edc16baf0fe" },
      { name: "Advisory Committee", href: "/69cc7e90993a5edc16baf125" },
      { name: "Technical Committee", href: "/69cc7e95993a5edc16baf14b" },
      { name: "Other Committees", href: "/69cc7e99993a5edc16baf181" },
    ],
  },
];

const navigationRight = [
  {
    name: "Registration",
    href: "",
    subItems: [
      { name: "Registration Fee", href: "/69cc7ebb993a5edc16baf397" },
      { name: "Registration Link", href: "/69cc7eb5993a5edc16baf30e" },
    ],
  },
  { name: "Location", href: "/69cc7ec2993a5edc16baf3cc" },
  { name: "Accommodation", href: "/69cc7ec7993a5edc16baf3f2" },
  { name: "Keynote Speakers", href: "/68859782959ec9c788f1056d" },
  { name: "Contact Us", href: "/69cc7eaf993a5edc16baf2ca" },
 
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isActive(href, pathname) {
  if (!href) return false;
  return pathname === href || pathname === href.trim();
}

// ─── Shared nav background ────────────────────────────────────────────────────
// Matches the hero left-side gradient exactly
const NAV_BG = "linear-gradient(90deg, #0a0f1e 0%, #0f172a 30%, #1e3a8a 70%, #1d4ed8 100%)";
const NAV_BG_SCROLLED =
  "linear-gradient(90deg, rgba(10,15,30,0.97) 0%, rgba(15,23,42,0.97) 30%, rgba(30,58,138,0.97) 70%, rgba(29,78,216,0.97) 100%)";

// ─── Desktop NavItem ──────────────────────────────────────────────────────────

function DesktopNavItem({ item, currentPath }) {
  const name = item.name;
  const active = item.subItems
    ? item.subItems.some((s) => isActive(s.href, currentPath))
    : isActive(item.href, currentPath);

  // Base class — white text, subtle hover state
  const linkBase = cx(
    "relative inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] rounded-md transition-all duration-200 group whitespace-nowrap select-none",
    active
      ? "text-white"
      : "text-white/75 hover:text-white"
  );

  // White sliding underline
  const underline = (
    <span
      className={cx(
        "absolute bottom-0 left-2.5 right-2.5 h-[2px] rounded-full transition-transform duration-300 origin-left",
        active ? "scale-x-100 bg-white" : "scale-x-0 group-hover:scale-x-100 bg-white/80"
      )}
    />
  );

  if (item.isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(linkBase, "text-sky-300 hover:text-sky-200")}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {name}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        {underline}
      </a>
    );
  }

  if (item.subItems) {
    return (
      <div className="relative group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <button className={linkBase}>
          {name}
          <svg
            className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd" />
          </svg>
          {underline}
        </button>

        {/* Dropdown — white card for contrast against dark nav */}
        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50 min-w-[230px]">
          <div
            className="bg-white rounded-xl overflow-hidden border border-blue-100"
            style={{ boxShadow: "0 12px 40px rgba(10,15,30,0.25)" }}
          >
            <div className="py-1.5">
              {item.subItems.map((sub) => (
                <Link
                  key={sub.name}
                  to={sub.href}
                  className={cx(
                    "flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-semibold transition-colors duration-150 group/sub",
                    isActive(sub.href, currentPath)
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-700 hover:text-blue-700 hover:bg-blue-50/70"
                  )}
                >
                  <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover/sub:opacity-100 transition-opacity flex-shrink-0" />
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Link
        to={item.href}
        className={linkBase}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {name}
        {underline}
      </Link>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({});

  const currentPath = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSection = (name) =>
    setMobileOpen((prev) => ({ ...prev, [name]: !prev[name] }));

  const allNavItems = [...navigationLeft, ...navigationRight];

  return (
    <div className="sticky top-0 z-50 font-sans">
      <Disclosure as="header">
        {({ open, close }) => (
          <>
            {/* ── Main bar ── */}
            <div
              className="transition-all duration-300"
              style={{
                background: scrolled ? NAV_BG_SCROLLED : NAV_BG,
                backdropFilter: scrolled ? "blur(12px)" : "none",
                boxShadow: scrolled
                  ? "0 4px 24px rgba(10,15,30,0.5)"
                  : "0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-[54px] items-center justify-between">

                  {/* Mobile: hamburger + brand */}
                  <div className="flex items-center gap-3 lg:hidden">
                    <Disclosure.Button
                      className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none"
                      aria-label="Toggle menu"
                    >
                      {open
                        ? <XMarkIcon className="h-5 w-5" />
                        : <Bars3Icon className="h-5 w-5" />}
                    </Disclosure.Button>

                    <Link to="/" className="flex items-center gap-2" onClick={close}>
                      <img src="/logo.png" alt="NITJ" className="h-7 w-auto object-contain brightness-0 invert" />
                      <span className="text-lg font-bold font-poppins tracking-widest text-white">
                        MAC 2027
                      </span>
                    </Link>
                  </div>

                  {/* Desktop: full nav */}
                  <nav className="hidden lg:flex items-center justify-between w-full" aria-label="Main navigation">

                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 mr-5 group">
                      <div className="flex flex-col leading-none">
                        <span className="font-poppins text-[15px] font-bold tracking-[0.22em] text-white">
                          MAC 2027
                        </span>
                        <span className="text-[9px] text-white tracking-[0.15em] uppercase font-medium mt-0.5">
                          NIT Jalandhar
                        </span>
                      </div>
                    </Link>

                    {/* Nav items — centred */}
                    <div className="flex items-center text-white/45 flex-wrap gap-0.5">
                      {allNavItems.map((item) => (
                        <DesktopNavItem key={item.name} item={item} currentPath={currentPath} />
                      ))}
                    </div>

                    {/* Register button — white pill */}
                    <a
                      href="/68859b12959ec9c788f10d16"
                      className="ml-3 flex-shrink-0 inline-flex items-center gap-1.5 bg-white hover:bg-blue-50 text-blue-900 text-[11px] font-bold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 tracking-wide"
                    >
                      Register Now
                    </a>
                  </nav>

                  {/* Mobile spacer */}
                  <div className="w-8 lg:hidden" />
                </div>
              </div>
            </div>

            {/* ── Mobile menu ── */}
            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-150 ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-2"
            >
              <Disclosure.Panel
                className="lg:hidden absolute top-full left-0 right-0 z-40 max-h-[76vh] overflow-y-auto"
                style={{
                  background: "linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%)",
                  boxShadow: "0 16px 40px rgba(10,15,30,0.6)",
                }}
              >
                {/* Dot grid */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04]"
                  style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10 px-3 py-3 space-y-0.5">
                  {allNavItems.map((navItem) => {
                    const name = navItem.name;
                    const isExpanded = mobileOpen[name];

                    if (navItem.isExternal) {
                      return (
                        <a
                          key={name}
                          href={navItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-sky-300 hover:bg-white/10 transition-colors duration-150"
                        >
                          {name}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      );
                    }

                    if (navItem.subItems) {
                      return (
                        <div key={name}>
                          <button
                            onClick={() => toggleSection(name)}
                            className={cx(
                              "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-150",
                              navItem.subItems.some((s) => isActive(s.href, currentPath))
                                ? "text-white bg-white/15"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            )}
                          >
                            {name}
                            <svg
                              className={cx("h-4 w-4 transition-transform duration-200", isExpanded ? "rotate-180" : "")}
                              viewBox="0 0 20 20" fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>

                          {isExpanded && (
                            <div className="mt-0.5 ml-3 pl-3 border-l-2 border-white/15 space-y-0.5 py-1">
                              {navItem.subItems.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  onClick={close}
                                  className={cx(
                                    "block rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-150",
                                    isActive(sub.href, currentPath)
                                      ? "text-white bg-white/15"
                                      : "text-white/65 hover:bg-white/10 hover:text-white"
                                  )}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={name}
                        to={navItem.href}
                        onClick={close}
                        className={cx(
                          "block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-150",
                          isActive(navItem.href, currentPath)
                            ? "text-white bg-white/15"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {name}
                      </Link>
                    );
                  })}

                  {/* Mobile register */}
                  <div className="pt-3 pb-1">
                    <a
                      href="/68859b12959ec9c788f10d16"
                      onClick={close}
                      className="block w-full text-center bg-white hover:bg-blue-50 text-blue-900 text-sm font-bold px-4 py-3 rounded-xl transition-colors duration-200"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
