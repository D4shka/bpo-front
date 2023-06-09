import React from "react";

interface ISectionTitle {
  children: React.ReactNode;
}

function SectionTitle({ children }: ISectionTitle) {
  return <h2 className="mb-4 text-lg font-sans text-gray-600">{children}</h2>;
}

export default SectionTitle;
