import { ArrowBigLeft } from "lucide-react";
import React from "react";
import Header from "../Header";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type HeaderProps = {
  title: string;
  routerFunc: AppRouterInstance;
  buttonComponent?: React.ReactNode;
};

const HeaderContainer = ({
  title,
  routerFunc,
  buttonComponent,
}: HeaderProps) => {
  return (
    <div className="flex">
      <ArrowBigLeft
        className="mr-1 mt-1 cursor-pointer"
        onClick={() => routerFunc.back()}
      />
      <Header name={title} buttonComponent={buttonComponent} />
    </div>
  );
};

export default HeaderContainer;
