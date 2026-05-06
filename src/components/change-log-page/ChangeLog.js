import Header from "../header/Header";
import changeLog from "../../content/change-log-content";
import Footer from "../footer/Footer.js";
import Image from "../../img/privacypolicy-bg.svg";

const ChangeLog = () => {
  return (
    <div>
      <Header />
      <div
        className="grid grid-cols-3 
        tablet:p-[64px] tablet:pt-[56px] tablet:space-y-[32px] 
        mobile:p-[16px] mobile:py-[32px] mobile:space-y-[32px]"
      >
        <h2 className="col-span-3 heading2">Change Log</h2>
        <p className="body">Updated 2026-04-17</p>
        {changeLog.map((curr) => (
          <div className="col-span-3">
            <h3 className="col-span-3 heading3">{curr.header}</h3>
            <div className="space-y-[32px]">
              {curr.sections ? (
                // handles updates with sections
                <div className="">
                  {curr.sections.map((section) => (
                    <div className="py-[12px]">
                      <p className="body font-bold">{section.subhead}</p>
                      <ul className="body list-disc pl-[24px]">
                        {section.text.map((item) => (
                          <li>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="">
                  <ul className="body list-disc pl-[24px]">
                    {curr.text.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <img src={Image} alt="decorative image" />
      <Footer />
    </div>
  );
};
export default ChangeLog;
