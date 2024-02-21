export interface Property {
  Value: any;
  Label: string;
}

export interface SummaryModel {
  id: string | number;
  SamplingTime: string;
  Properties: Property[];
}
