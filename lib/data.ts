import {IconType} from 'react-icons';
import { 
  SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss, 
  SiOpenjdk, SiPython, SiMysql, SiSqlite, SiPostgresql, 
  SiMongodb, SiPhp, SiGit, SiShadcnui, SiZod 
} from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';
import { PiFileCSharpFill } from 'react-icons/pi';

export type TechCategory = 'all' | 'front-end' | 'back-end' | 'tools';

export const EDUCATIONS = [
  { id: 1, year: '2011-2017', degree: 'Elementary School', institution: 'Halayhay Elementary School' },
  { id: 2, year: '2017-2021', degree: 'Computer System Servicing', institution: 'Amaya School of Home Industries' },
  { id: 3, year: '2021-2023', degree: 'Science, Technology, Engineering, and Mathematics', institution: 'Our Lady of the Holy Rosary' },
  { id: 4, year: '2023-2027', degree: 'Bachelor of Science in Information Technology', institution: 'STI College Rosario' }
];

export type TechItem = {
  name: string;
  icon: IconType;
  color: string;
  category: Exclude<TechCategory, 'all'>;
};

export const TECHS: TechItem[] = [
  {name: 'HTML', icon: SiHtml5, color: '#E34F26', category: 'front-end'},
  {name: 'CSS', icon: SiCss, color: '#1572B6', category: 'front-end'},
  {name: 'Javascript', icon: SiJavascript, color: '#F7DF1E', category: 'front-end'},
  {name: 'React', icon: SiReact, color: '#61DAFB', category: 'front-end'},
  {name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'front-end'},
  {name: 'Java', icon: SiOpenjdk, color: '#ED8B00', category: 'back-end'},
  {name: 'C#', icon: PiFileCSharpFill, color: '#239120', category: 'back-end'},
  {name: 'Python', icon: SiPython, color: '#3776AB', category: 'back-end'},
  {name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'back-end'},
  {name: 'SQLite', icon: SiSqlite, color: '#003B57', category: 'back-end'},
  {name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'back-end'},
  {name: 'NoSQL', icon: SiMongodb, color: '#47A248', category: 'back-end'},
  {name: 'PHP', icon: SiPhp, color: '#777BB4', category: 'back-end'},
  {name: 'Git', icon: SiGit, color: '#F05032', category: 'tools'},
  {name: 'Github', icon: FaGithub, color: '#FFFFFF', category: 'tools'},
  {name: 'Zod', icon: SiZod, color: '#3776AB', category: 'tools'},
  {name: 'ShadCn', icon: SiShadcnui, color: '#FFFFFF', category: 'tools'}
];
