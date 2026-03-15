import Image from 'next/image';

export default function Home() {
  const educations = [
    {
      id: 1,
      year: '2011-2017',
      degree: 'Elementary School',
      institution: 'Halayhay Elementary School'
    },
    {
      id: 2,
      year: '2017-2021',
      degree: 'Computer System Servicing',
      institution: 'Amaya School of Home Industries'
    },
    {
      id: 3,
      year: '2021-2023',
      degree: 'Science, Technology, Engineering, and Mathematics',
      institution: 'Our Lady of the Holy Rosary'
    },
    {
      id: 4,
      year: '2023-2027',
      degree: 'Bachelor of Science in Information Technology',
      institution: 'STI College Rosario'
    }
  ];

  return (
    <>
      {/* HEADER: Added z-50 to stay on top, backdrop-blur for a modern feel */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-charcoal bg-background/80 p-4 px-8 backdrop-blur-md">
        <p className="font-bold">&lt;JustDev/&gt;</p>
        <nav className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-light-gray transition-colors">
            About
          </a>
          <a
            href="#projects"
            className="hover:text-light-gray transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="hover:text-light-gray transition-colors"
          >
            Contact
          </a>
        </nav>
      </header>

      <main className="flex flex-col">
        <section className="flex h-screen w-full items-center px-24 pt-16 border-b border-charcoal">
          <div className="max-w-4xl">
            <h1 className="text-9xl md:text-8xl font-bold tracking-tighter uppercase">
              Sayson, <br />
              Mark Justin
            </h1>
            <p className="mt-4 text-light-gray text-lg max-w-xl">
              Full Stack Developer passionate about turning ideas into
              real-world digital solutions. I build modern, scalable
              applications using advanced technologies, focusing on clean
              design, performance, and seamless user experiences.
            </p>
          </div>

          <Image
            src="/vercel.svg"
            alt="Profile Picture"
            width={500}
            height={900}
            className="ml-auto rounded-full border-4 border-charcoal"
          />
        </section>

        <section id="projects" className=" px-24 py-16 bg-charcoal/40">
          <div className="w-full grid grid-cols-3">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-center">Education</h2>
              <div className="">
                {educations.map(education => (
                  <div
                    key={education.id}
                    className="px-6 py-4 border-l border-charcoal mb-4"
                  >
                    <p className="text-sm text-light-gray">
                      {education.year}
                    </p>
                    <p className="font-bold text-lg">{education.degree}</p>
                    <p className="text-light-gray text-md">{education.institution}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-center">
                Achievements
              </h2>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-center">
                Experiences
              </h2>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
