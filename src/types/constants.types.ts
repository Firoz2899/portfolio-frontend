import type { LoadableComponent } from "@loadable/component";

export interface INavigationItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  accent: string;
  natureIcon: React.ReactNode;
  component?: LoadableComponent<unknown>;
}