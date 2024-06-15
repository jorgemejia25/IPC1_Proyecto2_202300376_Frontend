import MainNavbar from "@/components/main-navbar";

export default function Home() {
  return (
    <section>
      <MainNavbar></MainNavbar>

      <div
        className="flex w-full h-screen flex-col items-center justify-center"
        style={{
          backgroundImage: 'url("/header.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="">
          <h1
            className=" text-7xl font-black my-5 leading-snug mt-48 tracking-wider"
            style={{
              color: "#3f73b6",
            }}
          >
            INTERIORS IS <br /> LIFE
          </h1>
        </div>
      </div>
    </section>
  );
}
