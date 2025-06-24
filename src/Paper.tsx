import { useState } from "react";

type Props = {
    titleValue: string;
    bodyValue: string;
    imageValue: string;
    closePaper: () => void;
};

function PaperContainer(props: Props) {
    const [move, setMove] = useState(false);
    const movePaper = () => {
        setMove(true);
        // setTimeout(() => props.closePaper(), 2000);
    };
    return (
        <>
            <div
                style={{ backgroundImage: "url(/paper.png)" }}
                className={`${move ? "translate-x-[150svw]" : "translate-x-0"}
                starting:-translate-x-[120svw] transition-transform duration-2000
                bg-size-[100%] [@media(min-aspect-ratio:16/9)]:w-[75%] [@media(min-aspect-ratio:20/9)]:w-[50%] [@media(min-aspect-ratio:30/9)]:w-[30%]
                w-[90%] p-[7%_8%] grid aspect-16/9 grid-rows-[20%_80%] grid-cols-2`}
            >
                <div>
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
                    className="row-start-2 col-start-1 text-mint-400
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

                <button
                    className="justify-self-end align-top self-start"
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

            {/*   <div
                className="h-24 w-24 bg-cover"
                style={{ backgroundImage: `url(${props.imageValue})` }}
            ></div>
            <video autoPlay style={{ maskImage: `url(/mask.png)` }} className="mask-luminance">
                {" "}
                <source
                    src="https://ia802803.us.archive.org/15/items/nwmbc-Lorem_ipsum_video_-_Dummy_video_for_your_website/Lorem_ipsum_video_-_Dummy_video_for_your_website.mp4"
                    type="video/mp4"
                />
            </video> */}
        </>
    );
}

export default PaperContainer;
