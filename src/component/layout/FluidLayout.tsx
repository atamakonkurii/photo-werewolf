import type { CustomLayout } from "next";

import { Footer } from "@/component/layout/Footer";
import { Header } from "@/component/layout/Header";
import { LayoutErrorBoundary } from "@/component/layout/LayoutErrorBoundary";

/**
 * @package
 */
export const FluidLayout: CustomLayout = (page) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>
      <main className="flex-1 bg-red-300">
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
