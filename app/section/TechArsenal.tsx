import {useState} from 'react';
import { TECHS } from '@/lib/data';
import { TechCategory } from '@/lib/data';

export default function TechArsenal() {
  const [selectedTechCategory, setSelectedTechCategory] =
    useState<TechCategory>('all');

  const filteredTechs =
    selectedTechCategory === 'all'
      ? TECHS
      : TECHS.filter(tech => tech.category === selectedTechCategory);

  return (
    <section className="px-24 py-20 border-b border-charcoal">
      <h2 className="text-3xl font-bold mb-4 text-center uppercase tracking-widest">
        Tech Arsenal
      </h2>
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {(
          [
            {label: 'All', value: 'all'},
            {label: 'Front-end', value: 'front-end'},
            {label: 'Back-end', value: 'back-end'},
            {label: 'Tools', value: 'tools'}
          ] as {label: string; value: TechCategory}[]
        ).map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => setSelectedTechCategory(option.value)}
            className={`rounded-md border px-4 py-2 text-sm uppercase tracking-wide transition-colors ${
              selectedTechCategory === option.value
                ? 'border-white/70 bg-white/10 text-white'
                : 'border-white/20 text-light-gray hover:border-white/40 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {filteredTechs.map(tech => {
          const TechIcon = tech.icon;

          return (
            <div
              key={tech.name}
              className="group relative flex h-14 w-46 items-center justify-center border border-white/10 bg-zinc-900/20 cursor-default transition-all duration-300 hover:bg-zinc-800/40 hover:border-white/30"
            >
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest transition-all duration-300 group-hover:opacity-0 group-hover:scale-50">
                {tech.name}
              </span>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 text-4xl">
                <TechIcon style={{color: tech.color}} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
