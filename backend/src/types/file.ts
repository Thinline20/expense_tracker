export type FileType = {
  readonly _tag: "FileType";
  path: string;
  pathParts: string[];
  filename: string;
  extension: "ts" | "js";
  filePath: string;
};
