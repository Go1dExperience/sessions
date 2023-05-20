export type Session = {
  id: string;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  program: Program[];
};
export type Program = {
  id: string;
  display_title: string;
  thumbnail_img_url: string;
  short_title: string;
};