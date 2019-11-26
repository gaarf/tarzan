declare module "react-split" {
  const Split: React.FC<{
    className?: string;
    sizes: number[];
    gutterSize?: number;
    direction: "horizontal" | "vertical";

    minSize?: number;
    collapsed?: number;
    expandToMin?: boolean;
    snapOffset?: number;
    dragInterval?: number;

    // onDrag: (event:React.DragEvent) => void,
    // onDragStart: (event:React.DragEvent) => void,
    // onDragEnd: (event:React.DragEvent) => void,
  }>;

  export default Split;
}
