import Link from 'next/link';

const Footer = () => {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", href: "/" },
        { name: "Categories", href: "/categories" },
        // { name: "TikTok Picks", href: "/tiktok-picks" },
        // { name: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Affiliate Program", href: "/affiliate" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms" },
      ]
    }
  ];

  return (
    <footer className="bg-[#100720] text-[#e0d7ff] border-t border-[#2a1a4a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="block w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 relative overflow-hidden border border-white/20 mr-2">
                <span className="absolute bottom-0 left-0 right-0 h-1/2 bg-white/20 backdrop-blur-[2px]">
                  <span className="absolute -bottom-1 left-0 right-0 h-2 bg-white/40 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]"></span>
                </span>
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/80"></span>
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-2xl font-bold font-outfit">  
                RoomVibe
              </span>
            </div>
            <p className="text-sm text-[#b8b5ff] mb-4">
              Curating aesthetic finds for your perfect space.
            </p>
            <div className="flex space-x-4">
  {/* TikTok */}
  <Link 
    href="https://tiktok.com/@aevintape"
    target="_blank"
    className="text-[#b8b5ff] hover:text-[#d367e1] transition-colors"
    aria-label="Follow us on TikTok"
  >
    <span className="sr-only">TikTok</span>
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" clipRule="evenodd"/>
    </svg>
  </Link>

  {/* GitHub */}
  <Link 
    href="https://github.com/gr1shq"
    target="_blank"
    className="text-[#b8b5ff] hover:text-[#d367e1] transition-colors"
    aria-label="Follow us on GitHub"
  >
    <span className="sr-only">GitHub</span>
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  </Link>

  {/* Twitter/X */}
  <Link 
    href="https://x.com/tapecodeEnt"
    target="_blank"
    className="text-[#b8b5ff] hover:text-[#d367e1] transition-colors"
    aria-label="Follow us on Twitter"
  >
    <span className="sr-only">Twitter</span>
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.254 2h3.63L14.41 10.08 23.12 22h-7.35l-5.18-6.97L4.75 22H1.12l8.01-8.87L.88 2h7.5l4.77 6.43L18.254 2Zm-1.27 18.7h2.01L6.11 3.18H4.03L16.984 20.7Z" />
    </svg>
  </Link>

  {/* Pinterest (default) */}
  <Link 
    href="https://sk.pinterest.com/tapecode/"
    target="_blank"
    className="text-[#b8b5ff] hover:text-[#d367e1] transition-colors"
    aria-label="Follow us on Pinterest"
  >
    <span className="sr-only">Pinterest</span>
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387-.12-1.102-.227-2.793.049-3.993.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.174.265-.402.159-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.93-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.042-1.002 2.349-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12S18.627 0 12 0z" clipRule="evenodd"/>
    </svg>
  </Link>
</div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold text-white mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#b8b5ff] hover:text-[#d367e1] transition-colors text-sm md:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          {/* <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Get the Vibe
            </h3>
            <p className="text-[#b8b5ff] text-sm mb-4">
              Subscribe for weekly curated finds and exclusive deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-[#2a1a4a] border border-[#3d2a5a] rounded-lg px-4 py-2 text-white placeholder-[#b8b5ff] focus:outline-none focus:ring-2 focus:ring-[#d367e1] flex-grow"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2a1a4a] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#b8b5ff] text-sm mb-4 md:mb-0">
            {/* © {new Date().getFullYear()} RoomVibe — Built with Vibes 💜 */}
            © {new Date().getFullYear()} RoomVibe. All Rights Reserved.
                      </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-[#b8b5ff] hover:text-[#d367e1] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#b8b5ff] hover:text-[#d367e1] text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/affiliate" className="text-[#b8b5ff] hover:text-[#d367e1] text-sm transition-colors">
              Affiliate Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;