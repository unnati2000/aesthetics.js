import { ReactNode } from "react";

export interface Item {
  id: number;
  name: string;
  description: string;
  startContent: ReactNode;
  endContent: ReactNode;
}

