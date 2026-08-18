"use client";

import OrbitalPath from "./OrbitalPath";
import Sector01Hero from "./sections/Sector01Hero";
import Sector02Numeralia from "./sections/Sector02Numeralia";
import Sector03Territorios from "./sections/Sector03Territorios";
import Sector04Manifiesto from "./sections/Sector04Manifiesto";
import Sector05EquipoIA from "./sections/Sector05EquipoIA";
import Sector06Servicios from "./sections/Sector06Servicios";
import Sector07FactorDisruptivo from "./sections/Sector07FactorDisruptivo";
import Sector08CompromisoSocial from "./sections/Sector08CompromisoSocial";
import Sector09Ignicion from "./sections/Sector09Ignicion";

export default function AgenciaPage() {
  return (
    <main className="relative z-10">
      {/* Trayectoria orbital: nave "A" ligada al scroll */}
      <OrbitalPath />

      <Sector01Hero />
      <Sector02Numeralia />
      <Sector03Territorios />
      <Sector04Manifiesto />
      <Sector05EquipoIA />
      <Sector06Servicios />
      <Sector07FactorDisruptivo />
      <Sector08CompromisoSocial />
      <Sector09Ignicion />
    </main>
  );
}
