import React from "react";

interface IPageTitle {
  children: React.ReactNode;
}

function PageTitle({ children }: IPageTitle) {
  return <h1 className="my-6 text-2xl font-sans text-gray-700">{children}</h1>;
}

export default PageTitle;
