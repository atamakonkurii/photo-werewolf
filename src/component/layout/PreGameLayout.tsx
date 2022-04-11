import type { CustomLayout } from "next";

import { Footer } from "@/component/layout/Footer";
import { LayoutErrorBoundary } from "@/component/layout/LayoutErrorBoundary";

/**
 * @package
 */
export const PreGameLayout: CustomLayout = (page) => {
  return (
    <div className="flex flex-col mx-auto max-w-screen-lg min-h-screen">
      <main className="flex-1 bg-red-300">
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
