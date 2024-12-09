import "./services.css";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { motion } from "framer-motion";

function Services() {
  // const { scrollYProgress } = useScroll();
  // const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

  const { ref, inView } = useInView();
  const animation = useAnimation();
  useEffect(() => {
    // Set a valid initial value for "x", for example, 0 (assuming the starting position is on the screen)
    const initialX = 0;

    // Use a numeric value instead of a string for the initial value of "x"
    animation.start({
      x: inView ? initialX : -100, // Replace "-100" with your desired target value when not in view
      transition: { type: "spring", duration: 1, bounce: 0.5 },
    });
  }, [inView, animation]);
  return (
    <div className="p-5">
      <motion.div className="heading">
        <h2 className="uppercase my-5 font-sans text-3xl font-bold text-center text-blue-900 sm:text-4xl"></h2>
      </motion.div>
      {/* style={{scale} TODO: Put down inside bottom div*/}
      <motion.div ref={ref} animate={animation}>
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-center">
          <div className="col__3">
            <div className="p-5 md:p-7 xl:p-10 bg-white border shadow-sm rounded-lg transition border-blue-600 dark:bg-gray-800 drop-shadow-md dark:border-gray-800 dark:hover:border-blue-400 dark:shadow-none">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  />
                </svg>
              </div>

              <h4 className="text-lg font-bold mb-2">
                Certificate
              </h4>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              {/* Add text */}
              </p>
            </div>
          </div>

          <div className="col__3">
            <div className="p-5 md:p-7 xl:p-10 bg-white border  shadow-sm rounded-lg transition drop-shadow-md border-blue-600 dark:bg-gray-800 dark:border-gray-800 dark:hover:border-blue-400 dark:shadow-none">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">On Time Course</h4>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              {/* Add text */}
              </p>
            </div>
          </div>

          <div className="col__3">
            <div className="p-5 md:p-7 xl:p-10 bg-white border  shadow-sm rounded-lg transition drop-shadow-md border-blue-600 dark:bg-gray-800 dark:border-gray-800 dark:hover:border-blue-400 dark:shadow-none">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">High Quality Videos</h4>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              {/* Add text */}
              </p>
            </div>
          </div>

          <div className="col__3">
            <div className="p-5 md:p-7 xl:p-10 bg-white border  shadow-sm rounded-lg transition drop-shadow-md border-blue-600 dark:bg-gray-800 dark:border-gray-800 dark:hover:border-blue-400 dark:shadow-none">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">
                Examination After Course
              </h4>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              {/* Add text */}
              </p>
            </div>
          </div>

          <div className="col__3">
            <div className="p-5 md:p-7 xl:p-10 bg-white border  shadow-sm rounded-lg transition drop-shadow-md border-blue-600 dark:bg-gray-800 dark:border-gray-800 dark:hover:border-blue-400 dark:shadow-none">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">
                Lifetime Access to Course
              </h4>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              {/* Add text */}
              </p>
            </div>
          </div>

          <div className="col__3">
            <div className="p-5 md:p-7 xl:p-10 bg-white border  shadow-sm rounded-lg transition drop-shadow-md border-blue-600 dark:bg-gray-800 dark:border-gray-800 dark:hover:border-blue-400 dark:shadow-none">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Student Support</h4>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              {/* Add text */}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Services;
