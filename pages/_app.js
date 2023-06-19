import "@/styles/globals.css";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps, session }) {
  const [queryClient] = useState(() => new QueryClient());
  const Layout = Component.Layout || EmptyLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider enableSystem={true} attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;
