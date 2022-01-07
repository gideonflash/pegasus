import { SelectionResovler, getView } from "./getView";

/**
 * Context
 */
export enum ContextKey {
  USER = "user",
  TIER_ONE = "tier1",
  TAGS = "tags",
  PRIORITY_TAGS = "priorityTags",
  LOCATION = "location",
  EMAIL = "email",
}

export type Context = {
  [key: string]: string;
};

export type ContextValues = Context[keyof Context];

export interface ViewConfig<T> {
  viewName: string;
  resolverConfig: T;
}

export type View = ViewConfig<SelectionResovler>;

export type PegasusClientClientConfig = {
  views: {
    [key: string]: View;
  };
};

export class Enquiry {
  curr?: View;
  old: View[];
  tree: PegasusClientClientConfig;
  ctx: Context;

  constructor(tree: PegasusClientClientConfig, ctx: Context) {
    this.curr = undefined;
    this.old = [];
    this.tree = tree;
    this.ctx = ctx;
  }

  next() {
    // if current is empty get start,
    if (this.curr) {
      // otherwise use curr node.choose to lookup in tree
      const { viewName, message } = getView(this.curr, this.ctx);

      // Something did not go well
      if (!viewName) {
        return `could not find next view ${message}`;
      }

      // Finished
      if (viewName === "done") {
        return `current view -> done "your are finished"`;
      } else {
        if (this.tree.views[viewName]) {
          this.old.push(this.curr);

          this.curr = this.tree.views[viewName];
          return `current view -> ${viewName}`;
        } else {
          return `${viewName} is not configured`;
        }
      }
    } else {
      this.curr = this.tree.views["start"];
      return `current view -> start`;
    }
  }

  back() {
    if (this.old.length) {
      this.curr = this.old.pop();
      return `current view -> ${this.curr?.viewName}`;
    } else {
      return "nothing to go back to";
    }
  }
}
