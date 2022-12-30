import { jsx, jsxs } from 'preact/jsx-runtime';
import { join } from 'path';
import { render } from 'preact-render-to-string';
import prepass from 'preact-ssr-prepass';
import express from 'express';
import { PageLink, PageView, PageStaticProvider, PageDescription, PageTitle } from 'preact-page';
import { lazy } from 'preact/compat';
import { Fragment } from 'preact';

const HomePage = lazy(() => import('./home-6afc720e.js'));
const UserPage = lazy(() => import('./user-f4a85269.js'));
const pages = [
  {
    path: "/",
    title: () => "Home page",
    description: () => "This is the home page",
    element: /* @__PURE__ */ jsx(HomePage, {})
  },
  {
    path: "/user/:user",
    title: ({ user }) => `User#${user} details page`,
    description: ({ user }) => `This is the user#${user} details page`,
    element: /* @__PURE__ */ jsx(UserPage, {})
  }
];

var NotFoundPage = () => {
  return /* @__PURE__ */ jsx("h1", { children: "Not found" });
};

const Loading = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { children: "Loading your page" }),
    /* @__PURE__ */ jsx("p", { children: "Please wait..." })
  ] });
};

const Header = () => {
  return /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(PageLink, { path: "/", children: "Home" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(PageLink, { path: "/about", children: "About" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(PageLink, { path: "/user/1", children: "User#1" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(PageLink, { path: "/user/2", children: "User#2" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(PageLink, { path: "/user/3", children: "User#3" }) })
  ] }) }) });
};

const Main = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(PageView, { fallback: /* @__PURE__ */ jsx(NotFoundPage, {}), loading: /* @__PURE__ */ jsx(Loading, {}) })
  ] });
};

const server = express();
server.use(express.static(join(process.cwd(), "build/client")));
console.log(process.cwd());
server.all("*", async (request, response) => {
  const virtualDom = /* @__PURE__ */ jsx(PageStaticProvider, { pages, path: request.url, children: /* @__PURE__ */ jsxs("html", { lang: "en-US", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      /* @__PURE__ */ jsx(PageDescription, {}),
      /* @__PURE__ */ jsx(PageTitle, {}),
      /* @__PURE__ */ jsx("script", { src: "/index.js", type: "module" })
    ] }),
    /* @__PURE__ */ jsx("body", { children: /* @__PURE__ */ jsx("div", { id: "root", children: /* @__PURE__ */ jsx(Main, {}) }) })
  ] }) });
  await prepass(virtualDom);
  response.set("Content-Type", "text/html").send("<!DOCTYPE html>" + render(virtualDom));
});
server.listen(8e3, () => {
  console.log("Server listening for requests");
});
