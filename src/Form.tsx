type Props = {
    typeValue: string;
    typeOnChange: (title: "text" | "video") => void;
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
            <div className="absolute top-0 left-0 right-0 flex flex-col mx-auto w-sm bg-white rounded p-5 mt-20 ">
                <button
                    onClick={() => {
                        props.imageOnChange("https://picsum.photos/600");
                        props.typeOnChange("text");
                    }}
                >
                    Text
                </button>
                <button
                    onClick={() => {
                        props.imageOnChange(
                            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        );
                        props.typeOnChange("video");
                    }}
                >
                    Video
                </button>
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
