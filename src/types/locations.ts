export interface Countries {
  code: string;
  name: string;
  states: States[];
}

interface States {
  code: string;
  name: string;
}
