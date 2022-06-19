export type CreateVideoPayload = {
  title: string;
  videoId: string;
};

export type Video = {
  id: number;
  title: string;
  videoId: string;
  created_at: string;
};

export type VideoFormFields = {
  title: string;
  videoId: string;
  url: string;
};
