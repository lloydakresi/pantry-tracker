import { Inter, Righteous, Raleway } from "next/font/google";

export const inter_init = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: '--font-inter',
    weight: ["700", "800", "900"],
});
export const righteous_init = Righteous({
    subsets: ["latin"],
    display: "swap",
    variable: '--font-righteous',
    weight: "400",
});
export const raleway_init = Raleway({
    subsets: ["latin"],
    display: "swap",
    variable: '--font-raleway',
    weight: ["300",],
});


export const inter = inter_init.variable;
export const righteous = righteous_init.variable;
export const raleway = raleway_init.variable;
