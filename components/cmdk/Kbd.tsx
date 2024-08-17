interface KbdProps {
  children: React.ReactNode;
}

const Kbd = ({ children }: KbdProps) => {
  return (
    <div className="border rounded-md border-zinc-600 bg-zinc-950 text-zinc-600 rounded-m p-0.5 min-w-5 flex items-center justify-center aspect-square text-xs">
      {children}
    </div>
  );
};

export default Kbd;

