"use client";

import { createContext, useContext } from "react";

export type SocialVariant = "facebook" | "instagram";

// Contexto compartido para abrir el ContactModal (el modal del chat flotante)
// desde cualquier parte de la app (p. ej. los botones del módulo Alice).
export const ChatModalContext = createContext<(variant: SocialVariant) => void>(
  () => {}
);

export function useChatModal() {
  return useContext(ChatModalContext);
}
