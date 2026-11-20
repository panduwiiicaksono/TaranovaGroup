export function FormEmbed({ src, title = "Enquiry form" }: { src: string; title?: string }) {
  return (
    <div>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        className="block h-[1000px] w-full rounded-lg border-0 bg-white sm:h-[880px]"
      />
      <p className="m-0 mt-3 text-xs opacity-70">This form is provided by Microsoft Forms.</p>
    </div>
  );
}
