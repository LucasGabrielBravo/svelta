import { env } from "$env/dynamic/public";

const { PUBLIC_SVELTA_SERVICE } = env

export function getSveltaService() {
  return (PUBLIC_SVELTA_SERVICE === "firebase") ? "firebase" : "pb"
}