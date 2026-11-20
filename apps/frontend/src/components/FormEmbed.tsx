export function FormEmbed({ src, title = "Enquiry form", note }: { src: string; title?: string; note?: string }) {
  return (
    <div>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        className="block h-[1000px] w-full rounded-lg border-0 bg-white sm:h-[880px]"
      />
      {note && <p className="m-0 mt-3 text-xs opacity-70">{note}</p>}
    </div>
  );
}
