'use client';

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';

import HeroSection from './section/HeroSection';
import TechArsenal from './section/TechArsenal';
import Contact from './section/Contact';
import { EDUCATIONS } from '@/lib/data';

export default function Home() {
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
        <HeroSection/>
        

        {/* Education/Achievements/Experiences Section */}
        <section
          id="projects"
          className="px-24 py-16 bg-charcoal/40 border-b border-charcoal"
        >
          <div className="w-full grid grid-cols-3">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-center">Education</h2>
              {EDUCATIONS.map(edu => (
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
        <TechArsenal/>
        <Contact/>
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
