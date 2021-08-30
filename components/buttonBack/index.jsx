import BackIcon from '@components/icon/back';
import { useRouter } from 'next/router';

function ButtonBack() {
  const router = useRouter();

  const handlerBack = () => {
    router.back();
  };

  return (
    <button className="flex items-center gap-3" onClick={handlerBack}>
      <BackIcon />
      <p>Back</p>
    </button>
  );
}

export default ButtonBack;
