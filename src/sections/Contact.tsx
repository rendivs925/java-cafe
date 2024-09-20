import { type ReactElement } from "react";
import dynamic from "next/dynamic";
import { contactUs, followUs, workingHours } from "@/constanst";
import Title from "@/components/Title";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const Location = () => (
  <div>
    <h2 className="mb-6 p-0 leading-7">Java Cafe</h2>
    <h4 className="text-muted-foreground mb-0 p-0">
      123 Coffee St. Brewtown, <br /> CA 12345
    </h4>
  </div>
);

const WorkingHours = () => (
  <div>
    <h4>Working Hours</h4>
    <ul className="custom-list">
      {workingHours.map(({ days, timesOpen }, index) => (
        <li key={index} className="space-y-1.5">
          <p className="text-muted-foreground sm-text mt-0">{days}</p>
          <p className="custom-p">{timesOpen}</p>
        </li>
      ))}
    </ul>
  </div>
);

const ContactInfo = () => (
  <div>
    <h4>Contact Us</h4>
    <ul className="custom-list">
      {contactUs.map(({ title, value }, index) => (
        <li key={index} className="list-style space-y-1.5">
          <p className="text-muted-foreground sm-text mt-0">{title}</p>
          <p className="custom-p">{value}</p>
        </li>
      ))}
    </ul>
  </div>
);

const FollowUs = () => (
  <div>
    <h4>Follow Us</h4>
    <ul className="flex space-x-4">
      {followUs.map(({ platform, icon: Icon, link }, index) => (
        <li key={index} className="list-none">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary"
          >
            <Icon name={platform} />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default function Contact(): ReactElement {
  return (
    <section id="contact">
      <div className="container">
        <Title
          title="Our Locations"
          description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries"
        />
        <Map />
        <div className="grid grid-cols-responsive gap-6 mt-12">
          <Location />
          <WorkingHours />
          <ContactInfo />
          <FollowUs />
        </div>
      </div>
    </section>
  );
}
