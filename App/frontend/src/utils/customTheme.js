import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  components: {
    Modal: {
      sizes: {
        xl: {
          w: "1200px",
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          color: "#0B111D !important",
          _focus: {
            backgroundColor: "white !important",
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          color: "#0B111D !important",
          _focus: {
            backgroundColor: "white !important",
          },
        },
      },
    },
  },
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
});
