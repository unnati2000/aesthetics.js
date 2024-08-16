interface KbdProps {
  children: React.ReactNode;
}

const Kbd = ({ children }: KbdProps) => {
  return (
    <div className="border rounded-md p-0.5 aspect-square text-xs">
      {children}
    </div>
  );
};

export default Kbd;

