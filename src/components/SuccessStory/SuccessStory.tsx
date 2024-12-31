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
      <h1 className="text-xl font-semibold mb-4">Success Stories</h1>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <img
              className="rounded-md"
              src="https://thumbs.dreamstime.com/b/agent-face-happy-business-man-office-manager-leader-smile-startup-company-growth-management-success-corporate-employee-272852323.jpg"
              alt="success-story-img"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              className="rounded-md"
              src="https://thumbs.dreamstime.com/b/agent-face-happy-business-man-office-manager-leader-smile-startup-company-growth-management-success-corporate-employee-272852323.jpg"
              alt="success-story-img"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              className="rounded-md"
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
