import { CssBaseline, CssVarsProvider, GlobalStyles } from "@mui/joy";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import minMax from "dayjs/plugin/minMax";
import { StrictMode } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { createRoot } from "react-dom/client";
import "react-phone-input-2/lib/style.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "src/shared/configuration/toast";
import "src/strings";
import theme, { globalStyles } from "src/styles/theme.tsx";
import { Loading } from "./components/common/Loading";
import AppRouter from "./router";
import { SocketProvider } from "./socket";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  CategoryScale,
  Filler
);
dayjs.extend(customParseFormat);
dayjs.extend(minMax);
dayjs.extend(duration);
dayjs.extend(utc);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <CssVarsProvider defaultMode="dark" theme={theme}>
    <CssBaseline />
    <GlobalStyles styles={globalStyles} />
    <SocketProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </SocketProvider>
    <Loading />
    <ToastContainer
      position="top-right"
      autoClose={5_000}
      hideProgressBar
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      closeButton={false}
      pauseOnHover
      theme="dark"
    />
  </CssVarsProvider>
  // </StrictMode>
);
