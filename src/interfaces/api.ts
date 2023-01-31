export interface IApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IBook[];
}

interface IBook {
  id: number;
  title: string;
  subjects: string[];
  authors: IPerson[];
  translators: IPerson[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

interface IPerson {
  birth_year: number | null;
  death_year: number | null;
  name: string;
}
