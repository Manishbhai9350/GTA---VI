import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Graphics = ({ props, animate = false, main = false }) => {
  const Clouds = useRef(null);
  const Buildings = useRef(null);
  const Character = useRef(null);
  const VIText = useRef(null);
  const PS5 = useRef(null)
  const Rockstar = useRef(null)
  const IsAnimating = useRef(true);

  useGSAP(() => {
    if (!main) return;
    const TL = gsap.timeline({
        onComplete:() => IsAnimating.current = false
    });
    TL.set(Clouds.current, {
      rotate: 10,
      scale: 2,
      opacity: 1.5,
    });
    TL.set(Buildings.current, {
      rotate: -10,
      scale: 1.3,
      opacity: 1,
    });
    TL.set(Character.current, {
      opacity: 1,
      scale: 1.6,
      bottom: -1000,
      x: "-50%",
    });
    TL.set(Rockstar.current,{
        top:'-100%'
    })
    TL.set(Rockstar.current.querySelector('.lines'),{
        width:0
    })
    TL.set(PS5.current,{
        bottom:'-100%'
    })

    TL.to([Clouds.current, Buildings.current], {
      delay: 1,
      rotate: 0,
      opacity: 1,
      scale: 1.6,
    });

    TL.to(
      Character.current,
      {
        bottom: -180,
        duration: 0.8,
        ease: "expo",
      },
      "<"
    )
    TL.to(VIText.current,{
        top:'30%',
        ease:'expo',
        duration:.6,
    },'<')

    TL.to([Clouds.current, Buildings.current], {
      delay: 1,
      rotate: 0,
      opacity: 1,
      scale:1.3
    });

    TL.to(
      Character.current,
      {
        bottom: -220,
        scale: 1.5,
      },
      "<"
    );
    TL.to(VIText.current,{
        ease:'expo',
        fontSize:'5rem',
        lineHeight:'4.5rem'
    },'<')
    
    TL.to(PS5.current,{
        bottom:15,
        ease:'expo',
    },'<')

    TL.to(Rockstar.current,{
        top:10,
        ease:'expo',
    },'<')
    TL.to(Rockstar.current.querySelector('.lines'),{
        ease:'expo',
        delay:.5,
        width:100
    })

  });

  useGSAP(() => {
    if(!main) return;
    const MouseMove = e => {
        if(IsAnimating.current) return;
        const {clientX:x} = e 
        const MX =  ((x / window.innerWidth) - .5) * -40
        gsap.to(VIText.current,{
            x:MX * 1.3
        })
        gsap.to(Buildings.current,{
            x:MX * 2
        })
        gsap.to(Clouds.current,{
            x:MX * 3
        })
    }
    window.addEventListener('mousemove',MouseMove)
    return () => window.removeEventListener('mousemove',MouseMove)
  })

  return (
    <>
      <div ref={Clouds} {...props} className="clouds">
        <img src="/sky.png" />
      </div>
      <div
        ref={Buildings}
        {...props}
        style={{ opacity: 0 }}
        className="buildings"
      >
        <img src="/bg.png" />
      </div>
      {main && (
        <>
          <div
            ref={Character}
            {...props}
            style={{ opacity: 0 }}
            className="character"
          >
            <img src="/girl_selfi.png" />
          </div>
          <h1 ref={VIText} style={{width:'100%',textAlign:'center'}} className="vi-text">
            grand <br /> theft <br /> auto <small>VI</small>
          </h1>
          <div ref={PS5} className="ps5">
            <img src="./ps5.png" />
          </div>
        </>
      )}
      <div className="bottom-grad"></div>
      <div ref={Rockstar} className="rockstar">
        <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
        <div className="logo">
            <h1>rockstar</h1>
        </div>
      </div>
    </>
  );
};

export default Graphics;
