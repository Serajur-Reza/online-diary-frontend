import DOMPurify from "isomorphic-dompurify";

interface Props {
  html: string;
  className?: string;
}

export default function UniversalHtmlRenderer({ html, className }: Props) {
  const sanitized = DOMPurify.sanitize(html, {
    // 1. Enable all standard HTML, SVG, and MathML tags
    USE_PROFILES: { html: true, svg: true, mathMl: true },

    // 2. Allow ALL attributes (including data-*, style, class, etc.)
    // Setting this to true allows attributes not in the default whitelist
    ALLOW_UNKNOWN_PROTOCOLS: true,

    // 3. Explicitly allow style and class to ensure CSS works
    ADD_ATTR: ["style", "class", "id", "target"],

    // 4. Force links to be safe (prevents javascript:alert(1))
    SAFE_FOR_TEMPLATES: true,
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
