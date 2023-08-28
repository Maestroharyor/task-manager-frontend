import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="md:col-span-12 flex items-center justify-center py-3 bg-gray-200 dark:bg-gray-900 dark:text-gray-100">
      <p>
        &copy; {new Date().getFullYear()} - Crafted by{" "}
        <a
          className="underline"
          href="htts://ayomideodewale.com"
          target="_blank"
        >
          Maestro
        </a>
      </p>
    </div>
  );
};

export default Footer;
