import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Link } from "react-router-dom";

const ServicePackages = () => {
  return (
    <div className="relative flex flex-col  h-full w-full py-7 px-5">
      <Tabs
        defaultValue="fullstack"
        className="w-full flex flex-col justify-center items-center ease-in"
      >
        <TabsList defaultValue="frontend">
          <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
        </TabsList>
        {/* Full Stack */}
        <TabsContent value="fullstack">
          <div className=" text-white rounded-md">
            <div className="text-center py-2">
              <h5 className="text-2xl text-blue-200 uppercase">Next Level</h5>
              <h1 className="text-3xl font-bold uppercase">
                Full Stack Development
              </h1>
            </div>

            <div className="grid group md:grid-cols-2 mx-auto gap-8 text-center">
              {/*Package 1*/}
              <div className="cursor-pointer duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.80] hover:!scale-100 bg-white/10 p-8 rounded-xl mix-blend-luminosity">
                <Badge variant="destructive">STARTER</Badge>
                <h4 className="text-2xl font-bold mx-auto my-4 tracking-widest ">
                  Full Stack Package - I
                </h4>

                {/* Pricing */}
                <h1 className="text-4xl font-bold my-5">
                  $500<span className="text-lg text-gray-300"></span>{" "}
                </h1>

                {/* OS */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={os} alt="os" width={25} /> */}
                  <p>• Responsive frontend development (up to 3 pages)</p>
                </div>
                <Separator className="my-1 " />

                {/* CPU */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={cpu} alt="cpu" width={25} /> */}
                  <p>• Backend development (basic CRUD operations)</p>
                </div>
                <Separator className="my-1" />
                {/* RAM */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ram} alt="ram" width={25} /> */}
                  <p>• Basic database setup (MongoDB)</p>
                </div>
                <Separator className="my-1" />
                {/* SSD */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ssd} alt="ssd" width={25} /> */}
                  <p>• User authentication (login/signup)</p>
                </div>
                <Separator className="my-1" />
                {/* Bandwidth */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={bandwidth} alt="bandwidth" width={25} /> */}
                  <p>• Simple API integrations</p>
                </div>
                <Separator className="my-1" />
                {/* IP */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ip} alt="ip" width={25} /> */}
                  <p>• Deployment on hosting provider (Netlify/Heroku)</p>
                </div>
                <Separator className="my-1" />
                {/* License */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={license} alt="license" width={25} /> */}
                  <p>• Timeframe: 1-2 weeks</p>
                </div>
                <Separator className="my-1" />

                <Link to="/contact">
                  <Button>Purchase</Button>
                </Link>
              </div>
              {/*Package 2*/}
              <div className="cursor-pointer duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.80] hover:!scale-100 bg-white/10 p-8 rounded-xl mix-blend-luminosity">
                <Badge variant="destructive">Advanced</Badge>
                <h4 className="text-2xl font-bold mx-auto my-4 tracking-widest ">
                  Full Stack Package - II
                </h4>

                {/* Pricing */}
                <h1 className="text-4xl font-bold my-5">$1000</h1>

                {/* OS */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={os} alt="os" width={25} /> */}
                  <p>• Fully customized responsive frontend (up to 10 pages)</p>
                </div>
                <Separator className="my-1 " />

                {/* CPU */}
                <div className="flex items-left justify-start gap-2">
                  {/* <img src={cpu} alt="cpu" width={25} /> */}
                  <p>
                    • Backend with advanced functionality (real-time features,
                    user roles, complex logic)
                  </p>
                </div>
                <Separator className="my-1" />
                {/* RAM */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ram} alt="ram" width={25} /> */}
                  <p>
                    • API creation and integrations (3rd party APIs, payment
                    gateways)
                  </p>
                </div>
                <Separator className="my-1" />
                {/* SSD */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ssd} alt="ssd" width={25} /> */}
                  <p>• Comprehensive database management (MongoDB)</p>
                </div>
                <Separator className="my-1" />
                {/* Bandwidth */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={bandwidth} alt="bandwidth" width={25} /> */}
                  <p>
                    • Advanced user authentication with roles and permissions
                  </p>
                </div>
                <Separator className="my-1" />
                {/* IP */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ip} alt="ip" width={25} /> */}
                  <p>• Secure deployment (AWS/DigitalOcean/Vercel)</p>
                </div>
                <Separator className="my-1" />
                {/* License */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={license} alt="license" width={25} /> */}
                  <p>• Timeframe: 3-4 weeks</p>
                </div>
                <Separator className="my-1" />

                <Link to="/contact">
                  <Button>Purchase</Button>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>
        {/* Frontend */}
        <TabsContent value="frontend">
          <div className=" text-white rounded-md">
            <div className="text-center py-2">
              <h5 className="text-2xl text-blue-200 uppercase">Next Level</h5>
              <h1 className="text-3xl font-bold uppercase">
                Frontend Development
              </h1>
            </div>

            <div className="grid group md:grid-cols-2 mx-auto gap-8 text-center">
              {/* P1*/}
              <div className="cursor-pointer duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.80] hover:!scale-100 bg-white/10 p-8 rounded-xl mix-blend-luminosity">
                <Badge variant="destructive">BASIC</Badge>
                <h4 className="text-2xl font-bold mx-auto my-4 tracking-widest ">
                  Frontend Package - I
                </h4>

                {/* Pricing */}
                <h1 className="text-4xl font-bold my-5">$300</h1>

                {/* OS */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={os} alt="os" width={25} /> */}
                  <p>• Responsive UI/UX design (up to 3 pages)</p>
                </div>
                <Separator className="my-1 " />

                {/* CPU */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={cpu} alt="cpu" width={25} /> */}
                  <p>• Cross-browser compatibility</p>
                </div>
                <Separator className="my-1" />
                {/* RAM */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ram} alt="ram" width={25} /> */}
                  <p>• Mobile-first design</p>
                </div>
                <Separator className="my-1" />
                {/* SSD */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ssd} alt="ssd" width={25} /> */}
                  <p>• Basic animations and transitions</p>
                </div>
                <Separator className="my-1" />
                {/* Bandwidth */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={bandwidth} alt="bandwidth" width={25} /> */}
                  <p>• SEO-friendly structure </p>
                </div>
                <Separator className="my-1" />
                {/* IP */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ip} alt="ip" width={25} /> */}
                  <p>• Timeframe: 1 week</p>
                </div>
                <Separator className="my-1" />

                <Link to="/contact">
                  <Button>Purchase</Button>
                </Link>
              </div>

              {/*P2 */}
              <div className="cursor-pointer duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.80] hover:!scale-100 bg-white/10 p-8 rounded-xl mix-blend-luminosity">
                <Badge variant="destructive" className="">
                  PRO
                </Badge>
                <h4 className="text-2xl font-bold mx-auto my-4 tracking-widest">
                  Frontend Package - II
                </h4>

                {/* Pricing */}
                <h1 className="text-4xl font-bold my-5">$500</h1>

                {/* OS */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={os} alt="os" width={25} /> */}
                  <p>• Responsive UI/UX design (up to 5-7 pages)</p>
                </div>
                <Separator className="my-1 " />

                {/* CPU */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={cpu} alt="cpu" width={25} /> */}
                  <p>• Dynamic elements using React.js</p>
                </div>
                <Separator className="my-1" />
                {/* RAM */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ram} alt="ram" width={25} /> */}
                  <p>• Advanced animations (Framer Motion)</p>
                </div>
                <Separator className="my-1" />
                {/* SSD */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ssd} alt="ssd" width={25} /> */}
                  <p>• Form validation and user interaction</p>
                </div>
                <Separator className="my-1" />
                {/* Bandwidth */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={bandwidth} alt="bandwidth" width={25} /> */}
                  <p>• Integration with APIs (RESTful)</p>
                </div>
                <Separator className="my-1" />
                {/* IP */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ip} alt="ip" width={25} /> */}
                  <p>Optimized for speed and performance</p>
                </div>
                <Separator className="my-1" />
                {/* License */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={license} alt="license" width={25} /> */}
                  <p>• Timeframe: 1-2 weeks</p>
                </div>
                <Separator className="my-1" />

                <Link to="/contact">
                  <Button>Purchase</Button>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>
        {/* Backend */}
        <TabsContent value="backend">
          <div className=" text-white rounded-md">
            <div className="text-center py-2">
              <h5 className="text-2xl  text-blue-200 uppercase">Next Level</h5>
              <h1 className="text-3xl font-bold uppercase">
                Backend Development
              </h1>
            </div>

            <div className="grid group md:grid-cols-2 mx-auto gap-8 text-center">
              {/* RDP Supreme*/}
              <div className="cursor-pointer duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.80] hover:!scale-100 bg-white/10 p-8 rounded-xl mix-blend-luminosity">
                <Badge variant="destructive">BASIC</Badge>
                <h4 className="text-2xl font-bold mx-auto my-4 tracking-widest ">
                  Backend Package - I
                </h4>

                {/* Pricing */}
                <h1 className="text-4xl font-bold my-5">$500</h1>

                {/* OS */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={os} alt="os" width={25} /> */}
                  <p>• Basic RESTful API development</p>
                </div>
                <Separator className="my-1 " />

                {/* CPU */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={cpu} alt="cpu" width={25} /> */}
                  <p>• Simple database setup (MongoDB)</p>
                </div>
                <Separator className="my-1" />
                {/* RAM */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ram} alt="ram" width={25} /> */}
                  <p>• User authentication (JWT) </p>
                </div>
                <Separator className="my-1" />
                {/* SSD */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ssd} alt="ssd" width={25} /> */}
                  <p>400GB NVMe SSD</p>
                </div>
                <Separator className="my-1" />
                {/* Bandwidth */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={bandwidth} alt="bandwidth" width={25} /> */}
                  <p>• CRUD operations for core functionalities</p>
                </div>
                <Separator className="my-1" />
                {/* IP */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ip} alt="ip" width={25} /> */}
                  <p>• Basic deployment (Heroku/Vercel)</p>
                </div>
                <Separator className="my-1" />
                {/* License */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={license} alt="license" width={25} /> */}
                  <p>• Timeframe: 1-2 weeks</p>
                </div>
                <Separator className="my-1" />

                <Link to="/contact">
                  <Button>Purchase</Button>
                </Link>
              </div>

              {/*RDP Titan */}
              <div className="cursor-pointer duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.80] hover:!scale-100 bg-white/10 p-8 rounded-xl mix-blend-luminosity">
                <Badge variant="destructive">ADVANCED</Badge>
                <h4 className="text-2xl font-bold mx-auto my-4 tracking-widest">
                  Backend Package - II
                </h4>

                {/* Pricing */}
                <h1 className="text-4xl font-bold my-5">$800</h1>

                {/* OS */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={os} alt="os" width={25} /> */}
                  <p>• Advanced API development (GraphQL, RESTful)</p>
                </div>
                <Separator className="my-1 " />

                {/* CPU */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={cpu} alt="cpu" width={25} /> */}
                  <p>• Complex database design (relations, optimization)</p>
                </div>
                <Separator className="my-1" />
                {/* RAM */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ram} alt="ram" width={25} /> */}
                  <p>• Real-time functionality (websockets, notifications)</p>
                </div>
                <Separator className="my-1" />
                {/* SSD */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ssd} alt="ssd" width={25} /> */}
                  <p>
                    • Secure user authentication (JWT, OAuth, Multi-Factor
                    Authentication)
                  </p>
                </div>
                <Separator className="my-1" />
                {/* Bandwidth */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={bandwidth} alt="bandwidth" width={25} /> */}
                  <p>• Deployment on AWS/DigitalOcean</p>
                </div>
                <Separator className="my-1" />
                {/* IP */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={ip} alt="ip" width={25} /> */}
                  <p>
                    • Integration with third-party services (payment systems,
                    email services)
                  </p>
                </div>
                <Separator className="my-1" />
                {/* License */}
                <div className="flex items-center justify-start gap-2">
                  {/* <img src={license} alt="license" width={25} /> */}
                  <p>Timeframe: 2-3 weeks</p>
                </div>
                <Separator className="my-1" />

                <Link to="/contact">
                  <Button>Purchase</Button>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicePackages;
