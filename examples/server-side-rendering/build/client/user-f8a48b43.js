import { S, o } from './index.js';

var user = () => {
  const { user } = S();
  return /* @__PURE__ */ o("h1", { children: [
    "User#",
    user
  ] });
};

export { user as default };
