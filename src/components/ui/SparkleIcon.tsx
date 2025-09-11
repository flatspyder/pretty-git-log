import React from 'react';

const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 0c0 16.9-9.1 32-22 32c12.9 0 22 15.1 22 32c0-16.9 9.1-32 22-32c-12.9 0-22-15.1-22-32"
      fill="currentColor"
    ></path>
    <path
      d="M53 0c0 8.4-4.6 16-11 16c6.4 0 11 7.6 11 16c0-8.4 4.6-16 11-16c-6.4 0-11-7.6-11-16"
      fill="currentColor"
    ></path>
    <path
      d="M48 32c0 8.4-4.6 16-11 16c6.4 0 11 7.6 11 16c0-8.4 4.6-16 11-16c-6.4 0-11-7.6-11-16"
      fill="currentColor"
    ></path>
  </svg>
);

export default SparkleIcon;
