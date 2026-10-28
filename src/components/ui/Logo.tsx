import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isLight?: boolean;
}

export function Logo({ className = '', size = 'md', isLight = false }: LogoProps) {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subtitleSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-transform active:scale-95 ${className}`}>
      <div className={`relative ${iconSize} rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-navy-900 p-0.5 shadow-md group-hover:shadow-teal-500/20 transition-all`}>
        <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Circuit-inspired tech graphic */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1eb8a5_1px,transparent_1px)] [background-size:6px_6px]" />
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-teal-400 to-teal-200 tracking-tighter">
            BT
          </span>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-black tracking-tight leading-none ${titleSize} ${isLight ? 'text-white' : 'text-navy-950'}`}>
          BYTE <span className="text-teal-500">TECH</span>
        </span>
        <span className={`font-bold tracking-widest uppercase ${subtitleSize} ${isLight ? 'text-slate-300' : 'text-slate-500'} mt-0.5`}>
          BANGLADESH • BD
        </span>
      </div>
    </Link>
  );
}
