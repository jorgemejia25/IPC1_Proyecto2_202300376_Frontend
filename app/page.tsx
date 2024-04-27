import MainNavbar from "@/components/main-navbar";

export default function Home() {
  return (
    <section>
      <MainNavbar></MainNavbar>

      <div className="flex w-full h-screen flex-col items-center justify-between">
        <div className="mt-24">
          Desarrollado por: Jorge Andrés Mejía - 202300376
        </div>

        <div className="text-center">
          <h1 className="text-center text-7xl  text-slate-600 font-black my-5">
            <span className="text-primary">U</span>Social{" "}
          </h1>
          <h3 className="text-xl">
            Una red social para todos los San Carlistas.
          </h3>
        </div>

        <div className="mb-10 text-center">
          <div>Derechos Registrados: jorgis S.A </div>
          <div>Soporte: Rodri Porón</div>
        </div>
      </div>
    </section>
  );
}
