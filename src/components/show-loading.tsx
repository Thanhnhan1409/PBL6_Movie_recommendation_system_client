import { Icons } from "./icons";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white opacity-40">
      <Icons.spinner
        color="black"
        className="mr-2 h-4 w-4 animate-spin absolute top-1/2 right-1/2"
        aria-hidden="true"
      />
    </div>
  );
}

export default LoadingSpinner;