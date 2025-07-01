import { createRef, useEffect, useRef, useState, type RefObject } from "react";
import { convertStringToSeperateLines } from "./utils";

type Props = {
    type: "text" | "video" | "audio";
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
                id="paperContainer"
                className={`${move ? "translate-x-[150svw]" : "translate-x-0"}
                ${
                    props.type === "text"
                        ? "grid-rows-[20%_80%] grid-cols-2"
                        : "grid-rows-1 grid-cols-1"
                }
             transition-transform duration-2000
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
                {props.type === "audio" && <Audio {...props} />}
                <button
                    className={`z-10 absolute top-[10%] right-[10%] cursor-pointer`}
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

function Audio(props: Props) {
    const audio = createRef<HTMLAudioElement>();
    const canvas = createRef<HTMLCanvasElement>();
    const [titleVisible, setTitleVisible] = useState(true);
    const [videoVisible, setVideoVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTitleVisible(false);
            setTimeout(() => {
                setVideoVisible(true);
            }, 3000);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {videoVisible && <SubtitleContainer audio={audio} canvas={canvas} />}
            {!videoVisible && (
                <h1
                    className={` ${titleVisible ? "opacity-100" : "opacity-0"}
                col-start-1 row-start-1 starting:opacity-0  transition-opacity duration-2000 delay-1500
                font-serif text-5xl font-semibold text-mint-500 text-center content-center`}
                >
                    {props.titleValue}
                </h1>
            )}
            <canvas
                ref={canvas}
                height={300}
                width={300}
                className="z-10 col-start-1 row-start-1 justify-self-center self-center opacity-50 starting:opacity-0 transition-opacity duration-1000"
            ></canvas>
            <audio ref={audio} crossOrigin="anonymous">
                <source src={props.imageValue} type="audio/mp3" />
                <track
                    src={`data:text/vtt;base64,${btoa(props.bodyValue)}`}
                    label="English"
                    kind="captions"
                    default
                />
            </audio>
        </>
    );
}

function Video(props: Props) {
    const video = createRef<HTMLVideoElement>();
    const [titleVisible, setTitleVisible] = useState(true);
    const [videoVisible, setVideoVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setTitleVisible(false);
            setTimeout(() => {
                setVideoVisible(true);
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

function SubtitleContainer(props: {
    audio: RefObject<HTMLAudioElement | null>;
    canvas: RefObject<HTMLCanvasElement | null>;
}) {
    const [subtitle, setSubtitle] = useState("");
    const lines = convertStringToSeperateLines(subtitle);
    const requestIdRef = useRef(0);
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let bigCircle = 150;
    let midCircle = 100;
    let smallCircle = 85;
    const loop = () => {
        analyser.getByteTimeDomainData(dataArray);

        bigCircle = bigCircle < dataArray[500] ? dataArray[500] : bigCircle - 1;
        midCircle = midCircle < dataArray[1000] ? dataArray[1000] : midCircle - 1;
        smallCircle = smallCircle < dataArray[800] ? dataArray[800] : smallCircle - 1;

        bigCircle = bigCircle < 1 ? 1 : bigCircle;
        midCircle = midCircle < 1 ? 1 : midCircle;
        smallCircle = smallCircle < 1 ? 1 : smallCircle;

        if (props.canvas) {
            const ctx = props.canvas.current?.getContext("2d");
            if (!ctx) return;

            ctx.clearRect(0, 0, 400, 400);
            ctx.fillStyle = "rgba(255, 255,235,0.5)";
            ctx.beginPath();
            ctx.arc(150, 150, bigCircle * 0.7, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "rgba(115, 166,152,0.3)";
            ctx.beginPath();
            ctx.arc(150, 150, midCircle * 0.6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "rgba(0, 166,118,0.15)";
            ctx.beginPath();
            ctx.arc(150, 150, smallCircle * 0.4, 0, 2 * Math.PI);
            ctx.fill();
        }
        requestIdRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        if (props.audio) {
            props.audio.current?.play();
            props.audio.current?.textTracks[0].addEventListener("cuechange", (e) => {
                const event = e.currentTarget as TextTrack;
                if (event.activeCues && event.activeCues[0]) {
                    setSubtitle((event.activeCues[0] as VTTCue).text);
                }
            });

            const audioContext = new AudioContext();
            const track = audioContext.createMediaElementSource(props.audio.current!);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            track.connect(analyser);
            analyser.connect(audioContext.destination);
        }
    }, []);
    useEffect(function () {
        requestIdRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(requestIdRef.current);
    }, []);
    /*     useEffect(() => {
        if (props.canvas) {
            const ctx = props.canvas.current?.getContext("2d");
            console.log(ctx);
            if (!ctx) return;

            // do something here with the canvas
            ctx.clearRect(0, 0, 400, 400);
            ctx.fillStyle = "rgba(255, 255,235,0.9)";
            ctx.beginPath();
            ctx.arc(150, 150, 150, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "rgba(115, 166,152,0.5)";
            ctx.beginPath();
            ctx.arc(150, 150, 120, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "rgba(0, 166,118,0.15)";
            ctx.beginPath();
            ctx.arc(150, 150, 80, 0, 2 * Math.PI);
            ctx.fill();
        }
    }, [props.canvas]); */
    return (
        <>
            <div className="text-center content-center col-start-1 row-start-1 sm:leading-15  lg:leading-18 font-subtitle">
                {lines.map((x, i) => (
                    <Subtitle key={i} subtitle={x} />
                ))}
            </div>
        </>
    );
}

function Subtitle(props: { subtitle: string }) {
    return (
        <>
            <span
                className={`bg-[hsla(0,0%,100%,.8)] relative text-xl sm:text-2xl md:text-3xl lg:text-4xl
                z-20 p-1 sm:p-1.5 text-center text-mint-500 justify-self-center w-xl
                before:content-[''] before:block before:absolute before:top-0 before:bottom-0 before:w-16 before:right-[100%]
                before:bg-linear-to-l before:from-[hsla(0,0%,100%,.8)] before:to-[hsla(0,0%,100%,0)]
                after:content-[''] after:block after:absolute after:top-0 after:bottom-0 after:w-16 after:left-[100%]
                after:bg-linear-to-r after:from-[hsla(0,0%,100%,.8)] after:to-[hsla(0,0%,100%,0)]
                `}
            >
                {props.subtitle}
            </span>
            <br />
        </>
    );
}
