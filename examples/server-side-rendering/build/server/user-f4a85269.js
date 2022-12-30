import { jsxs } from 'preact/jsx-runtime';
import { usePageParameters } from 'preact-page';

var user = () => {
  const { user } = usePageParameters();
  return /* @__PURE__ */ jsxs("h1", { children: [
    "User#",
    user
  ] });
};

export { user as default };
