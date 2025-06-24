type Props = {
    typeValue: string;
    typeOnChange: (title: "text" | "video" | "audio") => void;
    titleValue: string;
    titleOnChange: (title: string) => void;
    bodyValue: string;
    bodyOnChange: (title: string) => void;
    imageValue: string;
    imageOnChange: (title: string) => void;
    closeForm: () => void;
};

function Form(props: Props) {
    return (
        <>
            <div className="absolute top-0 left-0 right-0 flex flex-col mx-auto w-sm bg-white rounded p-5 mt-10 ">
                <div className="flex justify-between">
                    <button
                        className={`${
                            props.typeValue === "text" ? "font-semibold" : ""
                        } p-1 cursor-pointer `}
                        onClick={() => {
                            props.imageOnChange("https://picsum.photos/600");
                            props.typeOnChange("text");
                        }}
                    >
                        Text
                    </button>
                    <button
                        className={`${
                            props.typeValue === "video" ? "font-semibold" : ""
                        } p-1 cursor-pointer `}
                        onClick={() => {
                            props.imageOnChange(
                                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            );
                            props.typeOnChange("video");
                        }}
                    >
                        Video
                    </button>
                    <button
                        className={`${
                            props.typeValue === "audio" ? "font-semibold" : ""
                        } p-1 cursor-pointer `}
                        onClick={() => {
                            props.imageOnChange(
                                "https://lesaffranchis.s3.amazonaws.com/memorial-vivant/audios/1649178142-1023790_1023794_DM_FMix-WEBDyn_23976_en-008m51s_DualMono_02-076_censur.L.mp3"
                            );
                            props.bodyOnChange(`WEBVTT

1
00:00:00.200 --> 00:00:02.402
As we came around the roundabout,
that's on the right-hand side

2
00:00:02.402 --> 00:00:04.871
by gas station and all these
people were gathered around,

3
00:00:04.871 --> 00:00:08.041
and as my vehicle came
up, people were really waving us over.

4
00:00:08.041 --> 00:00:10.744
So, we finished the roundabout and came out
and I got off.

5
00:00:10.744 --> 00:00:13.279
People were pointing me over
towards the canal.
`);
                            props.typeOnChange("audio");
                        }}
                    >
                        Audio
                    </button>
                </div>
                {props.typeValue === "text" && (
                    <>
                        <label htmlFor="paperTitle" className="mt-8 mb-2">
                            Title
                        </label>
                        <input
                            name="paperTitle"
                            className="px-5 py-2 border rounded text-sm"
                            value={props.titleValue}
                            onChange={(e) => {
                                props.titleOnChange(e.currentTarget.value);
                            }}
                        />
                        <label htmlFor="paperBody" className="mt-8 mb-2">
                            Body
                        </label>
                        <textarea
                            name="paperBody"
                            className="px-5 py-2 h-52 border rounded text-sm"
                            value={props.bodyValue}
                            onChange={(e) => {
                                props.bodyOnChange(e.currentTarget.value);
                            }}
                        ></textarea>
                        <label htmlFor="paperImage" className="mt-8 mb-2">
                            Image URL
                        </label>
                        <input
                            name="paperImage"
                            className="px-5 py-2 border rounded text-sm"
                            value={props.imageValue}
                            onChange={(e) => {
                                props.imageOnChange(e.currentTarget.value);
                            }}
                        />
                    </>
                )}
                {props.typeValue === "video" && (
                    <>
                        <label htmlFor="paperTitle" className="mt-8 mb-2">
                            Title
                        </label>
                        <input
                            name="paperTitle"
                            className="px-5 py-2 border rounded text-sm"
                            value={props.titleValue}
                            onChange={(e) => {
                                props.titleOnChange(e.currentTarget.value);
                            }}
                        />

                        <label htmlFor="paperImage" className="mt-8 mb-2">
                            Video URL
                        </label>
                        <input
                            name="paperImage"
                            className="px-5 py-2 border rounded text-sm"
                            value={props.imageValue}
                            onChange={(e) => {
                                props.imageOnChange(e.currentTarget.value);
                            }}
                        />
                    </>
                )}
                {props.typeValue === "audio" && (
                    <>
                        <label htmlFor="paperTitle" className="mt-8 mb-2">
                            Title
                        </label>
                        <input
                            name="paperTitle"
                            className="px-5 py-2 border rounded text-sm"
                            value={props.titleValue}
                            onChange={(e) => {
                                props.titleOnChange(e.currentTarget.value);
                            }}
                        />
                        <label htmlFor="paperBody" className="mt-8 mb-2">
                            VTT
                        </label>
                        <textarea
                            name="paperBody"
                            className="px-5 py-2 h-52 border rounded text-sm"
                            value={props.bodyValue}
                            onChange={(e) => {
                                props.bodyOnChange(e.currentTarget.value);
                            }}
                        ></textarea>
                        <label htmlFor="paperImage" className="mt-8 mb-2">
                            Audio URL
                        </label>
                        <input
                            name="paperImage"
                            className="px-5 py-2 border rounded text-sm"
                            value={props.imageValue}
                            onChange={(e) => {
                                props.imageOnChange(e.currentTarget.value);
                            }}
                        />
                    </>
                )}
                <button
                    className="mt-8 px-5 py-2 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm"
                    onClick={() => props.closeForm()}
                >
                    show
                </button>
            </div>
        </>
    );
}

export default Form;
