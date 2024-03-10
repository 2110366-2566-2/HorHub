import { ReactNode } from "react";

export default function DormIcon({
  title,
  content,
  children,
}: {
  title: string;
  content: string;
  children?: ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <div>{children}</div>
        <div className="flex flex-col">
          <div>{title}</div>
          <div className="font-bold">{content}</div>
        </div>
      </div>
    </div>
  );
}
