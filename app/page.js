import dynamic from "next/dynamic";
import Hero from "./(sections)/Hero";
import SectionWrapper from "./(components)/SectionWrapper";

const About = dynamic(() => import("./(sections)/About"));
const Timeline = dynamic(() => import("./(sections)/Timeline"));
const Skills = dynamic(() => import("./(sections)/Skills"));
const Projects = dynamic(() => import("./(sections)/Projects"));
const Photography = dynamic(() => import("./(sections)/Photography"));
const Achievements = dynamic(() => import("./(sections)/Achievements"));
const Links = dynamic(() => import("./(sections)/Links"));
const Contact = dynamic(() => import("./(sections)/Contact"));
const Future = dynamic(() => import("./(sections)/Future"));

export default function HomePage() {
  return (
    <div>
      <SectionWrapper id="hero">
        <Hero />
      </SectionWrapper>
      <SectionWrapper id="about">
        <About />
      </SectionWrapper>
      <SectionWrapper id="timeline">
        <Timeline />
      </SectionWrapper>
      <SectionWrapper id="skills">
        <Skills />
      </SectionWrapper>
      <SectionWrapper id="projects">
        <Projects />
      </SectionWrapper>
      <SectionWrapper id="photography">
        <Photography />
      </SectionWrapper>
      <SectionWrapper id="achievements">
        <Achievements />
      </SectionWrapper>
      <SectionWrapper id="links">
        <Links />
      </SectionWrapper>
      <SectionWrapper id="contact">
        <Contact />
      </SectionWrapper>
      <SectionWrapper id="future">
        <Future />
      </SectionWrapper>
    </div>
  );
}
