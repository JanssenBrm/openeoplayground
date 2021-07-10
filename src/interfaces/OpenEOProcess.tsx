export interface OpenEOProcess {
    description: string;
    id: string;
    parameters: OpenEOProcessParam[];
}

export interface OpenEOProcessParam {
  default: any;
  description: string;
  name: string;
  optional: boolean;
  schema: {
      type: string;
      'sub-type': string;
  }
  value: any;
}
