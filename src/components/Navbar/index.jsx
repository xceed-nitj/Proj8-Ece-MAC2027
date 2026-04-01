import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// ─── Navigation Data ──────────────────────────────────────────────────────────

const navigationLeft = [
  { name: "Home", href: "/" },
  { name: "Tracks", href: "/6885973a959ec9c788f10545" },
  {
    name: "Committees",
    href: "",
    subItems: [
      { name: "Organising Heads", href: "/688594be959ec9c788f1011b" },
      { name: "International Advisory Committee", href: "/68859585959ec9c788f10130" },
      { name: "National Advisory Committee", href: "/688595ab959ec9c788f1018d" },
      { name: "Technical Committee", href: "/6885960c959ec9c788f1036f" },
      { name: "Other Committees", href: "/688596b7959ec9c788f10482" },
    ],
  },
];

const navigationRight = [
  {
    name: "Registration",
    href: "",
    subItems: [
      { name: "Registration Fee", href: "/6885a873959ec9c788f12867" },
      { name: "Registration Link", href: "/68859b12959ec9c788f10d16" },
    ],
  },
  { name: "Location", href: "/6885b8ff959ec9c788f17673" },
  { name: "Accommodation", href: "/6885b92d959ec9c788f17730" },
  { name: "Keynote Speakers", href: "/68859782959ec9c788f1056d" },
  { name: "Contact Us", href: "/6885989c959ec9c788f1084b" },
  {
    name: "EAIC 2025",
    href: "http://eaic2025.netlify.app",
    target: "_blank",
    isExternal: true,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isActive(href, pathname) {
  if (!href) return false;
  return pathname === href || pathname === href.trim();
}

// ─── Desktop NavItem ──────────────────────────────────────────────────────────

function DesktopNavItem({ item, currentPath }) {
  const name = item.name;
  const active = item.subItems
    ? item.subItems.some((s) => isActive(s.href, currentPath))
    : isActive(item.href, currentPath);

  const linkBase = cx(
    "relative inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] rounded-md transition-colors duration-200 group whitespace-nowrap select-none",
    active ? "text-blue-700" : "text-slate-600 hover:text-blue-700"
  );

  const underline = (
    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
  );

  if (item.isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(linkBase, "text-blue-600 hover:text-blue-700")}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
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
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {underline}
        </button>

        {/* Dropdown */}
        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50 min-w-[220px]">
          <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-blue-50"
            style={{ boxShadow: "0 8px 32px rgba(30,58,138,0.10)" }}
          >
            <div className="py-1.5">
              {item.subItems.map((sub) => (
                <Link
                  key={sub.name}
                  to={sub.href}
                  className={cx(
                    "flex items-center gap-2 px-4 py-2.5 text-[11px] font-medium transition-colors duration-150 group/sub",
                    isActive(sub.href, currentPath)
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-700 hover:text-blue-700 hover:bg-blue-50/60"
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-150 flex-shrink-0" />
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({});

  const currentPath = location.pathname;

  // Add shadow when scrolled
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
      {/* ══════════════════════════════
          TOP INFO BAR
      ══════════════════════════════ */}
      <div
        className="w-full"
        style={{
          height: "34px",
          background:
            "linear-gradient(90deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)",
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Email */}
          <a
            href="mailto:eaic@nitj.ac.in"
            className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors duration-200 hover:text-white"
            style={{ color: "#93c5fd" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="hidden xs:inline">eaic@nitj.ac.in</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+916280432258"
            className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors duration-200 hover:text-white"
            style={{ color: "#93c5fd" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 6.75c0-.621.504-1.125 1.125-1.125h3.375c.444 0 .84.255 1.03.654l1.174 2.348a1.125 1.125 0 01-.21 1.248l-1.239 1.238a11.25 11.25 0 005.303 5.303l1.238-1.239a1.125 1.125 0 011.248-.21l2.348 1.174c.399.19.654.586.654 1.03v3.375c0 .621-.504 1.125-1.125 1.125h-.75C10.67 20.25 3.75 13.33 3.75 5.25v-.75z"
              />
            </svg>
            +91-6280432258
          </a>
        </div>
      </div>

      {/* ══════════════════════════════
          MAIN NAV BAR
      ══════════════════════════════ */}
      <Disclosure as="header">
        {({ open, close }) => (
          <>
            <div
              className={cx(
                "bg-white transition-all duration-300",
                scrolled
                  ? "shadow-lg"
                  : "shadow-sm border-b border-blue-50"
              )}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-[52px] items-center justify-between">

                  {/* ── Mobile: Hamburger + Brand ── */}
                  <div className="flex items-center gap-3 lg:hidden">
                    <Disclosure.Button
                      className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors duration-200 focus:outline-none"
                      aria-label="Toggle menu"
                    >
                      {open ? (
                        <XMarkIcon className="h-5 w-5" />
                      ) : (
                        <Bars3Icon className="h-5 w-5" />
                      )}
                    </Disclosure.Button>

                    <Link to="/" className="flex items-center gap-2" onClick={close}>
                      <img
                        src="/logo.png"
                        alt="NITJ"
                        className="h-7 w-auto object-contain"
                      />
                      <span
                        className="text-lg font-bold font-poppins tracking-widest"
                        style={{
                          background:
                            "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        EAIC 2026
                      </span>
                    </Link>
                  </div>

                  {/* ── Desktop: Full Nav ── */}
                  <nav
                    className="hidden lg:flex items-center justify-between w-full"
                    aria-label="Main navigation"
                  >
                    {/* Brand */}
                    <Link
                      to="/"
                      className="flex items-center gap-2.5 flex-shrink-0 mr-4 group"
                    >
                      <div className="relative">
                        <img
                          src="/logo.png"
                          alt="NIT Jalandhar"
                          className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>
                      <span
                        className="font-poppins text-xl font-bold tracking-[0.2em]"
                        style={{
                          background:
                            "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        EAIC 2026
                      </span>
                    </Link>

                    {/* Nav Items */}
                    <div className="flex items-center flex-wrap gap-0.5">
                      {allNavItems.map((item) => (
                        <DesktopNavItem
                          key={item.name}
                          item={item}
                          currentPath={currentPath}
                        />
                      ))}
                    </div>

                    {/* Register CTA */}
                    <a
                      href="/68859b12959ec9c788f10d16"
                      className="ml-3 flex-shrink-0 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-blue-200 hover:-translate-y-0.5 tracking-wide"
                    >
                      Register
                    </a>
                  </nav>

                  {/* Mobile spacer */}
                  <div className="w-8 lg:hidden" />
                </div>
              </div>
            </div>

            {/* ══════════════════════════════
                MOBILE MENU
            ══════════════════════════════ */}
            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="opacity-0 -translate-y-3"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-150 ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-3"
            >
              <Disclosure.Panel className="lg:hidden bg-white border-t border-blue-50 absolute top-full left-0 right-0 z-40 max-h-[76vh] overflow-y-auto shadow-2xl shadow-blue-950/10">
                <div className="px-3 py-3 space-y-0.5">
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
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                        >
                          {name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 opacity-60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
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
                              navItem.subItems.some((s) =>
                                isActive(s.href, currentPath)
                              )
                                ? "text-blue-700 bg-blue-50"
                                : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                            )}
                          >
                            {name}
                            <svg
                              className={cx(
                                "h-4 w-4 transition-transform duration-200",
                                isExpanded ? "rotate-180" : ""
                              )}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {isExpanded && (
                            <div className="mt-0.5 ml-3 pl-3 border-l-2 border-blue-100 space-y-0.5 py-1">
                              {navItem.subItems.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  onClick={close}
                                  className={cx(
                                    "block rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-150",
                                    isActive(sub.href, currentPath)
                                      ? "text-blue-700 bg-blue-50"
                                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
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
                            ? "text-blue-700 bg-blue-50"
                            : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                        )}
                      >
                        {name}
                      </Link>
                    );
                  })}

                  {/* Mobile Register */}
                  <div className="pt-2.5 pb-1">
                    <a
                      href="/68859b12959ec9c788f10d16"
                      onClick={close}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors duration-200"
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
