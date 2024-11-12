export default function Logo({ image, alt, link }: { image: string; alt: string; link: string }) {
  return (
    <a href={link}>
      <img src={image} alt={alt} className="h-24 p-6 will-change-filter transition-filter duration-300" />
    </a>
  );
}
