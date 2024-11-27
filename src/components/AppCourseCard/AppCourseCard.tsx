import { BiCategoryAlt } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { TbCoinTaka } from "react-icons/tb";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";
// import useCart from "../../../Hooks/useCart";

const AppCourseCard = ({ course }) => {
  const {
    courseId,
    courseName,
    categoryName, //showing _id only of the category
    coursePrice,
    start_course_name,
    totalClasses,
    trainerImageUrl,
    trainerName,
    price,
    thumbnail_url,
  } = course;
  // console.log(name);
  // console.log(category);
  // console.log(subjects); //TODO: Calculate class number(module/topic)
  console.log(coursePrice);
  console.log(courseId);
  console.log(courseId);
  const navigate = useNavigate();
  const location = useLocation();
  //   const axiosPublic = useAxiosSecure();
  //   const { user } = useAuth();
  //   const [, refetch] = useCart();

  const handleAddToCart = () => {
    // Check if the courseId is '3'
    if (courseId === "3") {
      Swal.fire({
        title: "Coming Soon!",
        text: "This course will be launching very soon. Stay tuned!",
        icon: "info",
        confirmButtonText: "OK",
      });
    } else if (user && user.email) {
      // For other courses, add to cart
      const cartItem = {
        menuId: courseId,
        email: user.email,
        courseName,
        thumbnail_url,
        price,
        start_course_name,
      };
      axiosPublic
        .post("/carts", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            console.log("User added to the database");
            Swal.fire({
              title: "Cart successfully added",
              text: "Buy now or view more courses!",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Pay Now!",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/profile/my-cart");
              }
            });
            refetch();
          }
        })
        .catch((error) => {
          console.error("Error while adding user to the database:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to add the course to the cart. Please try again.",
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <Card className="bg-base-100 shadow-xl overflow-hidden flex flex-col justify-between h-full border-none">
      {/* Card Header */}
      <div className="flex-grow">
        <figure>
          <img src={thumbnail_url} alt="course" />
        </figure>
        <div className="flex flex-col items-center justify-center m-2">
          <Badge variant="destructive" className="text-white ">
            <Link to="#">{categoryName}</Link>
          </Badge>
        </div>

        <h2 className="font-bold text-3xl text-slate-400 text-center">
          {courseName}
        </h2>
      </div>

      {/* Card Content */}
      <div className="">
        <div className="flex items-center gap-2 bg-slate-100 p-1 mt-2 rounded-md">
          <div className="p1 border-r-2 border-gray-400 pr-4">
            <img className="w-6" src={trainerImageUrl} alt="" />
          </div>
          <Link to="#">
            <p className="text-[#3a67ae] font-semibold text-[16px]">
              {trainerName}
            </p>
          </Link>
        </div>
        <div className="mt-1">
          <div className="flex  items-center justify-center gap-2 w-full text-[15px]">
            <p className=" text-white">
              <IoBookOutline />
            </p>
            <p className="font-semibold text-zinc-400">ক্লাস সংখ্যা 30 +</p>
          </div>
          <Separator />
          <div className="flex justify-center items-center  gap-2  w-full text-[15px]">
            <p className=" text-white">
              <TbCoinTaka />
            </p>
            <p className="font-semibold text-zinc-400">
              কোর্স ফি {coursePrice} টাকা
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between m-1">
        <div className="w-full ">
          <Link to={`course/${start_course_name}`}>
            <Button className="text-white bg-gradient-to-r w-full font-semibold text-[16px] from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-blue-600">
              <p className="text-xl">
                <BiCategoryAlt />
              </p>{" "}
              View Course Details
            </Button>
          </Link>
        </div>
        <div>
          <Button
            onClick={handleAddToCart}
            className="bg-blue-500 mx-1 text-white hover:bg-blue-600"
          >
            <FiShoppingCart />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AppCourseCard;
