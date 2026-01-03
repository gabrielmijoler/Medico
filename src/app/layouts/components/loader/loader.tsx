const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import dynamic from "next/dynamic";

import loaderMultitech from "@/app/assets/animations/loader-multitech.json";

type TProps = {
  fullPage?: boolean;
  width?: number;
};

export default function Loader({ width = 240, fullPage }: TProps) {
  if (fullPage) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Lottie animationData={loaderMultitech} style={{ width }} />
      </div>
    );
  }

  return <Lottie animationData={loaderMultitech} style={{ width }} />;
}
