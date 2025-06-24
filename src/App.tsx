import { useState } from "react";
import Form from "./Form";
import PaperContainer from "./Paper";

function App() {
    const [type, setType] = useState<"text" | "video">("text");
    const [title, setTitle] = useState("Title goes here");
    const [body, setBody] = useState(
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>Duis accumsan at diam nec semper. Nullam feugiat eros ante, at hendrerit ligula cursus non. Nunc feugiat, antehendrerit luctus scelerisque, libero magna consectetur urna, id consequat purus risunec sapien. Cras euismod elit in nisl dignissim elementum. </p>"
    );
    const [image, setImage] = useState("https://picsum.photos/600");
    const [showForm, setShowForm] = useState(true);
    const [showPaper, setShowPaper] = useState(false);

    return (
        <>
            <div className="flex w-full h-full overflow-hidden justify-center items-center bg-gray-600">
                {showForm && (
                    <Form
                        typeValue={type}
                        typeOnChange={(value: "text" | "video") => {
                            setType(value);
                        }}
                        titleValue={title}
                        titleOnChange={(value: string) => {
                            setTitle(value);
                        }}
                        bodyValue={body}
                        bodyOnChange={(value: string) => {
                            setBody(value);
                        }}
                        imageValue={image}
                        imageOnChange={(value: string) => {
                            setImage(value);
                        }}
                        closeForm={() => {
                            setShowForm(false);
                            setShowPaper(true);
                        }}
                    />
                )}
                {showPaper && (
                    <PaperContainer
                        type={type}
                        titleValue={title}
                        bodyValue={body}
                        imageValue={image}
                        closePaper={() => {
                            setShowPaper(false);
                            setShowForm(true);
                        }}
                    />
                )}
            </div>
        </>
    );
}

export default App;
