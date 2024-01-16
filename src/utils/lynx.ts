import axios from "axios";

const routes = {
  link: "/api/link",
};

const baseURL = "https://shortener.fristroop.com";
const lynx = axios.create({
  baseURL,
  headers: {
    Authorization: `${process.env.lynxKey!}`,
  },
});

export const shortenURL = async (
  destination: string,
  slug?: string
): Promise<IShortenedURL> => {
  const res = await lynx.post(routes.link, {
    destination,
    slug: slug || "",
  });
  return {
    url: baseURL + "/" + res.data.result.slug,
    ...res.data,
  };
};

interface IShortenedURL {
  success: boolean;
  url: string;
  result: {
    id: string;
    slug: string;
    destination: string;
    author: string;
    creationDate: string;
    modifiedDate: string;
    visits: number;
    account: string;
  };
}
