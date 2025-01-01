import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SuccessStory = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md p-5">
      <h1 className="text-xl font-semibold mb-4">Success Stories</h1>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <img
              className="rounded-md"
              src="https://www.shutterstock.com/image-photo/happy-smiling-bangladesh-business-man-600nw-391131271.jpg"
              alt="success-story-img"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              className="rounded-md"
              src="https://www.shutterstock.com/image-photo/happy-smiling-bangladesh-business-man-600nw-391131271.jpg"
              alt="success-story-img"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              className="rounded-md"
              src="https://www.shutterstock.com/image-photo/happy-smiling-bangladesh-business-man-600nw-391131271.jpg"
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
