export type SetTheme = {
  theme: string;
  sourcePath: string;
  targetPath: string;
  config?: string;
  cb?: () => void;
};

export type SetThemeCallback = (param: SetTheme) => Promise<void>;

export type SetConfigTheme = {
  theme: string;
  setThemeCallback: SetThemeCallback;
};
