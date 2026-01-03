import Image from "next/image";

import environment from "@config/env";
import MultiLogo from "@images/multi.svg";

export default function Footer() {
  return (
    <footer className="flex p-4 bg-white">
      <div className="flex items-center gap-4">
        <Image alt="multi logo" height={14} src={MultiLogo} width={48} />
        <p className="text-xs max-sm:text-[10px]">
          ® 1987-{new Date().getFullYear()} GRUPO MULTI - Todos os direitos
          reservados | Versão: {environment.VERSION}
        </p>
      </div>
    </footer>
  );
}
