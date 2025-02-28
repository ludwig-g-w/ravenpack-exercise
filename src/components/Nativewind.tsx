import { cssInterop } from "nativewind";
import { Link } from "expo-router";

export const NWLink = cssInterop(Link, {
  className: {
    target: "style",
  },
});
