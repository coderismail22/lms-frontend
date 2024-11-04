import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "./faq.css";

const Faq = () => {
  return (
    <div className="flex flex-col items-center justify-center  py-5 text-white px-5">
      <h1 className="font-bold text-2xl uppercase font-mono mb-5 overline text-center">
        Frequently Asked Questions
      </h1>
      <Accordion type="multiple" className="accordion">
        <AccordionItem value="item-1" className="accordion-item">
          {/* 1 */}
          <AccordionTrigger>Why MERN Stack ?</AccordionTrigger>
          <AccordionContent>
            The MERN stack is a combination of MongoDB, Express JS, React, and
            Node JS - four powerful technologies that work seamlessly to build
            dynamic, full-stack web applications. It&apos;s a popular choice for
            startups and businesses because it allows for quick development,
            scalability, and a consistent codebase. Choosing MERN ensures that
            your project will be fast, flexible, and future-ready.
          </AccordionContent>
        </AccordionItem>
        {/* 2 */}
        <AccordionItem value="item-2" className="accordion-item">
          <AccordionTrigger>
            What kind of projects do you build with the MERN stack?
          </AccordionTrigger>
          <AccordionContent>
            I specialize in building custom web applications, dynamic websites,
            and complex platforms with the MERN stack. Whether you need an
            e-commerce site, a content management system, a social media
            platform, or an enterprise-level solution, I can develop, maintain,
            and scale your project using MERN technologies.
          </AccordionContent>
        </AccordionItem>
        {/* 3 */}
        <AccordionItem value="item-3" className="accordion-item">
          <AccordionTrigger>
            Can you help migrate my existing project to the MERN stack?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely! I can help you seamlessly migrate your existing project
            to the MERN stack, ensuring minimal downtime and maximum performance
            improvements. I&apos;ll review your current infrastructure, plan the
            migration process, and execute it to ensure the transition is smooth
            and secure.
          </AccordionContent>
        </AccordionItem>
        {/* 4 */}
        <AccordionItem value="item-4" className="accordion-item">
          <AccordionTrigger>
            How do you ensure the security of web applications?
          </AccordionTrigger>
          <AccordionContent>
            Security is my top priority in every project I build. I follow
            industry best practices for data encryption, authentication, and
            protection against common vulnerabilities like SQL injection and XSS
            attacks. Additionally, I implement secure user authentication
            methods, such as JWT (JSON Web Tokens) and OAuth, to ensure that
            sensitive data remains safe.
          </AccordionContent>
        </AccordionItem>
        {/* 5 */}
        <AccordionItem value="item-5" className="accordion-item">
          <AccordionTrigger>
            How long does it take to build a MERN stack application?
          </AccordionTrigger>
          <AccordionContent>
            The development timeline depends on the complexity of your project
            and the features you require. A simple website or app can take a few
            weeks, while more complex applications can take a couple of months.
            I provide a detailed project plan and timeline after reviewing your
            requirements so you&apos;ll always know what to expect.
          </AccordionContent>
        </AccordionItem>
        {/* 6 */}
        <AccordionItem value="item-6" className="accordion-item">
          <AccordionTrigger>
            Do you offer ongoing support and maintenance?
          </AccordionTrigger>
          <AccordionContent>
            Yes, I provide ongoing support and maintenance services to ensure
            that your application continues to run smoothly after launch. This
            includes regular updates, bug fixes, security checks, and
            performance optimization to ensure that your app remains fast,
            secure, and functional.
          </AccordionContent>
        </AccordionItem>
        {/* 7*/}
        <AccordionItem value="item-7" className="accordion-item">
          <AccordionTrigger>
            Can you integrate third-party APIs into my application?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely! I have experience integrating a wide range of
            third-party APIs, including payment gateways, social media APIs,
            geolocation services, and more. This allows you to extend the
            functionality of your application and provide more value to your
            users.
          </AccordionContent>
        </AccordionItem>
        {/* 8 */}
        <AccordionItem value="item-8" className="accordion-item">
          <AccordionTrigger>
            What do you need from me to start a project?
          </AccordionTrigger>
          <AccordionContent>
            To get started, I&apos;ll need a clear understanding of your
            project&apos;s goals, the features you want, and any design
            preferences you have. We&apos;ll discuss your target audience,
            scalability needs, and budget to ensure the project meets your
            expectations. After that, I can provide a detailed project proposal
            and timeline.
          </AccordionContent>
        </AccordionItem>
        {/* 9 */}
        <AccordionItem value="item-9" className="accordion-item">
          <AccordionTrigger>
            How much does it cost to build a MERN stack application?
          </AccordionTrigger>
          <AccordionContent>
            The cost of a MERN stack project depends on the complexity of the
            application, the number of features, and the time required to build
            it. I offer competitive rates and transparent pricing, and I&apos;ll
            provide a detailed quote after understanding your project&apos;s
            scope.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
