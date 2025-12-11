import projects from "@/data/projects";
import Link from "next/link";

export default function ProjectDetail({ params }) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    return (
      <section className="py-32 px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Project not found</h1>
        <p className="text-gray-400 mb-8">
          The requested project does not exist yet.
        </p>
        <Link href="/projects">
          <a className="text-cyan-500 hover:underline">Back to Projects</a>
        </Link>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        {project.title}
      </h1>

      <p className="text-xl text-gray-300 mb-8">{project.description}</p>

      <h3 className="text-2xl font-semibold text-white mb-4">Tech Stack</h3>

      <ul className="flex flex-wrap gap-3 mb-8">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-gray-200"
          >
            {tech}
          </li>
        ))}
      </ul>

      <Link href="/projects">
        <a className="inline-block text-cyan-500 hover:underline">
          Back to Projects
        </a>
      </Link>
    </section>
  );
}
