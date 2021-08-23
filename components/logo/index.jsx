import Image from 'next/image';

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/favicon.svg"
        width={40}
        height={40}
      />
      <p className="text-xl font-bold text-na-green">Noteable</p>
    </div>
  );
}

export default Logo;
