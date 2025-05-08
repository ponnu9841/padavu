import { NextPage } from "next";
import type { AppProps } from "next/app";
// import { ThemeProvider } from "@/components/theme-provider";
// import { Provider } from "react-redux";
// import { Toaster } from "sonner";
// import store from "@/redux/store";
// import ReduxWrapper from "@/reduxWrapper";
import "@/styles/globals.css";
// import 'react-quill/dist/quill.snow.css';
// import useSrollRestoration from "@/components/scroll-restoration";

//eslint-disable-next-line
export type PageLayoutType<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: PageLayoutType;
};

export default function App(props: AppPropsWithLayout) {
	const { Component, pageProps } = props;
	const getLayout = Component.getLayout ?? ((page) => page);
	// useSrollRestoration();
	return (
		<>
			{/* // <Provider store={store}> */}
				{/* <ReduxWrapper> */}
					{getLayout(
						// <ThemeProvider
						// 	attribute="class"
						// 	defaultTheme="system"
						// 	enableSystem
						// 	disableTransitionOnChange
						// >
							<Component {...pageProps} />
							// <Toaster />
						// </ThemeProvider>
					)}
				{/* // </ReduxWrapper> */}
			{/* // </Provider> */}
		</>
	);
}
