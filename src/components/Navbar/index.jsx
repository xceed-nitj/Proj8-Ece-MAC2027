import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import getEnvironment from "../../getenvironment";

// ─── Fallback nav data (used while mode is "static" or if the fetch fails) ───

const fallbackLeft = [
  { name: "Tracks", href: "/69cc7e9d993a5edc16baf1c0" },
  {
    name: "Committees",
    href: "",
    subItems: [
      { name: "Organising Heads", href: "/69cc7e87993a5edc16baf0d8" },
      { name: "Advisory Committee", href: "/69cc7e90993a5edc16baf125" },
      { name: "Technical Committee", href: "/69cc7e95993a5edc16baf14b" },
      { name: "Other Committees", href: "/69cc7e99993a5edc16baf181" },
    ],
  },
];

const fallbackRight = [
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
  { name: "Keynote Speakers", href: "/69cc7ea8993a5edc16baf25a" },
  { name: "Contact", href: "/69cc7eaf993a5edc16baf2ca" },
];

// ─── Backend item mapping ─────────────────────────────────────────────────────
// Backend item shape: { section, label, linkType, templateId, url, isButton,
//                       order, subItems: [{ label, linkType, templateId, url, order }] }

function resolveHref(item) {
  if (item.linkType === "template") return `/${item.templateId || ""}`;
  return item.url || "#";
}

function mapNavItem(item) {
  return {
    name: item.label,
    href: resolveHref(item),
    isExternal: item.linkType === "external",
    subItems: item.subItems?.length
      ? [...item.subItems]
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((s) => ({
            name: s.label,
            href: resolveHref(s),
            isExternal: s.linkType === "external",
          }))
      : undefined,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isActive(href, pathname) {
  if (!href) return false;
  return pathname === href || pathname === href.trim();
}

// ─── Desktop nav sizing (hardcoded) ───────────────────────────────────────────
const NAV_FONT = { fs: 12, gap: 3, px: 7, tracking: 0.04 };

// ─── Shared nav background ────────────────────────────────────────────────────
const NAV_BG = "linear-gradient(90deg, #0a0f1e 0%, #0f172a 30%, #1e3a8a 70%, #1d4ed8 100%)";
const NAV_BG_SCROLLED =
  "linear-gradient(90deg, rgba(10,15,30,0.97) 0%, rgba(15,23,42,0.97) 30%, rgba(30,58,138,0.97) 70%, rgba(29,78,216,0.97) 100%)";

// ─── Loading skeleton (shown while the menu is fetched) ───────────────────────

function NavSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse" aria-hidden="true">
      {[56, 88, 72, 64, 96, 60].map((w, i) => (
        <span
          key={i}
          className="h-3 rounded-full bg-white/20"
          style={{ width: `${w}px` }}
        />
      ))}
    </div>
  );
}

// ─── Desktop NavItem ──────────────────────────────────────────────────────────

