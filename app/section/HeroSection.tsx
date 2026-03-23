import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="flex h-screen w-full items-center px-24 pt-16 border-b border-charcoal">
      <div className="max-w-4xl">
        <h1 className="text-9xl md:text-8xl font-bold tracking-tighter uppercase">
          Sayson, <br />
          Mark Justin
        </h1>
            <p className="mt-4 text-light-gray text-lg max-w-xl">
              Full Stack Developer passionate about turning ideas into
              real-world digital solutions.
            </p>
          </div>
          <Image
            src="/vercel.svg"
            alt="Profile"
            width={500} 
            height={900}
            className="ml-auto rounded-full border-4 border-charcoal"
          />
        </section>
  );
}