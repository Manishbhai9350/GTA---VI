import React, { useRef } from "react";
import Graphics from "./Graphics";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const VI = ({ setIconMorphed = () => {} }) => {
  const Text = useRef(null);
  const SVG = useRef(null);

  useGSAP(() => {
    const TL = gsap.timeline();
    TL.set(Text.current, {
      transformOrigin: "50% 50%",
    });
    TL.to(Text.current, {
      delay: 4,
      fontSize: 500,
      rotate: 30,
    }).to(Text.current, {
      delay: 0.5,
      fontSize: 1000,
      ease: "expo",
      rotate: 60,
      duration: 2,
      scale: 3,
      onStart: function () {
          setIconMorphed(true);
      },
    });
    TL.to(
      SVG.current,
      {
        opacity: 0,
        onComplete() {
          TL.kill()
          SVG.current.remove();
        },
      },
      "<"
    );
  }, []);

  return (
    <div ref={SVG} className="svg">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="vi-mask">
            <rect width="100%" height="100%" fill="black" />
            <g className="text-group">
              <text
                ref={Text}
                x="50%"
                y="50%"
                fontSize="300"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontFamily="Arial Black"
              >
                VI
              </text>
            </g>
          </mask>
        </defs>
        <foreignObject width="100%" height="100%" mask="url(#vi-mask)">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <Graphics animateVI />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default VI;