function DesktopNavItem({ item, currentPath }) {
  const name = item.name;
  const active = item.subItems
    ? item.subItems.some((s) => isActive(s.href, currentPath))
    : isActive(item.href, currentPath);

  const linkBase = cx(
    "relative inline-flex items-center gap-1 py-1.5 font-semibold uppercase rounded-md transition-all duration-200 group whitespace-nowrap select-none",
    "text-white"
  );

  const linkStyle = {
    fontSize: `${NAV_FONT.fs}px`,
    letterSpacing: `${NAV_FONT.tracking}em`,
    paddingLeft: `${NAV_FONT.px}px`,
    paddingRight: `${NAV_FONT.px}px`,
  };

  const underline = (
    <span
      className={cx(
        "absolute bottom-0 h-[2px] rounded-full transition-transform duration-300 origin-left",
        active ? "scale-x-100 bg-white" : "scale-x-0 group-hover:scale-x-100 bg-white/80"
      )}
      style={{ left: `${NAV_FONT.px}px`, right: `${NAV_FONT.px}px` }}
    />
  );

  if (item.isExternal && !item.subItems) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkBase}
        style={{ fontFamily: "'Montserrat', sans-serif", ...linkStyle }}
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
        <button className={linkBase} style={linkStyle}>
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

        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50 min-w-[230px]">
          <div
            className="bg-white rounded-xl overflow-hidden border border-blue-100"
            style={{ boxShadow: "0 12px 40px rgba(10,15,30,0.25)" }}
          >
            <div className="py-1.5">
              {item.subItems.map((sub) => {
                const subClass = cx(
                  "flex items-center gap-2.5 px-4 py-2.5 font-semibold transition-colors duration-150 group/sub",
                  isActive(sub.href, currentPath)
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-700 hover:text-slate-900"
                );
                // Same font size as the top-level nav items.
                const subStyle = { fontSize: `${NAV_FONT.fs}px` };
                const dot = (
                  <span className="w-1 h-1 rounded-full bg-slate-400 opacity-0 group-hover/sub:opacity-100 transition-opacity flex-shrink-0" />
                );
                return sub.isExternal ? (
                  <a key={sub.name} href={sub.href} target="_blank" rel="noopener noreferrer" className={subClass} style={subStyle}>
                    {dot}
                    {sub.name}
                  </a>
                ) : (
                  <Link key={sub.name} to={sub.href} className={subClass} style={subStyle}>
                    {dot}
                    {sub.name}
                  </Link>
                );
              })}
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
        style={{ fontFamily: "'Montserrat', sans-serif", ...linkStyle }}
      >
        {name}
        {underline}
      </Link>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar({ confid }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({});

  // Backend-driven menu state
  const [loadingNav, setLoadingNav] = useState(true);
  const [navLeft, setNavLeft] = useState(fallbackLeft);
  const [navRight, setNavRight] = useState(fallbackRight);
  const [registerItem, setRegisterItem] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);

  const currentPath = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    getEnvironment().then((url) => setApiUrl(url));
  }, []);

  // Fetch the menu from the admin backend. Falls back to the hardcoded menu
  // when the admin panel's "backend-driven navbar" toggle is off, the fetch
  // fails, or no items have been configured yet.
  useEffect(() => {
    if (!confid || !apiUrl) {
      if (!confid) setLoadingNav(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/conferencemodule/navitem/public/${confid}`,
          { withCredentials: true }
        );
        if (cancelled) return;
        const data = res.data;

        const items = data.items || [];
        if (data.navbarMode === "dynamic" && items.length > 0) {
          const regular = items.filter((i) => !i.isButton);
          const buttons = items.filter((i) => i.isButton);
          setNavLeft(regular.filter((i) => i.section !== "right").map(mapNavItem));
          setNavRight(regular.filter((i) => i.section === "right").map(mapNavItem));
          if (buttons.length > 0) {
            setRegisterItem({ name: buttons[0].label, href: resolveHref(buttons[0]) });
          }
        }
        // navbarMode === "static" → keep the hardcoded fallback menus.
      } catch (err) {
        console.error("Navbar fetch failed, using fallback menu:", err);
      } finally {
        if (!cancelled) setLoadingNav(false);
      }
    })();
    return () => { cancelled = true; };
  }, [confid, apiUrl]);

  const toggleSection = (name) =>
    setMobileOpen((prev) => ({ ...prev, [name]: !prev[name] }));

  const allNavItems = [...navLeft, ...navRight];

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

                    {/* Nav items — single line (skeleton while loading) */}
                    <div
                      className="flex flex-1 min-w-0 items-center justify-center text-white flex-nowrap"
                      style={{ gap: `${NAV_FONT.gap}px` }}
                    >
                      {loadingNav ? (
                        <NavSkeleton />
                      ) : (
                        allNavItems.map((item) => (
                          <DesktopNavItem key={item.name} item={item} currentPath={currentPath} />
                        ))
                      )}
                    </div>

                    {/* Register button — white pill (only when the backend provides one) */}
                    {loadingNav ? (
                      <span className="ml-3 flex-shrink-0 h-8 w-20 rounded-lg bg-white/20 animate-pulse" />
                    ) : registerItem ? (
                      <a
                        href={registerItem.href}
                        className="ml-3 flex-shrink-0 inline-flex items-center gap-1.5 bg-white text-blue-900 text-[11px] font-bold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 tracking-wide"
                      >
                        {registerItem.name}
                      </a>
                    ) : null}
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
                  {loadingNav && (
                    <div className="space-y-2 py-2 animate-pulse" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-9 rounded-xl bg-white/10" />
                      ))}
                    </div>
                  )}

                  {!loadingNav && allNavItems.map((navItem) => {
                    const name = navItem.name;
                    const isExpanded = mobileOpen[name];

                    if (navItem.isExternal && !navItem.subItems) {
                      return (
                        <a
                          key={name}
                          href={navItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-150"
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
                                : "text-white hover:bg-white/10"
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
                            <div className="mt-1 ml-3 pl-3 border-l-2 border-blue-100 bg-white rounded-lg space-y-0.5 py-2">
                              {navItem.subItems.map((sub) => {
                                const subClass = cx(
                                  "block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                                  isActive(sub.href, currentPath)
                                    ? "text-slate-900 bg-slate-100"
                                    : "text-slate-700 hover:text-slate-900"
                                );
                                return sub.isExternal ? (
                                  <a key={sub.name} href={sub.href} target="_blank" rel="noopener noreferrer" className={subClass}>
                                    {sub.name}
                                  </a>
                                ) : (
                                  <Link key={sub.name} to={sub.href} onClick={close} className={subClass}>
                                    {sub.name}
                                  </Link>
                                );
                              })}
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
                            : "text-white hover:bg-white/10"
                        )}
                      >
                        {name}
                      </Link>
                    );
                  })}

                  {/* Mobile register (only when the backend provides one) */}
                  {!loadingNav && registerItem && (
                    <div className="pt-3 pb-1">
                      <a
                        href={registerItem.href}
                        onClick={close}
                        className="block w-full text-center bg-white text-blue-900 text-sm font-bold px-4 py-3 rounded-xl transition-colors duration-200"
                      >
                        {registerItem.name}
                      </a>
                    </div>
                  )}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
