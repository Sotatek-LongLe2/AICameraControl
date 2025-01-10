import { Route } from "react-router-dom";
import { DefaultLayout } from "src/components/layout/DefaultLayout";
import PAGES from "src/constants/router";
import Error404Page from "src/pages/404";
import Error500Page from "src/pages/500";

export const Error404Router = (
  <Route element={<DefaultLayout />}>
    <Route path={PAGES.PAGE_404} element={<Error404Page />} />
  </Route>
);

export const Error500Router = (
  <Route element={<DefaultLayout />}>
    <Route path={PAGES.PAGE_500} element={<Error500Page />} />
  </Route>
);
