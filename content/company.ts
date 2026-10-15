/**
 * Company content shared across pages.
 * No numeric, service-level or team claims.
 */
export const principles = [
  {
    title: "Business Focus",
    text: "We start from what your business needs to achieve, then decide what to build. Every feature has a reason to exist.",
  },
  {
    title: "Modern & Scalable",
    text: "Clean, maintainable builds on modern foundations, structured so your product can grow with your business.",
  },
  {
    title: "End-to-End Delivery",
    text: "Planning, design, development and launch handled in one place, by one team that understands the whole project.",
  },
  {
    title: "Clear Communication",
    text: "Direct, simple updates throughout the project, so you always know where things stand and what comes next.",
  },
] as const;

/** Homepage uses the simplified four-step process. */
export const processSteps = [
  { title: "Discover", text: "We learn about your business, your goals, your audience and your requirements." },
  { title: "Plan", text: "We agree a clear plan, scope and timeline before any design or development starts." },
  { title: "Build", text: "We design and develop your solution and share progress with you as it takes shape." },
  { title: "Launch", text: "We test, deploy and hand over a product that is ready for real customers and real use." },
] as const;

/** Standards every project is held to (About page). Commitments, not claims about results. */
export const standards = [
  { title: "Responsive by default", text: "Every layout is designed for phones, tablets and desktops, not adapted at the end." },
  { title: "English and Arabic", text: "Bilingual builds with genuine right-to-left layouts where the project needs them." },
  { title: "Accessible", text: "Semantic structure, keyboard access, visible focus and readable contrast." },
  { title: "Fast", text: "Lean pages, optimised images and media that loads only when it is needed." },
  { title: "Maintainable", text: "Clear code and structure, so the product can keep growing after launch." },
  { title: "Honest", text: "We show real work and verified facts. No invented numbers." },
] as const;
