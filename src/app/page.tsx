import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Specializations } from "@/components/site/specializations";
import { WhyChoose } from "@/components/site/why-choose";
import { TreatmentProcess } from "@/components/site/process";
import { Reviews } from "@/components/site/reviews";
import { HomeVisit } from "@/components/site/home-visit";
import { Statistics } from "@/components/site/statistics";
import { BodyDiagram } from "@/components/site/body-diagram";
import { MiniTools } from "@/components/site/mini-tools";
import { Gallery } from "@/components/site/gallery";
import { Faq } from "@/components/site/faq";
import { Appointment } from "@/components/site/appointment";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { ChatBot } from "@/components/site/chatbot";
import { LoadingScreen } from "@/components/site/loading-screen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <About />
        <Specializations />
        <WhyChoose />
        <TreatmentProcess />
        <Reviews />
        <HomeVisit />
        <Statistics />
        <BodyDiagram />
        <MiniTools />
        <Gallery />
        <Faq />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <ChatBot />
    </>
  );
}
