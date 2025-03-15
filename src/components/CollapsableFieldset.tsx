import React, { useState } from "react";
import { Icons, Heading } from "../utils";
import styles from "../scss/components/CollapsableFieldset.module.scss";
import clsx from "clsx";

type CollapsableFieldsetProps = {
  legend: string;
  initiallyOpen?: boolean;
  subLegend?: string;
} & React.HTMLAttributes<HTMLFieldSetElement>;

const CollapsableFieldset = ({
  legend,
  children,
  initiallyOpen = true,
  className,
  subLegend,
  ...props
}: CollapsableFieldsetProps) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  };

  const ArrowIcon = isOpen ? Icons.Arrowupsmall : Icons.Arrowdownsmall;

  return (
    <fieldset {...props} className={clsx(styles.fieldset, className)}>
      <div className={styles.header}>
        <legend>
          <Heading as="span" size="headingxl">
            {legend}
          </Heading>
          {subLegend && <span className={styles.subLegend}>{subLegend}</span>}
        </legend>
        <button onClick={toggleOpen} className={styles.toggleButton}>
          {/* This button is positioned over the entire header */}
          <ArrowIcon />
        </button>
      </div>
      <hr />
      <div
        className={clsx(styles.content, {
          [styles.open]: isOpen,
        })}
      >
        {children}
      </div>
    </fieldset>
  );
};

export default CollapsableFieldset;
