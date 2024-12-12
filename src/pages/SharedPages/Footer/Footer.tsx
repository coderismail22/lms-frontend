import { FaPhoneVolume } from "react-icons/fa6";
const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-[#2B3440] text-[#CDD3DA]  ">
                <aside>
                    <h3 className="text-4xl font-bold">EJobsIT</h3>
                    <p>Online IT Training Center<br /></p>
                    <div>
                        <div className="flex items-center gap-4 px-4 py-2 rounded-md bg-slate-800">
                            <span className="">< FaPhoneVolume /></span>
                            <h2>+8801730481212 </h2>
                        </div>
                    </div>
                </aside>
                <nav>
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;