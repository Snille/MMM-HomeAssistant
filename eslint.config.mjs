import js from "@eslint/js";
import globals from "globals";

// Both the MagicMirror API (notificationReceived) and the Node callbacks
// used here (exec, subscribe) have fixed positional signatures, so unused
// trailing arguments are unavoidable. Variables are still checked.
const sharedRules = {
  "no-unused-vars": ["error", { args: "none" }],
};

export default [
  {
    ignores: ["node_modules/**", "custom_commands/**"],
  },
  {
    // Frontend module - runs in the MagicMirror browser context.
    files: ["MMM-HomeAssistant.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser,
        Module: "readonly",
        Log: "readonly",
        MM: "readonly",
        config: "readonly",
      },
    },
    rules: sharedRules,
  },
  {
    // Node helper - runs in the MagicMirror server process.
    files: ["node_helper.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: sharedRules,
  },
];
