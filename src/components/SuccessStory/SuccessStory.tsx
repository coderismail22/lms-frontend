import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SuccessStory = () => {
  return (
    <div className="p-2">
      <h1 className="text-xl">Success Stories</h1>
      <Carousel className="">
        <CarouselContent>
          <CarouselItem>
            <img
              src="https://thumbs.dreamstime.com/b/agent-face-happy-business-man-office-manager-leader-smile-startup-company-growth-management-success-corporate-employee-272852323.jpg"
              alt="success-story-img"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://thumbs.dreamstime.com/b/agent-face-happy-business-man-office-manager-leader-smile-startup-company-growth-management-success-corporate-employee-272852323.jpg"
              alt="success-story-img"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://thumbs.dreamstime.com/b/agent-face-happy-business-man-office-manager-leader-smile-startup-company-growth-management-success-corporate-employee-272852323.jpg"
              alt="success-story-img"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default SuccessStory;
