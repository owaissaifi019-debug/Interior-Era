"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, X, MapPin, Briefcase, DollarSign, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Real projects mapped to the actual uploaded directories inside public/Images
const fallbackProjects = [
  {
    id: 1,
    title: "The Magnolia Residence",
    category: "RESIDENTIAL",
    scope: "Residential Interior Design",
    location: "Sector 54, Gurugram",
    budget: "$150k - $250k",
    year: "2025",
    image: "/Images/Residential Project/living_room.webp",
    images: [
      "/Images/Residential Project/living_room.webp",
      "/Images/Residential Project/interior_image.webp",
      "/Images/Residential Project/IMG-20260514-WA0015.webp",
      "/Images/Residential Project/IMG-20260514-WA0016.webp"
    ],
    description: "A warm, sophisticated residence balancing light oak wood paneling, gold trim accents, and premium bespoke furniture. Emphasizes an optimal flow of natural light coupled with custom-built fireplace surrounds."
  },
  {
    id: 2,
    title: "Araya Penthouse Suite",
    category: "BESPOKE",
    scope: "Bespoke Interior Design",
    location: "Pioneer Araya, Gurugram",
    budget: "$300k - $500k",
    year: "2026",
    image: "/Images/Residential Project 2/living_room_image.webp",
    images: [
      "/Images/Residential Project 2/living_room_image.webp",
      "/Images/Residential Project 2/living_room.webp",
      "/Images/Residential Project 2/bedroom_image.webp",
      "/Images/Residential Project 2/dining_room.webp",
      "/Images/Residential Project 2/interior_setup.webp",
      "/Images/Residential Project 2/IMG-20260514-WA0053.webp",
      "/Images/Residential Project 2/IMG-20260514-WA0061.webp"
    ],
    description: "An extremely premium high-rise penthouse featuring custom glass curtain walls, double-height ceiling lounge, rich velvet seating arrays, and modular bespoke dining systems."
  },
  {
    id: 3,
    title: "Civil Lines Luxury Apartment",
    category: "RESIDENTIAL",
    scope: "Residential Interior Design",
    location: "Civil Lines, Gurugram",
    budget: "$200k - $300k",
    year: "2025",
    image: "/Images/Residential Project (Civil Line Gurugram)/interior-era.webp",
    images: [
      "/Images/Residential Project (Civil Line Gurugram)/interior-era.webp",
      "/Images/Residential Project (Civil Line Gurugram)/modern_bedroom.webp",
      "/Images/Residential Project (Civil Line Gurugram)/kitchen_image.webp",
      "/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0081.webp",
      "/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0086.webp",
      "/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0089.webp",
      "/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0093.webp",
      "/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0115-1.webp",
      "/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0115.webp",
      "/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0117.webp"
    ],
    description: "A classic-modernist hybrid apartment incorporating deep charcoal tones, state-of-the-art modular kitchen fixtures, luxury master bedroom acoustics, and premium custom lighting grids."
  },
  {
    id: 4,
    title: "DLF Phase 4 Penthouse",
    category: "RESIDENTIAL",
    scope: "Residential Interior Design",
    location: "DLF Phase 4, Gurugram",
    budget: "$150k - $200k",
    year: "2025",
    image: "/Images/Residential Project (DLF phase 4)/house_entrance.webp",
    images: [
      "/Images/Residential Project (DLF phase 4)/house_entrance.webp",
      "/Images/Residential Project (DLF phase 4)/A.webp",
      "/Images/Residential Project (DLF phase 4)/IMG-20260514-WA0081.webp",
      "/Images/Residential Project (DLF phase 4)/IMG-20260514-WA0083.webp"
    ],
    description: "A modern sanctuary focusing on fluid indoor-outdoor transitions, beautiful custom stone entrance cladding, and sleek geometric furniture profiles."
  },
  {
    id: 5,
    title: "Elegance Villa DLF",
    category: "ARCHITECTURAL",
    scope: "Architectural & Interior Design",
    location: "DLF Phase 4, Gurugram",
    budget: "$400k - $600k",
    year: "2026",
    image: "/Images/Residential Project (Phase 4)/kitchen_image.webp",
    images: [
      "/Images/Residential Project (Phase 4)/kitchen_image.webp",
      "/Images/Residential Project (Phase 4)/bathroom_image.webp",
      "/Images/Residential Project (Phase 4)/bathroom_design.webp",
      "/Images/Residential Project (Phase 4)/Aa.webp",
      "/Images/Residential Project (Phase 4)/IMG-20260514-WA0114.webp",
      "/Images/Residential Project (Phase 4)/IMG-20260514-WA0133.webp",
      "/Images/Residential Project (Phase 4)/IMG-20260514-WA0140.webp",
      "/Images/Residential Project (Phase 4)/IMG-20260514-WA0145.webp",
      "/Images/Residential Project (Phase 4)/IMG-20260514-WA0147.webp"
    ],
    description: "Full-scale luxury residential rebuild including high-end marble bath installations, a bright professional chef's kitchen, custom structural panels, and custom-designed wardrobes."
  },
  {
    id: 6,
    title: "The Thathagat Ashok Residency",
    category: "RESIDENTIAL",
    scope: "Turnkey Execution",
    location: "Ashok Vihar, Gurugram",
    budget: "$250k - $350k",
    year: "2025",
    image: "/Images/Residential Project (Thatagat Ashok)/living_room_image.webp",
    images: [
      "/Images/Residential Project (Thatagat Ashok)/living_room_image.webp",
      "/Images/Residential Project (Thatagat Ashok)/interior_lounge.webp",
      "/Images/Residential Project (Thatagat Ashok)/restaurant_interior.webp",
      "/Images/Residential Project (Thatagat Ashok)/IMG-20260514-WA0202.webp",
      "/Images/Residential Project (Thatagat Ashok)/IMG-20260515-WA0047.webp",
      "/Images/Residential Project (Thatagat Ashok)/IMG-20260515-WA0048.webp",
      "/Images/Residential Project (Thatagat Ashok)/IMG-20260515-WA0049.webp",
      "/Images/Residential Project (Thatagat Ashok)/IMG-20260515-WA0129.webp",
      "/Images/Residential Project (Thatagat Ashok)/IMG-20260515-WA0131.jpg"
    ],
    description: "Completed turn-key design-build showcasing gorgeous dark-oak ceilings, customized floating shelves, luxury dining lounge integration, and bespoke wall detail layouts."
  },
  {
    id: 7,
    title: "Shahjahanpur Manor",
    category: "ARCHITECTURAL",
    scope: "Architectural Design Service",
    location: "Shahjahanpur",
    budget: "$500k+",
    year: "2024",
    image: "/Images/Residential Project (Shahjahanpur)/modern_house.webp",
    images: [
      "/Images/Residential Project (Shahjahanpur)/modern_house.webp",
      "/Images/Residential Project (Shahjahanpur)/converted_image.webp",
      "/Images/Residential Project (Shahjahanpur)/IMG-20260514-WA0073.webp",
      "/Images/Residential Project (Shahjahanpur)/IMG-20260514-WA0076.webp",
      "/Images/Residential Project (Shahjahanpur)/IMG-20260514-WA0077.webp"
    ],
    description: "Timeless structural architecture blending traditional manor arches with large double-glazed windows and a magnificent hand-cut stone facade."
  },
  {
    id: 8,
    title: "Gurugram Heights Suite",
    category: "RESIDENTIAL",
    scope: "Residential Interior Design",
    location: "Sector 65, Gurugram",
    budget: "$100k - $180k",
    year: "2025",
    image: "/Images/Residential Project (Gurugram)/room_image.webp",
    images: [
      "/Images/Residential Project (Gurugram)/room_image.webp",
      "/Images/Residential Project (Gurugram)/B.webp",
      "/Images/Residential Project (Gurugram)/converted_image-1.webp",
      "/Images/Residential Project (Gurugram)/IMG-20260514-WA0102.webp"
    ],
    description: "High-end urban apartment designed for modern living, utilizing sleek marble floors, gold accent light fixtures, and a serene cream-beige color scheme."
  },
  {
    id: 9,
    title: "Aevom Corporate Office",
    category: "COMMERCIAL",
    scope: "Office Interior Design",
    location: "Bandra Kurla Complex, Mumbai",
    budget: "$400k - $600k",
    year: "2026",
    image: "/Images/Aevom Office (Commercial  Project)/office_image.webp",
    images: [
      "/Images/Aevom Office (Commercial  Project)/office_image.webp",
      "/Images/Aevom Office (Commercial  Project)/office_interior.webp",
      "/Images/Aevom Office (Commercial  Project)/office_interior-1.webp",
      "/Images/Aevom Office (Commercial  Project)/IMG-20260514-WA0037.webp",
      "/Images/Aevom Office (Commercial  Project)/IMG-20260514-WA0039.webp"
    ],
    description: "A luxury corporate headquarters featuring ergonomic glass workstations, rich oak partitions, soundproof meetings rooms, and vibrant signature branding integrations."
  },
  {
    id: 10,
    title: "Bihar State Auditorium",
    category: "COMMERCIAL",
    scope: "Commercial Interior Design",
    location: "Patna, Bihar",
    budget: "$800k+",
    year: "2025",
    image: "/Images/Commercial Project (Auditorium Bihar)/auditorium_image.webp",
    images: [
      "/Images/Commercial Project (Auditorium Bihar)/auditorium_image.webp",
      "/Images/Commercial Project (Auditorium Bihar)/auditorium_image-1.webp",
      "/Images/Commercial Project (Auditorium Bihar)/interior_design.webp",
      "/Images/Commercial Project (Auditorium Bihar)/interior_scene.webp",
      "/Images/Commercial Project (Auditorium Bihar)/IMG-20260514-WA0192.jpg",
      "/Images/Commercial Project (Auditorium Bihar)/IMG-20260514-WA0196.jpg",
      "/Images/Commercial Project (Auditorium Bihar)/20260514_201917.jpg"
    ],
    description: "State-of-the-art public auditorium featuring bespoke acoustic wall panels, stepped luxury theatre seating, grand lighting rigs, and a monumental stage layout."
  },
  {
    id: 11,
    title: "Haldiram's Signature Dining",
    category: "COMMERCIAL",
    scope: "Retail Interior Design",
    location: "Connaught Place, New Delhi",
    budget: "$200k - $300k",
    year: "2025",
    image: "/Images/Commercial Project (Haldiram)/restaurant_interior.webp",
    images: [
      "/Images/Commercial Project (Haldiram)/restaurant_interior.webp",
      "/Images/Commercial Project (Haldiram)/restaurant_interior-1.webp",
      "/Images/Commercial Project (Haldiram)/IMG-20260514-WA0156.webp",
      "/Images/Commercial Project (Haldiram)/IMG-20260514-WA0174.webp"
    ],
    description: "Premium commercial eatery styling integrating soft curves, warm lighting, custom brass finishings, and plush dining booths for a high-end culinary experience."
  },
  {
    id: 12,
    title: "LD Sons Luxury Showroom",
    category: "COMMERCIAL",
    scope: "Retail Interior Design",
    location: "South Extension, New Delhi",
    budget: "$350k - $500k",
    year: "2025",
    image: "/Images/Commercial Project 1 (LD sons South Extension)/jewelry_showroom.webp",
    images: [
      "/Images/Commercial Project 1 (LD sons South Extension)/jewelry_showroom.webp",
      "/Images/Commercial Project 1 (LD sons South Extension)/interior_showroom.webp",
      "/Images/Commercial Project 1 (LD sons South Extension)/IMG-20260515-WA0034.webp",
      "/Images/Commercial Project 1 (LD sons South Extension)/IMG-20260515-WA0035.webp",
      "/Images/Commercial Project 1 (LD sons South Extension)/IMG-20260515-WA0038.webp",
      "/Images/Commercial Project 1 (LD sons South Extension)/IMG-20260515-WA0039.webp"
    ],
    description: "Ultra-luxury jewelry showroom emphasizing high-security display vitrines, rich suede seating areas, premium warm downlighting, and exquisite marble flooring."
  },
  {
    id: 13,
    title: "Oasis Baklawe Boutique",
    category: "COMMERCIAL",
    scope: "Retail Interior Design",
    location: "Galleria Market, Gurugram",
    budget: "$150k - $220k",
    year: "2025",
    image: "/Images/Project A1/oasis_baklawe.webp",
    images: [
      "/Images/Project A1/oasis_baklawe.webp",
      "/Images/Project A1/interior_shop.webp",
      "/Images/Project A1/IMG-20260515-WA0002.webp",
      "/Images/Project A1/IMG-20260515-WA0003.webp",
      "/Images/Project A1/IMG-20260515-WA0042.webp"
    ],
    description: "Mediterranean-inspired dessert boutique integrating smooth ivory plaster finishes, arch recesses with amber uplighting, and custom product display layouts."
  }
];

