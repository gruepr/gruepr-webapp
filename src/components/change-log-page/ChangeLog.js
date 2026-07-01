import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Header from "../header/Header";
import Footer from "../footer/Footer.js";
import Image from "../../img/privacypolicy-bg.svg";

// The changelog now lives in the gruepr app repo as CHANGELOG.md and is fetched at
// runtime, so the website always shows the latest without a manual edit here.
const CHANGELOG_URL =
  "https://raw.githubusercontent.com/gruepr/gruepr/master/CHANGELOG.md";

// Map Markdown elements onto the site's existing styles. Tailwind's reset strips
// list/heading styling, so these classes restore it. The top-level "# Changelog"
// heading is hidden because the page already has its own "Change Log" title.
const mdComponents = {
  h1: () => null,
  h2: ({ node, ...props }) => <h3 className="heading3 pt-[24px]" {...props} />,
  p: ({ node, ...props }) => <p className="body" {...props} />,
  ul: ({ node, ...props }) => (
    <ul className="body list-disc pl-[24px]" {...props} />
  ),
  li: ({ node, ...props }) => <li {...props} />,
  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
};

const ChangeLog = () => {
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(CHANGELOG_URL)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.text();
      })
      .then(setMarkdown)
      .catch(() => setError(true));
  }, []);

  return (
    <div>
      <Header />
      <div
        className="grid grid-cols-3 
        tablet:p-[64px] tablet:pt-[56px] tablet:space-y-[32px] 
        mobile:p-[16px] mobile:py-[32px] mobile:space-y-[32px]"
      >
        <h2 className="col-span-3 heading2">Change Log</h2>
        <div className="col-span-3 space-y-[16px]">
          {error ? (
            <p className="body">
              The changelog couldn't be loaded right now. You can view it on{" "}
              <a
                className="link text-primary-500"
                href="https://github.com/gruepr/gruepr/blob/master/CHANGELOG.md"
              >
                GitHub
              </a>
              .
            </p>
          ) : markdown ? (
            <ReactMarkdown components={mdComponents}>{markdown}</ReactMarkdown>
          ) : (
            <p className="body">Loading…</p>
          )}
        </div>
      </div>
      <img src={Image} alt="decorative image" />
      <Footer />
    </div>
  );
};
export default ChangeLog;
