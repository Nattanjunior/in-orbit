import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-gray-300 p-8">
      <div className="flex flex-col gap-8 items-center text-center max-w-lg">
        <div className="flex items-center gap-2 mb-8">
          <Image
            src="/Group.png"
            alt="in.orbit logo"
            width={24}
            height={24}
            priority
          />
          <span className="text-xl font-semibold text-gray-300">in.orbit</span>
        </div>
        <Image
          src="/lets-start.png"
          alt="Illustration of a person and a rocket"
          width={320}
          height={320}
          priority
        />
        <p className="text-lg mt-8 leading-relaxed">
          Você ainda não cadastrou nenhuma meta, que tal{" "}
          <span className="underline cursor-pointer text-purple-400">cadastrar uma</span> agora mesmo?
        </p>
        <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 mt-4 text-base">
          <span className="text-xl">+</span> Cadastrar meta
        </button>
      </div>
    </div>
  );
}
