import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#0B111D",
      },
    },
  },
  colors: {
    background: {
      200: "#1C2432",
      300: "#141B29",
      600: "#111827",
      700: "#0B111D",
    },
  },
  components: {
    Modal: {
      sizes: {
        xl: {
          w: "1200px",
        },
      },
    },
  },
});
