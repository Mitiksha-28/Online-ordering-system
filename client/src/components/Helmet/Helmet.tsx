import React from "react";

const Helmet = (props: { title: string; children: React.ReactNode }) => {
  document.title = "Coffee Stop -" + props.title;
  return <div className="w-100">{props.children}</div>;
};

export default Helmet;
