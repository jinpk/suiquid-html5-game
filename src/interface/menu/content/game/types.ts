export interface SuiquidAdVector {
  fields: {
    deposit: string;
    id: string;
    state: "READY" | string;
    title: string;
    url: string;
  };
}