const categories = [
  { id: "ALL", label: "All Works" },
  { id: "RESIDENTIAL", label: "Residential" },
  { id: "COMMERCIAL", label: "Commercial" },
  { id: "ARCHITECTURAL", label: "Architectural" },
  { id: "BESPOKE", label: "Bespoke" }
];

type ProjectType = {
  id: number;
  title: string;
  category: string;
  scope: string;
  location: string;
  budget: string;
  year: string;
  image: string;
  images: string[];
  description: string;
};

function ProjectsContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [projects, setProjects] = useState<ProjectType[]>(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fetch projects from Supabase client-side
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("projects")
          .select("*, project_images(*)")
          .eq("is_published", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            scope: p.scope,
            location: p.location,
            budget: p.budget || "",
            year: p.year,
            image: p.image,
            description: p.description,
            images: [p.image, ...p.project_images.map((img: any) => img.image_url)]
          }));
          setProjects(formatted);
        }
      } catch (err) {
        console.error("Error fetching projects from Supabase:", err);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects dynamically
  const filteredProjects = activeCategory === "ALL"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Dynamic category counts helper
  const getCategoryCount = (catId: string) => {
    if (catId === "ALL") return projects.length;
    return projects.filter(p => p.category === catId).length;
  };

  // Keyboard navigation inside modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedProject) return;
    if (e.key === "Escape") {
      setSelectedProject(null);
    } else if (e.key === "ArrowRight") {
      setActiveImageIndex(prev => (prev + 1) % selectedProject.images.length);
    } else if (e.key === "ArrowLeft") {
      setActiveImageIndex(prev => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  }, [selectedProject]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Handle auto-selection of project via query parameter
  useEffect(() => {
    if (projectId) {
      const project = projects.find(p => p.id === parseInt(projectId));
      if (project) {
        setSelectedProject(project);
        setActiveImageIndex(0);
      }
    }
  }, [projectId, projects]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <main className="min-h-screen bg-background pt-24 sm:pt-32 overflow-x-hidden font-sans">
      {/* Header Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 mb-8 sm:mb-16">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-accent font-semibold mb-3 sm:mb-4 block"
          >
            Our Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-tight mb-4 sm:mb-6 text-foreground"
          >
            Selected Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-xs sm:text-base md:text-xl leading-relaxed font-light max-w-2xl"
          >
            A curated showcase of our design excellence spanning multiple disciplines. Tap any card to explore high-resolution galleries, layouts, and project details.
          </motion.p>
        </div>
      </section>

      {/* Horizontal Scrollable Category Filter Bar */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 mb-8 sm:mb-12">
        <div className="flex items-center space-x-2.5 sm:space-x-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat, index) => {
            const count = getCategoryCount(cat.id);
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 text-[10px] sm:text-xs uppercase tracking-widest font-semibold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full border transition-all duration-300 flex items-center space-x-2 ${
                  isActive
                    ? "bg-accent text-accent-foreground border-accent shadow-md scale-105"
                    : "bg-secondary/40 text-foreground/75 border-border/60 hover:border-accent hover:text-foreground"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-sans font-medium transition-colors ${
                  isActive ? "bg-black/20 text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 pb-20 sm:pb-32 min-h-[50vh]">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveImageIndex(0);
                }}
                className="group cursor-pointer flex flex-col bg-card border border-border/60 dark:border-neutral-800/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-accent/50"
              >
                {/* Image Viewport */}
                <div className="relative h-[250px] sm:h-[340px] md:h-[400px] w-full overflow-hidden shrink-0 bg-secondary/20">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-95"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  />
                  {/* Category Tag on Card */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-accent">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-1">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-accent font-semibold mb-1.5 block">
                    {project.scope}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium mb-3 group-hover:text-accent transition-colors text-foreground">
                    {project.title}
                  </h3>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-border/40 text-muted-foreground text-[10px] sm:text-xs">
                    <span className="uppercase tracking-[0.08em] flex items-center truncate max-w-[140px] sm:max-w-none">
                      <MapPin size={12} className="mr-1 text-accent shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </span>
                    <span className="uppercase font-semibold text-accent flex items-center shrink-0">
                      View Gallery
                      <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Dynamic Immersive Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-2 sm:p-4 md:p-8"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-7xl h-[92vh] md:h-[85vh] bg-background border border-border/60 dark:border-neutral-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-[110] bg-black/70 backdrop-blur-md border border-white/20 text-white p-2.5 sm:p-3 rounded-full hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg active:scale-95"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Left Column: Image Viewer */}
              <div className="w-full lg:w-2/3 h-[50%] lg:h-full bg-black relative flex flex-col shrink-0">
                {/* Main Image Slider Container */}
                <div className="flex-1 relative w-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={selectedProject.images[activeImageIndex]}
                    alt={`${selectedProject.title} Detail ${activeImageIndex + 1}`}
                    fill
                    className="object-contain p-2 sm:p-4 md:p-8"
                    priority
                  />

                  {/* Left Navigation Arrow */}
                  <button
                    onClick={() => setActiveImageIndex(prev => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-accent border border-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Right Navigation Arrow */}
                  <button
                    onClick={() => setActiveImageIndex(prev => (prev + 1) % selectedProject.images.length)}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-accent border border-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Image Counter Badge */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 border border-white/10 px-3 py-1 rounded-full">
                    <span className="text-[10px] sm:text-xs text-white tracking-widest uppercase font-semibold">
                      {activeImageIndex + 1} / {selectedProject.images.length}
                    </span>
                  </div>
                </div>

                {/* Thumbnails Navigation Bar */}
                <div className="h-16 sm:h-20 shrink-0 bg-neutral-950/90 border-t border-white/10 p-2 overflow-x-auto flex justify-center items-center gap-2 select-none no-scrollbar">
                  {selectedProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 sm:w-16 h-10 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                        activeImageIndex === idx ? "border-accent scale-105" : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Project Meta Details */}
              <div className="w-full lg:w-1/3 h-[50%] lg:h-full p-5 sm:p-8 md:p-12 overflow-y-auto flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border/60">
                <div className="space-y-4 sm:space-y-6">
                  {/* Category Identifier */}
                  <div>
                    <span className="text-[9px] sm:text-xs uppercase tracking-[0.25em] text-accent font-bold">
                      {selectedProject.scope}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium mt-1 text-foreground leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <hr className="border-border/50" />

                  {/* Meta Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <MapPin size={14} />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider block">Location</span>
                        <span className="text-xs sm:text-sm font-semibold text-foreground">{selectedProject.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <Briefcase size={14} />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider block">Scope</span>
                        <span className="text-xs sm:text-sm font-semibold text-foreground">{selectedProject.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <Calendar size={14} />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider block">Year</span>
                        <span className="text-xs sm:text-sm font-semibold text-foreground">{selectedProject.year}</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-border/50" />

                  {/* Project Long Description */}
                  <div>
                    <h4 className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-foreground mb-1.5">Project Vision</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* Inquire CTA Button */}
                <div className="pt-6 border-t border-border/50 mt-6">
                  <Link
                    href={`/contact?project=${encodeURIComponent(selectedProject.title)}`}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3.5 sm:py-4 px-5 rounded-xl flex items-center justify-center space-x-2 transition-colors uppercase tracking-widest text-xs font-semibold shadow-lg"
                  >
                    <span>Inquire About This Space</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-primary text-primary-foreground text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium mb-4 sm:mb-6">Have a project in mind?</h2>
          <p className="text-primary-foreground/75 text-xs sm:text-lg md:text-xl font-light mb-8 sm:mb-10 max-w-xl mx-auto">
            Let our experts guide you through a seamless, luxury design journey.
          </p>
          <Link href="/contact" className="inline-flex items-center space-x-3 bg-accent text-accent-foreground px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-accent/90 transition-colors duration-300 shadow-xl text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase">
            <span>Get In Touch</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background pt-32 text-center text-muted-foreground font-light flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Loading Portfolio...</span>
        </div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
