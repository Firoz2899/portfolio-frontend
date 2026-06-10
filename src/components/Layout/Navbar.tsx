const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full backdrop-blur-lg bg-slate-900/80 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">

        <h2 className="font-bold text-xl">
          Firoz.dev
        </h2>

        <div className="hidden md:flex gap-8">

          <a href="#about">About</a>

          <a href="#skills">Skills</a>

          <a href="#experience">Experience</a>

          <a href="#projects">Projects</a>

          <a href="#contact">Contact</a>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;