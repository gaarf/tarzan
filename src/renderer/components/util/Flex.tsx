import React from "react";
import { useStyles } from "../../plumbing";

type FlexProps = {
  gutter?: number;
  padded?: boolean;
  spacing?: boolean;
  justify?: string;
};

const Flex: React.FC<FlexProps> = ({ gutter, padded, justify, spacing, children }) => {
  const [styles, cx] = useStyles(({ mixin, unit }) => ({
    flex: {
      ...mixin.horizontal,
      ...mixin.center,
      justifyContent: justify,
      padding: padded && unit,
      paddingBottom: spacing && unit,
    },
    gutter: {
      width: typeof gutter !== "undefined" ? gutter : unit
    }
  }));

  return (
    <div className={cx(styles.flex)}>
      {React.Children.map(children, (child, index) => (
        <>
          {index > 0 && <span className={cx(styles.gutter)} />}
          {child}
        </>
      ))}
    </div>
  );
};

export default Flex;
