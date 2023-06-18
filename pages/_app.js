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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssVarsProvider, Sheet } from "@mui/joy";

export default function App({ Component, pageProps, session }) {
  const [queryClient] = useState(() => new QueryClient());
  const Layout = Component.Layout || EmptyLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CssVarsProvider>
          <main>
            <Sheet>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Sheet>
          </main>
        </CssVarsProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;
