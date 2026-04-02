import { motion } from "framer-motion";

const patrons = [
  {
    name: "Prof. Binod Kumar Kanaujia",
    position: "Director, NIT Jalandhar & Faculty Advisor, IEEE Student Branch NIT Jalandhar",
    image: "director.jpg",
    tag: "Patron",
  },
];

const coPatrons = [
  {
    name: "Prof. Ajay Bansal",
    position: "Registrar (I/C), NIT Jalandhar",
    image: "ajaybansal.jpg",
    tag: "Co-Patron",
  },
  {
    name: "Prof. Subrata Mukhopadhyay",
    position: "Adjunct Professor, NSUT",
    image: "suba.png",
    tag: "Co-Patron",
  },
  {
    name: "Prof. Rohit Mehra",
    position: "Dean (R&C), NIT Jalandhar",
    image: "rohitmehra.jpg",
    tag: "Co-Patron",
  },
];

// Each card gets a slightly different blue shade
const cardAccents = [
  "#1d4ed8",
  "#2563eb",
  "#1e40af",
  "#3b82f6",
];

function ProfileCard({ person, index, accent }) {
  return (
    <motion.div
      className="relative bg-white rounded-2xl overflow-hidden shadow-md border border-blue-50 flex flex-col items-center text-center group"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 20px 48px -8px rgba(30,58,138,0.16)" }}
    >
      {/* Top accent stripe */}
      <div
        className="w-full h-1.5"
        style={{ background: `linear-gradient(90deg, ${accent}, #93c5fd)` }}
      />

      {/* Tag pill */}
      <div className="pt-5 pb-1 px-6">
        <span
          className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
          style={{
            background: `${accent}18`,
            color: accent,
            border: `1px solid ${accent}30`,
          }}
        >
          {person.tag}
        </span>
      </div>

      {/* Avatar */}
      <div className="relative mt-3 mb-4">
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-400"
          style={{ background: `radial-gradient(circle, ${accent}55, transparent 70%)` }}
        />
        <div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-[3px]"
          style={{ background: `linear-gradient(135deg, ${accent}, #93c5fd)` }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-white">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="px-5 pb-6 flex flex-col gap-1">
        <h3
          className="text-sm sm:text-base font-semibold text-slate-800 leading-snug"
        >
          {person.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">{person.position}</p>
      </div>
    </motion.div>
  );
}

export default function OrganizingHeads() {
  return (
    <section className="relative w-full py-16 sm:py-20 overflow-hidden bg-white">
      {/* Faint blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #2563eb 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Glow orb top-right */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900 mb-4">
            Organizing Committee
          </h2>
          <motion.div
            className="mx-auto h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #2563eb, #60a5fa)", width: 0 }}
            whileInView={{ width: "64px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
          <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Meet the distinguished faculty leading EAIC 2026.
          </p>
        </motion.div>

        {/* ── Patron ── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-100" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
              Patron
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-100" />
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-[260px]">
              <ProfileCard person={patrons[0]} index={0} accent={cardAccents[0]} />
            </div>
          </div>
        </div>

        {/* ── Co-Patrons ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-100" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
              Co-Patrons
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-100" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coPatrons.map((person, idx) => (
              <ProfileCard
                key={idx}
                person={person}
                index={idx}
                accent={cardAccents[(idx + 1) % cardAccents.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
