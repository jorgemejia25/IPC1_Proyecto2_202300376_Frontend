import MainNavbar from "@/components/main-navbar";

export default function Home() {
  return (
    <section>
      <MainNavbar></MainNavbar>

      <div className="flex w-full h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-center text-7xl  text-slate-600 font-black my-5">
            <span className="text-primary">interiors</span>islife
          </h1>
          <h3 className="text-xl">A blog for the interiors.</h3>
        </div>
      </div>
    </section>
  );
}
