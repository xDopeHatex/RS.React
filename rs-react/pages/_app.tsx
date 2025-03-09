import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "@/store/store";
import { Provider } from "react-redux";
import ThemeProvider from "@/ui/providers/ThemeProvider";
import FallbackPage from "@/ui/components/UI/FallbackPage";
import ErrorBoundary from "@/ui/components/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary fallback={<FallbackPage />}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
