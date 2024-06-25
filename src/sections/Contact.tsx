import { type ReactElement } from "react";
import dynamic from "next/dynamic";
import { Title } from "@/components";
import { contactUs, workingHours } from "@/constanst";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export interface ContactProps {}

export default function Contact(props: ContactProps): ReactElement {
  return (
    <section>
      <div className="container">
        <Title
          title="Our Locations"
          description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries"
        />
        <Map />
        <div className="grid grid-cols-responsive gap-6 mt-12">
          <div>
            <h2 className="mb-6 p-0 leading-7">Java Cafe</h2>
            <h4 className="text-muted-foreground mb-0 p-0">
              123 Coffee St. Brewtown, <br /> CA 12345
            </h4>
          </div>

          <div>
            <h4>Working Hours</h4>
            <ul className="custom-list">
              {workingHours.map(({ days, timesOpen }, index) => {
                return (
                  <li key={index}>
                    <p className="text-muted-foreground sm-text mb-2">{days}</p>
                    <p className="custom-p">{timesOpen}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4>Contact Us</h4>
            <ul className="custom-list">
              {contactUs.map(({ title, value }, index) => {
                return (
                  <li key={index} className="list-style">
                    <p className="text-muted-foreground sm-text mb-2">
                      {title}
                    </p>
                    <p className="custom-p">{value}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4>Follow Us</h4>
            <ul className="custom-list">
              {contactUs.map(({ title, value }, index) => {
                return (
                  <li key={index} className="list-style">
                    <p className="text-muted-foreground sm-text mb-2">
                      {title}
                    </p>
                    <p className="custom-p">{value}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
