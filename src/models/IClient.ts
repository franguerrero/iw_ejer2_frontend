export interface IClient {
  _id: string;
  name: string;
  description: string;
  rootUrl: string;
  image: { data: { data: number[] }; contentType: string };
}
