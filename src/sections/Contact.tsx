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
        <div className="grid grid-cols-responsive gap-lg mt-3xl">
          <div>
            <h2>Java Cafe</h2>
            <h4 className="text-bodyBlur">
              123 Coffee St. Brewtown, <br /> CA 12345
            </h4>
          </div>

          <div>
            <h4>Working Hours</h4>
            <ul className="custom-list">
              {workingHours.map(({ days, timesOpen }, index) => {
                return (
                  <li key={index}>
                    <p className="text-bodyBlur mb-2xs smaller-text font-bold">
                      {days}
                    </p>
                    <h4>{timesOpen}</h4>
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
                    <p className="text-bodyBlur smaller-text mb-2xs font-bold">
                      {title}
                    </p>
                    <h4>{value}</h4>
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
                    <p className="text-bodyBlur smaller-text mb-2xs font-bold">
                      {title}
                    </p>
                    <h4>{value}</h4>
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
