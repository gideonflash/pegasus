import { ValidatoinAST } from "../pegasusLang/langtools/types";
import { getView } from "./getView";

/**
 * Context
 */
export type Context = {
  [key: string]: string | string[];
};

export interface ViewConfig {
  viewName: string;
  viewComponent: string;
  resolverConfig: {
    config: string;
    valAst: ValidatoinAST;
  };
}

export type PegasusClientClientConfig = {
  views: {
    [key: string]: ViewConfig;
  };
};

export class SequenceRunner<T extends Context> {
  curr?: ViewConfig;
  old: ViewConfig[];
  tree: PegasusClientClientConfig;
  ctx: T;

  constructor(tree: PegasusClientClientConfig, ctx: T) {
    this.curr = undefined;
    this.old = [];
    this.tree = tree;
    this.ctx = ctx;
  }

  async next() {
    // if current is empty get start,
    if (this.curr) {
      // otherwise use curr node.choose to lookup in tree
      const { viewName, message } = await getView(this.curr, this.ctx);

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
