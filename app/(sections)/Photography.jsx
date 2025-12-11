import photos from "../../data/photos";

export default function Photography() {
  return (
    <section className="max-w-6xl mx-auto my-20 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center text-foreground">
        Photography
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <figure
            key={index}
            className="overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl bg-card border border-glass-border"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-64 object-cover"
            />
            <figcaption className="p-4 text-foreground text-center font-medium">
              {photo.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
