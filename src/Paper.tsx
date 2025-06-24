import { createRef, useEffect, useState } from "react";

type Props = {
    type: "text" | "video";
    titleValue: string;
    bodyValue: string;
    imageValue: string;
    closePaper: () => void;
};

function PaperContainer(props: Props) {
    const [move, setMove] = useState(false);
    const [glow, setGlow] = useState(false);
    const movePaper = () => {
        setGlow(true);
        setTimeout(() => setMove(true), 800);
        setTimeout(() => props.closePaper(), 2000);
    };
    return (
        <>
            <div
                style={{ backgroundImage: "url(/paper.png)" }}
                className={`${move ? "translate-x-[150svw]" : "translate-x-0"}
                ${
                    props.type === "text"
                        ? "grid-rows-[20%_80%] grid-cols-2"
                        : "grid-rows-1 grid-cols-1"
                }
                starting:-translate-x-[120svw] transition-transform duration-2000
                bg-size-[100%] [@media(min-aspect-ratio:16/9)]:w-[75%] [@media(min-aspect-ratio:20/9)]:w-[50%] [@media(min-aspect-ratio:30/9)]:w-[30%]
                w-[90%] p-[7%_8%] grid aspect-16/9 relative`}
            >
                <div
                    style={{ backgroundImage: "url(/paper_glow.png)" }}
                    className={`absolute top-0 left-0 w-full h-full bg-size-[100%] 
                    ${glow ? "opacity-100" : "opacity-5"} transition-opacity duration-1000`}
                ></div>
                {props.type === "text" && <Text {...props} />}
                {props.type === "video" && <Video {...props} />}
                <button
                    className="z-10 col-start-2 justify-self-end align-top self-start cursor-pointer"
                    onClick={() => movePaper()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="40px"
                        fill="#1f1f1f"
                    >
                        <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default PaperContainer;

function Video(props: Props) {
    const video = createRef<HTMLVideoElement>();
    const [titleVisible, setTitleVisible] = useState(true);
    const [videoVisible, setVideoVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setTitleVisible(false);
            console.log("setting title");
            setTimeout(() => {
                setVideoVisible(true);
                console.log("setting video");
            }, 3000);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (video && videoVisible) video.current?.play();
    }, [video, videoVisible]);

    return (
        <>
            {!videoVisible && (
                <h1
                    className={` ${titleVisible ? "opacity-100" : "opacity-0"}
                starting:opacity-0  transition-opacity duration-2000 delay-1500
                font-serif text-5xl font-semibold text-mint-500 mb-2 text-center content-center`}
                >
                    {props.titleValue}
                </h1>
            )}

            <video
                ref={video}
                style={{ maskImage: `url(/mask_video.png)` }}
                className={`${videoVisible ? "" : "hidden"}
                    mask-luminance mask-size-[100%_100%] self-center justify-self-center w-[80%]
                    opacity-100 starting:opacity-0 transition-all duration-4000`}
            >
                <source src={props.imageValue} type="video/mp4" />
            </video>
        </>
    );
}

function Text(props: Props) {
    return (
        <>
            <div className="z-10">
                <h1
                    className="font-serif text-4xl font-semibold text-mint-500 mb-2
                     starting:opacity-0 opacity-100 transition-opacity duration-4000 easing=[cubic-bezier(1,-0.01,.9,.66)]"
                >
                    {props.titleValue}
                </h1>
                <div
                    style={{
                        backgroundImage: `url(/line.png)`,
                        maskImage: "linear-gradient(#fff, #fff)",
                    }}
                    className="w-70 aspect-10/1 bg-no-repeat bg-contain mask-luminance mask-no-repeat starting:opacity-0 opacity-65 
                        starting:mask-size-[0%_100%] mask-size-[100%_100%] transition-all delay-1500 duration-2000"
                ></div>
            </div>
            <div
                id="paperParagraphContainer"
                style={{
                    scrollbarColor: "rgb(115, 166, 152) rgba(0, 0, 0, 0)",
                    scrollbarWidth: "thin",
                }}
                className="z-10 row-start-2 col-start-1 text-mint-400 overflow-y-auto
                    starting:opacity-0 opacity-100 transition-opacity duration-2000 delay-2200"
                dangerouslySetInnerHTML={{ __html: props.bodyValue }}
            ></div>
            <div
                className="row-start-2  col-start-2 w-[75%] aspect-1/1 bg-cover mask-luminance mask-size-[100%_100%] ml-[15%]
                    starting:opacity-0 opacity-100 transition-opacity duration-3000 delay-3000
                    "
                style={{
                    backgroundImage: `url(${props.imageValue})`,
                    maskImage: `url(/mask.png)`,
                }}
            ></div>
        </>
    );
}
