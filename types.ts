export type SetTheme = {
  theme: string;
  sourcePath: string;
  targetPath: string;
  config?: string;
  cb?: () => void;
};
