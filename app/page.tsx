import { Button } from "@/components/ui/button";
import Hero from "@/components/ui-components/hero";
import "./styles/globals.css";
import Navbar from "@/components/ui-components/navbar";
import Card from "@/components/ui-components/card";
import ShowCards from "@/components/ui-components/show-cards";
import { ScrollProvider } from "@/context/scrolljson";
import ConvertComponent from "@/components/ui-components/convert-component";

export default function Home() {
  return (
    <>
      <ScrollProvider>
        <Navbar />
        <Hero />
        <ShowCards />
        <ConvertComponent />
      </ScrollProvider>
    </>
  );
}
