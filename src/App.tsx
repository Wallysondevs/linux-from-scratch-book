import { useState } from "react";
import { Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MarkdownPage } from "@/components/MarkdownPage";
import Home from "@/pages/Home";
import index from "@/content-index.json";

interface ChapterGroup {
  id: string;
  name: string;
  pages: { slug: string; title: string }[];
}

const GROUPS = index as ChapterGroup[];
const ALL_PAGES = GROUPS.flatMap((g) => g.pages);

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "hsl(var(--lfs-bg))" }}>
      <Sidebar groups={GROUPS} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="lg:ml-80 min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-5 py-8 md:px-10 max-w-4xl mx-auto min-w-0">
          <Switch hook={useHashLocation}>
            <Route path="/" component={Home} />
            <Route path="/page/:slug">
              {(params) => {
                const page = ALL_PAGES.find((p) => p.slug === params.slug);
                const idx = ALL_PAGES.findIndex((p) => p.slug === params.slug);
                const prev = idx > 0 ? ALL_PAGES[idx - 1] : null;
                const next = idx >= 0 && idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null;
                return (
                  <MarkdownPage
                    key={params.slug}
                    path={`${params.slug}.md`}
                    found={!!page}
                    prev={prev}
                    next={next}
                  />
                );
              }}
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}
