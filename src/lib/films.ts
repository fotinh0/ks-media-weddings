import mattAngie from "@/assets/matt-angie.jpg.asset.json";
import jiwonJae from "@/assets/jiwon-jae.jpg.asset.json";
import lindsayAriel from "@/assets/lindsay-ariel.jpg.asset.json";
import ilinaGrant from "@/assets/ilina-grant.jpg.asset.json";
import lindsayJeff from "@/assets/lindsay-jeff.jpg.asset.json";
import julieBilly from "@/assets/julie-billy.jpg.asset.json";
import tomTaylor from "@/assets/tom-taylor.jpg.asset.json";
import julietteWill from "@/assets/juliette-will.jpg.asset.json";

export type Film = {
  slug: string;
  couple: string;
  image: string;
  vimeoId?: string;
};

export const films: Film[] = [
  { slug: "matt-angie", couple: "Matt & Angie", image: mattAngie.url, vimeoId: "1105665651" },
  { slug: "jiwon-jae", couple: "Jiwon & Jae", image: jiwonJae.url, vimeoId: "1222264470" },
  {
    slug: "lindsay-ariel",
    couple: "Lindsay & Ariel",
    image: lindsayAriel.url,
    vimeoId: "1222255591",
  },
  { slug: "ilina-grant", couple: "Ilina & Grant", image: ilinaGrant.url, vimeoId: "1222260454" },
  { slug: "lindsay-jeff", couple: "Lindsay & Jeff", image: lindsayJeff.url, vimeoId: "1105679510" },
  { slug: "julie-billy", couple: "Julie & Billy", image: julieBilly.url, vimeoId: "980871645" },
  { slug: "tom-taylor", couple: "Thomas & Taylor", image: tomTaylor.url },
];

export const getFilm = (slug: string) => films.find((f) => f.slug === slug);

export const packages = [
  {
    name: "The Highlight",
    price: "$3,250",
    teaser: "A cinematic highlight film capturing the best moments of your day.",
    items: [
      "One videographer",
      "Up to 10 hours of coverage",
      "2+ cameras, 4K footage",
      "Drone coverage",
      "Full ceremony edit",
      "Full first dance, parent dances & toasts",
      "4–8 minute highlight film",
    ],
  },
  {
    name: "The Story",
    price: "$3,850",
    featured: true,
    teaser: "A documentary film that lets you relive the full story of your celebration.",
    items: ["Everything in The Highlight", "40–60 minute documentary film"],
  },
  {
    name: "The Heirloom",
    price: "$5,050",
    teaser: "A complete collection of films, including a teaser and documentary.",
    items: [
      "Two videographers",
      "Up to 10 hours of coverage",
      "3+ cameras, 6K footage",
      "Drone coverage",
      "Full ceremony, dances & toasts",
      "60 second teaser",
      "4–8 minute highlight film",
      "40–60 minute documentary film",
    ],
  },
];

export const CONTACT_EMAIL = "ksanxhakumedia@gmail.com";
