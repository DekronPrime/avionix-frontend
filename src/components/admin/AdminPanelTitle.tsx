import Image, { StaticImageData } from "next/image";

type AdminPanelTitleProps = {
  title: string;
  icon?: StaticImageData;
};

export const AdminPanelTitle: React.FC<AdminPanelTitleProps> = ({
  title,
  icon,
}: AdminPanelTitleProps) => {
  return (
    <div className="flex w-full rounded-md p-4 justify-center items-center gap-6 bg-dark">
      {icon && (
        <Image src={icon} alt="icon" width={50} height={50} draggable={false} />
      )}
      <span className="text-4xl font-orbitron font-bold text-white">
        {title}
      </span>
    </div>
  );
};
