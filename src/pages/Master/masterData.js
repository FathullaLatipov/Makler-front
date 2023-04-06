import { v4 as uuid } from "uuid";
import img1 from "../../assets/img/avatar-big.png";

export const masterData = [
  {
    id: uuid(),
    name: "iTechhouse",
    imgUrl: img1,
    jobInfo: "Мастер, 3 года опыта",
    skills: ["сантехник", "ремонт", "евро", "электрик"],
    address: "Ташкент, Шайхантахурский район",
    telNumber: "+998 90 123-45-67",
    email: "info@gmail.com",
    info: "A warehouse for storing goods is available for rent. There is a free area (land plot of 2 hectares) for the buildings of production workshops, mini-factories, etc. Our warehouse is located in the city of Tashkent, Sergeli industrial zone, opposite the Sergeli Logistic customs post. Convenient location, on a central road, there are all communications, a warehouse of more than 3000 square meters.",
  },
];
