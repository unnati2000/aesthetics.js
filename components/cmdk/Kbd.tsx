interface KbdProps {
  children: React.ReactNode;
}

const Kbd = ({ children }: KbdProps) => {
  return (
    <div className="border rounded-md border-zinc-600 bg-zinc-950 text-zinc-300 rounded-m px-1 py-0.5 min-w-5 max-h-5 flex items-center justify-center text-xs">
      {children}
    </div>
  );
};

export default Kbd;

