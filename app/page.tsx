'use client';

import Image from 'next/image';
import emailjs from '@emailjs/browser';
import {MdEmail} from 'react-icons/md';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt
} from 'react-icons/fa';
import {PiFileCSharpFill} from 'react-icons/pi';
// Import the Simple Icons for your tech stack
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiOpenjdk,
  SiPython,
  SiMysql,
  SiSqlite,
  SiPostgresql,
  SiMongodb,
  SiPhp,
  SiGit
} from 'react-icons/si';

import {InputWithField} from '@/components/InputWithField';
import {TextAreaWithField} from '@/components/TextAreaWithField';
import {ButtonDefault} from '@/components/ButtonDefault';
import {contactSchema, ContactFormData} from '@/schema/validation.schema';
import {ChangeEvent, FormEvent, useRef, useState} from 'react';

export default function Home() {
  const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

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

  const techs = [
    {name: 'HTML', icon: <SiHtml5 className="text-[#E34F26]" />},
    {name: 'CSS', icon: <SiCss className="text-[#1572B6]" />},
    {name: 'Javascript', icon: <SiJavascript className="text-[#F7DF1E]" />},
    {name: 'React', icon: <SiReact className="text-[#61DAFB]" />},
    {name: 'Tailwind', icon: <SiTailwindcss className="text-[#06B6D4]" />},
    {name: 'Java', icon: <SiOpenjdk className="text-[#ED8B00]" />},
    {name: 'C#', icon: <PiFileCSharpFill className="text-[#239120]" />},
    {name: 'Python', icon: <SiPython className="text-[#3776AB]" />},
    {name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" />},
    {name: 'SQLite', icon: <SiSqlite className="text-[#003B57]" />},
    {name: 'PostgreSQL', icon: <SiPostgresql className="text-[#4169E1]" />},
    {name: 'NoSQL', icon: <SiMongodb className="text-[#47A248]" />},
    {name: 'PHP', icon: <SiPhp className="text-[#777BB4]" />},
    {name: 'Git', icon: <SiGit className="text-[#F05032]" />},
    {name: 'Github', icon: <FaGithub className="text-white" />}
  ];

  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {id, value} = e.target;

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const flattenedErrors = result.error.flatten().fieldErrors;
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};

      if (flattenedErrors.name?.[0]) fieldErrors.name = flattenedErrors.name[0];
      if (flattenedErrors.email?.[0]) fieldErrors.email = flattenedErrors.email[0];
      if (flattenedErrors.subject?.[0]) fieldErrors.subject = flattenedErrors.subject[0];
      if (flattenedErrors.message?.[0]) fieldErrors.message = flattenedErrors.message[0];

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
        throw new Error(
          'Missing EmailJS environment variables. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env'
        );
      }

      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        emailJsPublicKey
      );

      alert('Message sent successfully!');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error(error);
      alert('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        {/* Hero Section */}
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

        {/* Education/Achievements/Experiences Section */}
        <section
          id="projects"
          className="px-24 py-16 bg-charcoal/40 border-b border-charcoal"
        >
          <div className="w-full grid grid-cols-3">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-center">Education</h2>
              {educations.map(edu => (
                <div
                  key={edu.id}
                  className="px-6 py-4 border-l border-charcoal mb-4"
                >
                  <p className="text-sm text-light-gray">{edu.year}</p>
                  <p className="font-bold text-lg">{edu.degree}</p>
                  <p className="text-light-gray text-md">{edu.institution}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Achievements
              </h2>
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Experiences
              </h2>
            </div>
          </div>
        </section>

        {/* Tech Arsenal Section - CLEANED UP */}
        <section className="px-24 py-20 border-b border-charcoal">
          <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-widest">
            Tech Arsenal
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {techs.map((tech, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center border border-white/10 bg-zinc-900/20 h-16 cursor-default transition-all duration-300 hover:bg-zinc-800/40 hover:border-white/30"
              >
                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest transition-all duration-300 group-hover:opacity-0 group-hover:scale-50">
                  {tech.name}
                </span>

                {/* Icon revealed on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 text-4xl">
                  {tech.icon}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="grid grid-cols-2 px-24 py-16 bg-charcoal/40 border-b border-charcoal"
        >
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Send a message</h2>
            <p className="mt-4 mb-10 text-light-gray text-4xl max-w-xl">
              Have a project in mind? Let&apos;s build something remarkable together.
            </p>
            <div className="flex gap-x-4 mb-4 items-center">
              <MdEmail className="text-2xl text-white" />
              <p className="text-lg">m.justinsayon@gmail.com</p>
            </div>
            <div className="flex gap-x-4 items-center">
              <FaPhoneAlt className="text-2xl text-white" />
              <p className="text-lg">0976 493 7587</p>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
          >
            <InputWithField
              label="Name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Your name here..."
            />

            <InputWithField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="your.email@gmail.com"
            />

            <InputWithField
              label="Subject"
              id="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              placeholder="Your subject here..."
            />

            <TextAreaWithField
              label="Message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Your message here..."
            />

            <ButtonDefault
              Text={loading ? 'Sending...' : 'Send Message'}
              className="mt-6"
            />
          </form>
        </section>
      </main>

      <footer className="flex justify-between items-center px-8 py-8">
        <p className="text-light-gray text-sm">
          &copy; {new Date().getFullYear()} Mark Justin Sayson. All rights
          reserved.
        </p>
        <div className="flex gap-x-6">
          <a
            href="https://github.com/M-Juss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl text-light-gray hover:text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/mark-justin-sayson-7931003ab/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl text-light-gray hover:text-white" />
          </a>
          <a
            href="https://www.facebook.com/markjustinsaysonn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-2xl text-light-gray hover:text-white" />
          </a>
          <a
            href="https://www.instagram.com/markjustin_s/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl text-light-gray hover:text-white" />
          </a>
        </div>
      </footer>
    </>
  );
}
