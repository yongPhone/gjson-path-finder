
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type PathSegment = string | number;

export interface JsonNodeInfo {
  path: PathSegment[];
  value: Json;
}
