import Link from "next/link";
import Logo from "@/components/brand/Logo";

/**
 * Startpunkt «/»: leitet anhand der Browsersprache auf /de/ oder /en/ weiter.
 * Ohne JavaScript bleiben die beiden Sprach-Links sichtbar.
 */
export default function RootRedirect() {
  const script = `(function(){try{var l=((navigator.languages&&navigator.languages[0])||navigator.language||'de').toLowerCase();location.replace(l.indexOf('en')===0?'/en/':'/de/');}catch(e){location.replace('/de/');}})();`;
  return (
    <main className="grid min-h-screen place-items-center bg-surface p-6">
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="flex flex-col items-center gap-8">
        <Logo />
        <div className="flex gap-3">
          <Link href="/de/" className="rounded-full bg-blue px-5 py-2.5 font-medium text-white">
            Deutsch
          </Link>
          <Link href="/en/" className="rounded-full bg-mist px-5 py-2.5 font-medium">
            English
          </Link>
        </div>
      </div>
    </main>
  );
}
